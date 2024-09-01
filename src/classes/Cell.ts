import { Figure } from '../types/Figure';

type Position = {
  x: number,
  y: number,
};

export class Cell {
  constructor(position: Position, figure: Figure | 0) {
    this.position = position;
    this.figure = figure;
  }

  position: Position;

  figure: Figure | 0;
}
