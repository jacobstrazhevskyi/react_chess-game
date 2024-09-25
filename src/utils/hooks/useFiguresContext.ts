/* eslint-disable no-unused-vars */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

import { Figure } from '../../types/Figure';

type Position = {
  x: number,
  y: number,
};

type MoveFigureProps = {
  figure: Figure,
  moveTo: Position,
  currentWhiteFigures: Figure[],
  currentBlackFigures: Figure[],
};

type FiguresContextType = [
  whiteFigures: Figure[],
  setWhiteFigures: Dispatch<SetStateAction<Figure[]>>,
  blackFigures: Figure[],
  setBlackFigures: Dispatch<SetStateAction<Figure[]>>,
  selectedFigure: Figure,
  selectFigure: ({ x, y }: Position) => void,
  moveFigure: ({
    moveTo,
    figure,
    currentWhiteFigures,
    currentBlackFigures,
  }: MoveFigureProps) => void
];

export const FiguresContext = createContext<FiguresContextType | undefined>(undefined);

export const useFiguresContext = (): FiguresContextType => {
  const context = useContext(FiguresContext);
  if (!context) {
    throw new Error('useFiguresContext must be used within a FiguresProvider');
  }
  return context;
};
