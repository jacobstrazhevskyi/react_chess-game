type Position = {
  x: number,
  y: number,
};

type FigureType = 'rook' | 'king' | 'bishop' | 'pawn' | 'queen' | 'knight';

export interface Figure {
  color: string,
  figure: FigureType,
  position: Position,
  readonly initialPosition: Position,
  hexColor: string,
}
