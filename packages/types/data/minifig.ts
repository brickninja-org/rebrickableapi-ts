import type { Set } from "./set";

export type Minifig = Omit<Set, 'year' | 'theme_id'>;
