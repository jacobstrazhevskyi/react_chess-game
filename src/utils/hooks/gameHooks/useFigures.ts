/* eslint-disable no-unused-vars */
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Rook } from '../../../classes/Rook';
import { Knight } from '../../../classes/Knight';
import { Bishop } from '../../../classes/Bishop';
import { Queen } from '../../../classes/Queen';
import { King } from '../../../classes/King';
import { Pawn } from '../../../classes/Pawn';

import { FiguresContext } from '../useFiguresContext';

import { useGameStatus } from './useGameStatus';

import { Figure } from '../../../types/Figure';

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

type IsCellWithOpponentFigureProps = {
  position: Position,
  figureColor: Figure['color'],
  opponentFigures: Figure[],
};

type GetFiguresWithoutDeletedProps = {
  figures: Figure[],
  position: Position,
}

type IsThisFigureMatchInColorAndThisFigureIsToMoveProps = {
  currentFigures: Figure[],
  currentOpponentFigures: Figure[],
  figure: Figure,
  moveTo: Position,
  setFigures: (value: Figure[]) => void,
  setOpponentFigures: (value: Figure[]) => void,
}

type CheckIsFigureToMoveAndSetFiguresAndReturnStatusProps = {
  currentFigures: Figure[],
  currentOpponentFigures: Figure[],
  figure: Figure,
  moveTo: Position,
  setFigures: (value: Figure[]) => void,
  setOpponentFigures: (value: Figure[]) => void,
  indexOfFigure: number,
};

type CheckForOpponentFigureAndSetProps = {
  moveTo: Position,
  figure: Figure,
  currentOpponentFigures: Figure[],
  setOpponentFigures: (value: Figure[]) => void,
};

type CheckFigureTypeIsPawnAndSetFirstMovePropToFalseProps = {
  figure: Figure,
  setPawnFirstMovePropToFalse: () => void,
};

