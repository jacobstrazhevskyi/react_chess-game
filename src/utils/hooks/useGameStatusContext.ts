import { createContext, useContext } from 'react';
import { Figure } from '../../types/Figure';
import { Position } from '../../types/Position';
import { Board } from '../../types/Board';

type Color = 'white' | 'black';

type CheckForKingsCheckProps = {
  board: Board,
  figure: Figure,
  availableMoves: Position[],
};

type GameStatusContextType = [
  playerTurn: Color,
  togglePlayerTurn: (currentPlayer: Color) => void,
  beatenBlackFigures: Figure[],
  beatenWhiteFigures: Figure[],
  addBeatenFigureToCount: (figure: Figure) => void,
  movedFigurePrevState: Figure,
  setMovedFigurePrevState: (figure: Figure) => void,
  checkForWhiteKing: boolean,
  checkForBlackKing: boolean,
  checkForKingsCheck: ({
    figure,
    availableMoves,
    board,
  }: CheckForKingsCheckProps) => void,
];

export const GameStatusContext = createContext<GameStatusContextType | undefined>(undefined);

export const useGameStatusContext = (): GameStatusContextType => {
  const context = useContext(GameStatusContext);
  if (!context) {
    throw new Error('useGameStatusContext must be used within a GameStatusProvider');
  }
  return context;
};
