import { Figure } from './Figure';

type Position = {
  x: number,
  y: number,
};

export class King extends Figure {
  constructor(color: string, position: Position, initialPosition: Position, hexColor: string) {
    super(color, 'king', position, initialPosition, hexColor);
  }

  moves = [
    [1, 1], [1, -1], [-1, 1], [-1, -1],
    [0, 1], [0, -1], [1, 0], [-1, 0],
  ];
}
