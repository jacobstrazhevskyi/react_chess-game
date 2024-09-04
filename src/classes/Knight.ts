import { Figure } from './Figure';

type Position = {
  x: number,
  y: number,
};

export class Knight extends Figure {
  constructor(color: string, position: Position, initialPosition: Position, hexColor: string) {
    super(color, 'knight', position, initialPosition, hexColor);
  }

  moves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2],
  ];
}
