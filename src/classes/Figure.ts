import { Figure as FigureClassType } from '../types/Figure';

type Position = {
  x: number,
  y: number,
};

type FigureType = 'rook' | 'king' | 'bishop' | 'pawn' | 'queen' | 'knight';

export abstract class Figure implements FigureClassType {
  constructor(
    color: string,
    figureType: FigureType,
    position: Position,
    initialPosition: Position,
    hexColor: string,
  ) {
    this.color = color;
    this.figureType = figureType;
    this.position = position;
    this.initialPosition = initialPosition;
    this.hexColor = hexColor;
  }

  readonly color: string;

  readonly figureType: FigureType;

  position: Position;

  readonly initialPosition: Position;

  hexColor: string;

  abstract moves: number[][];
}
