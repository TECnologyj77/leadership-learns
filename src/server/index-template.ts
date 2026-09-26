// The built SPA shell (hashed script/style URLs included), bundled into the
// SSR output so the blog page function needs no file-system or network access
// to find it. `vite build --ssr` runs after the client build, so dist/ exists.
import template from '../../dist/index.html?raw';

export default template;
