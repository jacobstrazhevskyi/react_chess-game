type Position = {
  x: number,
  y: number,
};

type FigureType = 'rook' | 'king' | 'bishop' | 'pawn' | 'queen' | 'knight';

export abstract class Figure {
  constructor(
    color: string,
    figure: FigureType,
    position: Position,
    initialPosition: Position,
    hexColor: string,
  ) {
    this.color = color;
    this.figure = figure;
    this.position = position;
    this.initialPosition = initialPosition;
    this.hexColor = hexColor;
  }

  color: string;

  figure: string;

  position: Position;

  readonly initialPosition: Position;

  hexColor: string;
}
