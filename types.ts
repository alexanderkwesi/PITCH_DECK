
export interface SlideContent {
  cssStyles(cssStyles: any, arg1: { cssStyles: { background: string; "-webkit-background-clip": string; "-webkit-text-fill-color": string; "background-clip": string; "font-weight": string; }; }): unknown;
  title: string;
  subtitle?: string;
  points: string[];
  visualHint?: string;
  footer?: string;
}

export interface DeckData {
  companyName: string;
  tagline: string;
  slides: SlideContent[];
}
