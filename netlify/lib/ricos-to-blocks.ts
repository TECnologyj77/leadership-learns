// Maps Wix rich content (Ricos document nodes) to the site's BlogBlock list.
//
// Supported: paragraphs, headings, bold/italic/underline/link text, line
// breaks, images, galleries, link buttons, bulleted/ordered lists, quotes and
// dividers. Paragraphs, headings, images, the gallery and the button are what
// Tammy's published posts use today; the rest are common Wix editor blocks
// that are simple to render faithfully.
//
// Anything else that carries content (video, embeds, tables, files, polls...)
// becomes an `unsupported` block — rendered as a visible notice and returned
// in `issues` — so it is never dropped silently. Purely visual text styling
// (colour, font size, highlight) is intentionally not carried over.
import type { BlogBlock, BlogImage, BlogInline, BlogTextMarks } from '../../src/types/blog.ts';
import { toBlogLink } from './safe-link.ts';
import { toBlogImage } from './wix-media.ts';

export type ContentIssue =
  | { kind: 'unsupported-block'; wixType: string }
  | { kind: 'invalid-image'; wixType: string }
  | { kind: 'invalid-link'; wixType: string }
  | { kind: 'missing-alt-text'; wixType: string };

export interface RicosResult {
  blocks: BlogBlock[];
  issues: ContentIssue[];
}

// Loosely typed on purpose: the payload is untrusted and validated field by field.
interface RicosNode {
  type?: unknown;
  nodes?: unknown;
  textData?: { text?: unknown; decorations?: unknown };
  headingData?: { level?: unknown };
  imageData?: {
    image?: { src?: { id?: unknown; url?: unknown }; width?: unknown; height?: unknown };
    altText?: unknown;
    caption?: unknown;
    link?: unknown;
  };
  galleryData?: { items?: unknown };
  buttonData?: { text?: unknown; link?: unknown };
}

interface WixDecoration {
  type?: unknown;
  fontWeightValue?: unknown;
  italicData?: unknown;
  underlineData?: unknown;
  linkData?: { link?: unknown };
}

const asNodes = (value: unknown): RicosNode[] =>
  Array.isArray(value) ? value.filter((node): node is RicosNode => !!node && typeof node === 'object') : [];

const nodeType = (node: RicosNode) => (typeof node.type === 'string' ? node.type : 'UNKNOWN');

class RicosMapper {
  readonly issues: ContentIssue[] = [];

  blocks(nodes: unknown): BlogBlock[] {
    return asNodes(nodes).flatMap((node) => this.block(node));
  }

  private block(node: RicosNode): BlogBlock[] {
    const type = nodeType(node);
    switch (type) {
      case 'PARAGRAPH': {
        const content = this.inline(node.nodes);
        // Empty paragraphs are Wix spacing, not content.
        return hasText(content) ? [{ type: 'paragraph', content }] : [];
      }
      case 'HEADING': {
        const content = this.inline(node.nodes);
        if (!hasText(content)) return [];
        // The article title is the page's h1, so Wix H1/H2 both become h2.
        const wixLevel = Number(node.headingData?.level) || 2;
        const level = Math.min(Math.max(wixLevel, 2), 4) as 2 | 3 | 4;
        return [{ type: 'heading', level, content }];
      }
      case 'IMAGE':
        return [this.image(node)];
      case 'GALLERY':
        return [this.gallery(node)];
      case 'BUTTON':
        return [this.button(node)];
      case 'BULLETED_LIST':
      case 'ORDERED_LIST': {
        const items = asNodes(node.nodes)
          .map((item) => this.blocks(item.nodes))
          .filter((item) => item.length > 0);
        return items.length ? [{ type: 'list', ordered: type === 'ORDERED_LIST', items }] : [];
      }
      case 'BLOCKQUOTE': {
        const content = this.blocks(node.nodes);
        return content.length ? [{ type: 'quote', content }] : [];
      }
      case 'DIVIDER':
        return [{ type: 'divider' }];
      default:
        return [this.unsupported(type)];
    }
  }

  private unsupported(wixType: string): BlogBlock {
    this.issues.push({ kind: 'unsupported-block', wixType });
    return { type: 'unsupported', wixType };
  }

  private toImage(wixType: string, input: Parameters<typeof toBlogImage>[0]): BlogImage | null {
    const image = toBlogImage(input);
    if (!image) {
      this.issues.push({ kind: 'invalid-image', wixType });
      return null;
    }
    if (!image.alt) this.issues.push({ kind: 'missing-alt-text', wixType });
    return image;
  }

