
export enum Theme {
  PURE = 'pure',
  SAGE = 'sage',
  SAND = 'sand',
  SLATE = 'slate'
}

export enum Language {
  TR = 'tr',
  EN = 'en'
}

export enum ProfileMode {
  STANDARD = 'standard',
  PERSONALIZED = 'personalized'
}

export interface PersonalityResult {
  scores: Record<string, number>; // principleId -> raw score
  topPrinciples: { id: string; percentage: number }[];
}

export interface DilemmaCategory {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
}

export interface LibraryItem {
  id: string;
  categoryId: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

export interface EthicalPrinciple {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  fullDescription: Record<Language, string>;
}

export interface AnalysisResult {
  id: string;
  dilemma: string;
  timestamp: number;
  frameworks: {
    kant: string;
    mill: string;
    aristotle: string;
  };
  summary: string;
  microQuestions: string[];
}

export interface AppState {
  theme: Theme;
  language: Language;
  userName: string | null;
  profileMode: ProfileMode;
  personalityResult: PersonalityResult | null;
  savedAnalyses: AnalysisResult[];
}
