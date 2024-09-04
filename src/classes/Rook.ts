import { Figure } from './Figure';

type Position = {
  x: number,
  y: number,
};

export class Rook extends Figure {
  constructor(color: string, position: Position, initialPosition: Position, hexColor: string) {
    super(color, 'rook', position, initialPosition, hexColor);
  }

  moves = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
  ];
}
