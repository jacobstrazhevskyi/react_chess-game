import { Figure } from './Figure';

type Position = {
  x: number,
  y: number,
};

export class Pawn extends Figure {
  constructor(color: string, position: Position, initialPosition: Position, hexColor: string) {
    super(color, 'pawn', position, initialPosition, hexColor);
  }

  moves = [this.color === 'white' ? [0, -1] : [0, 1]];

  firstMove = true;

  beatMove = this.color === 'white' ? [...[[1, -1], [-1, -1]]] : [...[[1, 1], [-1, 1]]];
}