  private image(node: RicosNode): BlogBlock {
    const data = node.imageData;
    const image = this.toImage('IMAGE', {
      reference: data?.image?.src?.id ?? data?.image?.src?.url,
      width: data?.image?.width,
      height: data?.image?.height,
      alt: data?.altText,
    });
    if (!image) return { type: 'unsupported', wixType: 'IMAGE' };

    const link = data?.link ? toBlogLink(data.link) : null;
    if (data?.link && !link) this.issues.push({ kind: 'invalid-link', wixType: 'IMAGE' });
    const caption =
      plainText(data?.caption) ??
      plainText(
        asNodes(node.nodes)
          .filter((child) => nodeType(child) === 'CAPTION')
          .flatMap((child) => this.inline(child.nodes))
          .map((part) => (part.type === 'text' ? part.text : ' '))
          .join(''),
      );
    return { type: 'image', image, caption, link };
  }

  private gallery(node: RicosNode): BlogBlock {
    const items = Array.isArray(node.galleryData?.items) ? node.galleryData.items : [];
    const images: BlogImage[] = [];
    for (const item of items as Array<{
      image?: { media?: { src?: { id?: unknown; url?: unknown }; width?: unknown; height?: unknown } };
      video?: unknown;
      altText?: unknown;
    }>) {
      if (item?.video) {
        // A video inside a gallery is content we can't show.
        this.issues.push({ kind: 'unsupported-block', wixType: 'GALLERY_VIDEO' });
        continue;
      }
      const media = item?.image?.media;
      const image = this.toImage('GALLERY', {
        reference: media?.src?.id ?? media?.src?.url,
        width: media?.width,
        height: media?.height,
        alt: item?.altText,
      });
      if (image) images.push(image);
    }
    return images.length ? { type: 'gallery', images } : this.unsupported('GALLERY');
  }

  private button(node: RicosNode): BlogBlock {
    const label = plainText(node.buttonData?.text);
    const link = toBlogLink(node.buttonData?.link);
    if (!label || !link) {
      if (!link) this.issues.push({ kind: 'invalid-link', wixType: 'BUTTON' });
      return this.unsupported('BUTTON');
    }
    return { type: 'button', label, link };
  }

  private inline(nodes: unknown): BlogInline[] {
    const parts: BlogInline[] = [];
    for (const node of asNodes(nodes)) {
      if (nodeType(node) !== 'TEXT') {
        // Inline nodes other than text (e.g. mentions rendered as nodes) are reported.
        if (nodeType(node) !== 'CAPTION') this.issues.push({ kind: 'unsupported-block', wixType: nodeType(node) });
        continue;
      }
      const text = typeof node.textData?.text === 'string' ? node.textData.text : '';
      if (!text) continue;
      const marks = this.marks(node.textData?.decorations);
      text.split('\n').forEach((line, index) => {
        if (index > 0) parts.push({ type: 'lineBreak' });
        if (line) parts.push({ type: 'text', text: line, marks });
      });
    }
    return parts;
  }

  private marks(decorations: unknown): BlogTextMarks {
    const marks: BlogTextMarks = {};
    if (!Array.isArray(decorations)) return marks;
    for (const decoration of decorations as WixDecoration[]) {
      switch (decoration?.type) {
        case 'BOLD':
          if (decoration.fontWeightValue === undefined || Number(decoration.fontWeightValue) >= 600) marks.bold = true;
          break;
        case 'ITALIC':
          if (decoration.italicData !== false) marks.italic = true;
          break;
        case 'UNDERLINE':
          if (decoration.underlineData !== false) marks.underline = true;
          break;
        case 'LINK': {
          const link = toBlogLink(decoration.linkData?.link);
          if (link) marks.link = link;
          else this.issues.push({ kind: 'invalid-link', wixType: 'TEXT' });
          break;
        }
      }
    }
    return marks;
  }
}

function hasText(content: BlogInline[]): boolean {
  return content.some((part) => part.type === 'text' && part.text.trim());
}

function plainText(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const text = value.replace(/\s+/g, ' ').trim();
  return text || null;
}

/** Converts a Wix rich content document into site blocks plus any content issues found. */
export function ricosToBlocks(richContent: unknown): RicosResult {
  const mapper = new RicosMapper();
  const nodes = richContent && typeof richContent === 'object' ? (richContent as { nodes?: unknown }).nodes : undefined;
  const blocks = mapper.blocks(nodes);
  return { blocks, issues: mapper.issues };
}
