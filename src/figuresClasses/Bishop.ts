import { Figure } from './Figure';

type Position = {
  x: number,
  y: number,
};

export class Bishop extends Figure {
  constructor(color: string, position: Position, initialPosition: Position, hexColor: string) {
    super(color, 'bishop', position, initialPosition, hexColor);
  }
}
