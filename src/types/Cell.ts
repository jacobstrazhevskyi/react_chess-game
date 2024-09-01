import { Figure } from './Figure';

type Position = {
  x: number,
  y: number,
};

export interface Cell {
  position: Position,
  figure: Figure | 0,
}
