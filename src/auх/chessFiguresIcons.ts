import {
  faChessRook,
  faChessKing,
  faChessBishop,
  faChessPawn,
  faChessQueen,
  faChessKnight,
  faSquareFull,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

type FigureType = 'rook' | 'king' | 'bishop' | 'pawn' | 'queen' | 'knight';

type FiguresIcons = Record<FigureType | 0, IconDefinition>;

const figuresIcons: FiguresIcons = {
  0: faSquareFull,
  rook: faChessRook,
  king: faChessKing,
  bishop: faChessBishop,
  pawn: faChessPawn,
  queen: faChessQueen,
  knight: faChessKnight,
};

export const aux = {
  figuresIcons,
};
