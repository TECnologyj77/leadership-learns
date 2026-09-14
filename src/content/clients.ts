import ivcLogo from '../assets/IVC_Logo.png';

export type ClientMark = 'college' | 'biotech' | 'realEstate';

export type Client = {
  /** Full organisation name, used for the accessible label. */
  name: string;
  /** Which built-in SVG mark to draw alongside the wordmark. */
  mark: ClientMark;
  /** Wordmark lines. A second line renders beneath the first, tighter and smaller. */
  wordmark: [string] | [string, string];
  /**
   * Optional path to a supplied logo file. When present it replaces the
   * built-in mark and wordmark entirely.
   */
  logo?: string;
};

const imperialValleyCollege: Client = {
  name: 'Imperial Valley College',
  mark: 'college',
  wordmark: ['Imperial Valley', 'College'],
  logo: ivcLogo,
};

const biotechPartners: Client = {
  name: 'Biotech Partners',
  mark: 'biotech',
  wordmark: ['Biotech', 'Partners'],
};

const realEstateDynamics: Client = {
  name: 'Real Estate Dynamics',
  mark: 'realEstate',
  wordmark: ['Real Estate', 'Dynamics'],
};

export const homeClients: Client[] = [
  imperialValleyCollege,
  biotechPartners,
  realEstateDynamics,
];
