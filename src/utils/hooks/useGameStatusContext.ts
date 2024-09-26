import { createContext, useContext } from 'react';
import { Figure } from '../../types/Figure';

type Color = 'white' | 'black';

type GameStatusContextType = [
  playerTurn: Color,
  togglePlayerTurn: (currentPlayer: Color) => void,
  beatenBlackFigures: Figure[],
  beatenWhiteFigures: Figure[],
  addBeatenFigureToCount: (figure: Figure) => void,
];

export const GameStatusContext = createContext<GameStatusContextType | undefined>(undefined);

export const useGameStatusContext = (): GameStatusContextType => {
  const context = useContext(GameStatusContext);
  if (!context) {
    throw new Error('useGameStatusContext must be used within a GameStatusProvider');
  }
  return context;
};
