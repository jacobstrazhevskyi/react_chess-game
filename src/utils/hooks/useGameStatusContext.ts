import { createContext, useContext } from 'react';

type Color = 'white' | 'black';

type GameStatusContextType = [
  playerTurn: Color,
  togglePlayerTurn: (currentPlayer: Color) => void,
];

export const GameStatusContext = createContext<GameStatusContextType | undefined>(undefined);

export const useGameStatusContext = (): GameStatusContextType => {
  const context = useContext(GameStatusContext);
  if (!context) {
    throw new Error('useGameStatusContext must be used within a GameStatusProvider');
  }
  return context;
};
