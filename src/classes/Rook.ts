import { Figure } from './Figure';

type Position = {
  x: number,
  y: number,
};

export class Rook extends Figure {
  constructor(color: string, position: Position, initialPosition: Position, hexColor: string) {
    super(color, 'rook', position, initialPosition, hexColor);
  }
}
