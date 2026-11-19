import type { CourseModule } from './courseTypes';
import { COURSE_MODULES_PART_1 } from './courseModulesPart1';
import { COURSE_MODULES_PART_2 } from './courseModulesPart2';

export const COURSE_MODULES: CourseModule[] = [
  ...COURSE_MODULES_PART_1,
  ...COURSE_MODULES_PART_2,
];

export const TOTAL_CHAPTERS = COURSE_MODULES.reduce(
  (sum, mod) => sum + mod.chapters.length,
  0,
);
