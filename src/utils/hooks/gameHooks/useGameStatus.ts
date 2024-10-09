/* eslint-disable no-unused-vars */
import {
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { GameStatusContext } from '../useGameStatusContext';
import { Figure } from '../../../types/Figure';

type Color = 'white' | 'black';

type ReturnedFromUseGameStatus = [
  playerTurn: Color,
  togglePlayerTurn: (currentPlayer: Color) => void,
  beatenBlackFigures: Figure[],
  beatenWhiteFigures: Figure[],
  addBeatenFigureToCount: (figure: Figure) => void,
];

export const useGameStatus = (): ReturnedFromUseGameStatus => {
  const context = useContext(GameStatusContext);

  if (context) {
    return context;
  }

  const [playerTurn, setplayerTurn] = useState('white');

  const [beatenBlackFigures, setBeatenBlackFigures] = useState<Figure[]>([]);
  const [beatenWhiteFigures, setBeatenWhiteFigures] = useState<Figure[]>([]);

  const togglePlayerTurn = useCallback((currentPlayer: Color) => {
    let newPlayer = currentPlayer;

    if (currentPlayer === 'white') {
      newPlayer = 'black';
    } else {
      newPlayer = 'white';
    }

    setplayerTurn(newPlayer);
  }, []);

  const addBeatenFigureToCount = useCallback((figure: Figure) => {
    const figureColor = figure.color;

    let newBeatenFigures;

    if (figureColor === 'black') {
      newBeatenFigures = beatenBlackFigures;
      newBeatenFigures.push(figure);

      setBeatenBlackFigures(newBeatenFigures);
    } else {
      newBeatenFigures = beatenWhiteFigures;
      newBeatenFigures.push(figure);

      setBeatenWhiteFigures(newBeatenFigures);
    }
  }, []);

  const value = useMemo(() => [
    playerTurn,
    togglePlayerTurn,
    beatenBlackFigures,
    beatenWhiteFigures,
    addBeatenFigureToCount,
  ], [
    playerTurn,
    beatenBlackFigures,
    beatenWhiteFigures,
  ]) as ReturnedFromUseGameStatus;

  return value;
};
