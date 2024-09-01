/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react';
import { Board } from '../../types/Board';
import { Figure } from '../../types/Figure';

type SetFiguresProps = {
  whiteFigures: Figure[],
  blackFigures: Figure[],
};

type BoardContextType = [
  Board,
  () => void,
  ({ whiteFigures, blackFigures }: SetFiguresProps) => void,
];

export const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoardContext = (): BoardContextType => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
};
