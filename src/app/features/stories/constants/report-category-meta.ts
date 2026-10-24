import { ReportCategory } from '../enums/report-category';

// Icon paths are drawn on viewBox="0 0 24 24" (mission icons use 0 0 64 64).
export interface ReportCategoryMeta {
  label: string;
  iconPaths: string[];
}

export const REPORT_CATEGORY_META: Record<ReportCategory, ReportCategoryMeta> = {
  [ReportCategory.STRADE]: {
    label: 'Strade e viabilità',
    iconPaths: ['m8 3-5 18m13-18 5 18M12 3v4m0 4v3m0 4v3'],
  },
  [ReportCategory.ACQUA_FOGNE]: {
    label: 'Acqua e fogne',
    iconPaths: ['M12 3c-2 4-7 8-7 12a7 7 0 0 0 14 0c0-4-5-8-7-12Z', 'M8 15c0 2 1 3 3 3'],
  },
  [ReportCategory.RIFIUTI]: {
    label: 'Rifiuti',
    iconPaths: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7'],
  },
  [ReportCategory.VERDE]: {
    label: 'Verde pubblico',
    iconPaths: ['M20 3c-4 3-8 0-13 5-4 4-2 10 3 11 6 1 10-6 10-16ZM4 21c1-7 5-9 11-12'],
  },
  [ReportCategory.TRASPORTO_PUBBLICO]: {
    label: 'Trasporto pubblico',
    iconPaths: [
      'M8 3h8a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z',
      'M5 11h14M12 3v8M8 19v2m8-2v2M8 15h1m6 0h1',
    ],
  },
  [ReportCategory.ACCESSIBILITA]: {
    label: 'Accessibilità',
    iconPaths: ['M10 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0', 'M4 9h16M12 6v8m0 0-5 7m5-7 5 7'],
  },
  [ReportCategory.SICUREZZA]: {
    label: 'Sicurezza',
    iconPaths: ['m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z', 'm8 12 3 3 5-6'],
  },
  [ReportCategory.BUROCRAZIA]: {
    label: 'Uffici e burocrazia',
    iconPaths: ['M4 21V3h11v18M15 9h5v12M2 21h20M8 7h3m-3 4h3m-3 4h3M8 21v-3h3v3'],
  },
  [ReportCategory.MULTE]: {
    label: 'Multe e ricorsi',
    iconPaths: ['M6 3h9l4 4v14H6ZM14 3v5h5M9 12h7m-7 4h7'],
  },
  [ReportCategory.CONTROLLI_STRADALI]: {
    label: 'Controlli stradali',
    iconPaths: ['M4 8h16v8H4ZM7 16v5m10-5v5M5 14l6-6m2 8 6-6'],
  },
  [ReportCategory.ALTRO]: {
    label: 'Altro',
    iconPaths: [
      'M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M18 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0',
    ],
  },
};
