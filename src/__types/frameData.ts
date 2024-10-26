import { TekkenMoveCategory } from './moveCategories';

export type FrameData = {
  input: string;
  hit_level: string;
  damage: number;
  startup: number;
  block: number;
  hit: number;
  counter: number;
  notes: string[];
  name: string;
  alternateInputs: string[];
  categories: TekkenMoveCategory[];
};
