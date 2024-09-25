type Position = {
  x: number,
  y: number,
};

type FigureType = 'rook' | 'king' | 'bishop' | 'pawn' | 'queen' | 'knight';

export interface Figure {
  readonly color: string,
  readonly figureType: FigureType,
  position: Position,
  readonly initialPosition: Position,
  hexColor: string,
  moves: number[][],
  firstMove?: boolean,
}
