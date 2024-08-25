import { Figure } from './Figure';

type Position = {
  x: number,
  y: number,
};

export class Queen extends Figure {
  constructor(color: string, position: Position, initialPosition: Position, hexColor: string) {
    super(color, 'queen', position, initialPosition, hexColor);
  }
}
