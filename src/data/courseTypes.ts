import type { KnowledgeCheckItem, PracticalExercise, ResearchReference } from './curriculum';

export type DiagramKey =
  | 'scopes'
  | 'pipeline'
  | 'aggregation'
  | 'validity'
  | 'outcomes'
  | 'horizon'
  | 'fallacies';

export type PracticeWidgetKey = 'first-eval' | 'stats-workbench';

export type PracticeToolKey = 'taxonomy-tool' | 'framework-tool' | 'sphere-tool';

export interface ChapterCallout {
  kind: 'example' | 'warning' | 'rule';
  title: string;
  body: string;
}

export interface ChapterSection {
  heading: string;
  paragraphs: string[];
  bullets?: { label: string; text: string }[];
  callout?: ChapterCallout;
  table?: {
    headers: string[];
    rows: string[][];
  };
  diagram?: DiagramKey;
}

export interface CourseChapter {
  id: string;
  code: string;
  title: string;
  readMinutes: number;
  summary: string;
  sections: ChapterSection[];
  keyTakeaways: string[];
  toolLink?: {
    tool: PracticeToolKey;
    label: string;
    description: string;
  };
  trackLink?: {
    label: string;
    description: string;
  };
  furtherReading?: { label: string; type: string; url?: string }[];
}

export interface ModulePracticeLab {
  title: string;
  intro: string;
  interactiveWidget?: PracticeWidgetKey;
  caseStudy: {
    stageTitle: string;
    narrative: string;
    keyDecisions: string[];
  };
  misconceptions: { myth: string; reality: string }[];
  exercises: PracticalExercise[];
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  overview: string;
  objectives: string[];
  chapters: CourseChapter[];
  practiceLab: ModulePracticeLab;
  quiz: {
    intro: string;
    questions: KnowledgeCheckItem[];
  };
  researchEvidence: ResearchReference[];
}