type ReturnedFromUseFigures = [
  whiteFigures: Figure[],
  setWhiteFigures: Dispatch<SetStateAction<Figure[]>>,
  blackFigures: Figure[],
  setBlackFigures: Dispatch<SetStateAction<Figure[]>>,
  selectedFigure: Figure,
  selectFigure: ({ x, y }: Position, figureColor?: 'black' | 'white') => void,
  moveFigure: ({
    moveTo,
    figure,
    currentWhiteFigures,
    currentBlackFigures,
  }: MoveFigureProps) => void
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
  const context = useContext(FiguresContext);

  if (context) {
    return context;
  }

  const addBeatenFigureToCount = useGameStatus()[4];

  const [whiteFigures, setWhiteFigures] = useState<Figure[]>(initialWhiteFigures);
  const [blackFigures, setBlackFigures] = useState<Figure[]>(initialBlackFigures);

  const [selectedFigure, setSelectedFigure] = useState<Figure>();

  const selectFigure = useCallback(({ x, y }: Position, figureColor: 'white' | 'black') => {
    const figures = [...whiteFigures, ...blackFigures];

    const findedFigure = figures.find((figure) => figure.position.x === x
      && figure.position.y === y && figure.color === figureColor);

    setSelectedFigure(findedFigure);
  }, []);

  const isCellWithOpponentFigure = useCallback(({
    position,
    figureColor,
    opponentFigures,
  }: IsCellWithOpponentFigureProps) => {
    const { x, y } = position;

    return opponentFigures.some(figure => (
      figure.position.x === x
      && figure.position.y === y
      && figureColor !== figure.color
    ));
  }, []);

  const getFiguresWithoutDeleted = useCallback(({
    figures,
    position,
  }: GetFiguresWithoutDeletedProps) => {
    const newFigures = [...figures];

    const { x, y } = position;

    const indexToDelete = newFigures.findIndex(figure => (
      figure.position.x === x
      && figure.position.y === y
    ));

    if (indexToDelete !== -1) {
      addBeatenFigureToCount(newFigures[indexToDelete]);
      newFigures.splice(indexToDelete, 1);
    }

    return newFigures;
  }, []);

  const checkFigureTypeIsPawnAndSetFirstMovePropToFalse = useCallback(({
    figure,
    setPawnFirstMovePropToFalse,
  }: CheckFigureTypeIsPawnAndSetFirstMovePropToFalseProps) => {
    if (figure.figureType === 'pawn') {
      setPawnFirstMovePropToFalse();
    }
  }, []);

  const checkForOpponentFigureAndSet = useCallback(({
    moveTo,
    figure,
    currentOpponentFigures,
    setOpponentFigures,
  }: CheckForOpponentFigureAndSetProps) => {
    if (isCellWithOpponentFigure({
      position: moveTo,
      figureColor: figure.color,
      opponentFigures: currentOpponentFigures,
    })) {
      setOpponentFigures(
        getFiguresWithoutDeleted({
          figures: currentOpponentFigures,
          position: moveTo,
        }),
      );
    }
  }, []);

  const checkIsFigureToMoveAndSetFiguresAndReturnStatus = useCallback(({
    currentFigures,
    figure,
    moveTo,
    setFigures,
    setOpponentFigures,
    currentOpponentFigures,
    indexOfFigure,
  }: CheckIsFigureToMoveAndSetFiguresAndReturnStatusProps) => {
    if (
      currentFigures[indexOfFigure].position.x === figure.position.x
      && currentFigures[indexOfFigure].position.y === figure.position.y
    ) {
      const newFigures = [...currentFigures];

      const newFigure = figure;

      newFigure.position = moveTo;

      const setPawnFirstMovePropToFalse = () => {
        newFigure.firstMove = false;
      };

      checkFigureTypeIsPawnAndSetFirstMovePropToFalse({
        figure,
        setPawnFirstMovePropToFalse,
      });

      checkForOpponentFigureAndSet({
        currentOpponentFigures,
        figure,
        moveTo,
        setOpponentFigures,
      });

      newFigures[indexOfFigure] = newFigure;

      setFigures(newFigures);

      return true;
    }

    return false;
  }, []);

  const checkIsThisFigureMatchInColorAndThisFigureIsToMoveAndSetFigures = useCallback(({
    currentFigures,
    currentOpponentFigures,
    figure,
    moveTo,
    setFigures,
    setOpponentFigures,
  }: IsThisFigureMatchInColorAndThisFigureIsToMoveProps) => {
    for (let i = 0; i < currentFigures.length; i++) {
      const isFigureToMove = checkIsFigureToMoveAndSetFiguresAndReturnStatus({
        currentFigures,
        currentOpponentFigures,
        figure,
        moveTo,
        setFigures,
        setOpponentFigures,
        indexOfFigure: i,
      });

      if (isFigureToMove) {
        return;
      }
    }
  }, []);

  const moveFigure = useCallback(({
    moveTo,
    figure,
    currentWhiteFigures,
    currentBlackFigures,
  }: MoveFigureProps) => {
    if (figure.color === 'black') {
      checkIsThisFigureMatchInColorAndThisFigureIsToMoveAndSetFigures({
        currentFigures: currentBlackFigures,
        currentOpponentFigures: currentWhiteFigures,
        figure,
        moveTo,
        setFigures: setBlackFigures,
        setOpponentFigures: setWhiteFigures,
      });
    } else {
      checkIsThisFigureMatchInColorAndThisFigureIsToMoveAndSetFigures({
        currentFigures: currentWhiteFigures,
        currentOpponentFigures: currentBlackFigures,
        figure,
        moveTo,
        setFigures: setWhiteFigures,
        setOpponentFigures: setBlackFigures,
      });
    }
  }, []);

  const value = useMemo(() => ([
    whiteFigures,
    setWhiteFigures,
    blackFigures,
    setBlackFigures,
    selectedFigure,
    selectFigure,
    moveFigure,
  ]), [whiteFigures, blackFigures, selectedFigure]) as ReturnedFromUseFigures;

  return value;
};
