import {
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

import { Rook } from '../../../classes/Rook';
import { Knight } from '../../../classes/Knight';
import { Bishop } from '../../../classes/Bishop';
import { Queen } from '../../../classes/Queen';
import { King } from '../../../classes/King';
import { Pawn } from '../../../classes/Pawn';
import { Figure } from '../../../types/Figure';

type ReturnedFromUseFigures = [
  whiteFigures: Figure[],
  setWhiteFigures: Dispatch<SetStateAction<Figure[]>>,
  blackFigures: Figure[],
  setBlackFigures: Dispatch<SetStateAction<Figure[]>>,
];

const getWhitePawns = () => {
  const pawns = [];

  for (let i = 0; i <= 7; i++) {
    pawns.push(new Pawn(
      'white',
      { y: 6, x: i },
      { y: 6, x: i },
      '#F9F9F9',
    ));
  }

  return pawns;
};

const getBlackPawns = () => {
  const pawns = [];

  for (let i = 0; i <= 7; i++) {
    pawns.push(new Pawn(
      'black',
      { y: 1, x: i },
      { y: 1, x: i },
      '#575452',
    ));
  }

  return pawns;
};

const initialWhiteFigures = [
  new Rook('white', { x: 0, y: 7 }, { x: 0, y: 7 }, '#F9F9F9'),
  new Knight('white', { x: 1, y: 7 }, { x: 1, y: 7 }, '#F9F9F9'),
  new Bishop('white', { x: 2, y: 7 }, { x: 2, y: 7 }, '#F9F9F9'),
  new Queen('white', { x: 3, y: 7 }, { x: 4, y: 7 }, '#F9F9F9'),
  new King('white', { x: 4, y: 7 }, { x: 4, y: 7 }, '#F9F9F9'),
  new Bishop('white', { x: 5, y: 7 }, { x: 5, y: 7 }, '#F9F9F9'),
  new Knight('white', { x: 6, y: 7 }, { x: 6, y: 7 }, '#F9F9F9'),
  new Rook('white', { x: 7, y: 7 }, { x: 7, y: 7 }, '#F9F9F9'),
  ...getWhitePawns(),
];

const initialBlackFigures = [
  new Rook('black', { x: 0, y: 0 }, { x: 0, y: 0 }, '#5C5957'),
  new Knight('black', { x: 1, y: 0 }, { x: 1, y: 0 }, '#5C5957'),
  new Bishop('black', { x: 2, y: 0 }, { x: 2, y: 0 }, '#5C5957'),
  new Queen('black', { x: 3, y: 0 }, { x: 4, y: 0 }, '#5C5957'),
  new King('black', { x: 4, y: 0 }, { x: 4, y: 0 }, '#5C5957'),
  new Bishop('black', { x: 5, y: 0 }, { x: 5, y: 0 }, '#5C5957'),
  new Knight('black', { x: 6, y: 0 }, { x: 6, y: 0 }, '#5C5957'),
  new Rook('black', { x: 7, y: 0 }, { x: 7, y: 0 }, '#5C5957'),
  ...getBlackPawns(),
];

export const useFigures = (): ReturnedFromUseFigures => {
  const [whiteFigures, setWhiteFigures] = useState<Figure[]>(initialWhiteFigures);
  const [blackFigures, setBlackFigures] = useState<Figure[]>(initialBlackFigures);

  const value = useMemo(() => ([
    whiteFigures,
    setWhiteFigures,
    blackFigures,
    setBlackFigures,
  ]), [whiteFigures, blackFigures]) as ReturnedFromUseFigures;

  return value;
};
