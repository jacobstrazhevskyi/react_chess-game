/* eslint-disable no-unused-vars */
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

type ReturnedFromUseFigures = [
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

  const [selectedFigure, setSelectedFigure] = useState<Figure>();

  const selectFigure = ({ x, y }: Position) => {
    const figures = [...whiteFigures, ...blackFigures];

    const findedFigure = figures.find((figure) => figure.position.x === x 
      && figure.position.y === y);

    setSelectedFigure(findedFigure);
  };

  const isCellWithOpponentFigure = ({
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
  };

  const getFiguresWithoutDeleted = ({
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
      newFigures.splice(indexToDelete, 1);
    }

    return newFigures;
  };

  const moveFigure = ({
    moveTo,
    figure,
    currentWhiteFigures,
    currentBlackFigures,
  }: MoveFigureProps) => {
    for (let i = 0; i < currentWhiteFigures.length; i++) {
      if (
        currentWhiteFigures[i].position.x === figure.position.x
        && currentWhiteFigures[i].position.y === figure.position.y
      ) {
        const newWhiteFigures = [...currentWhiteFigures];

        const newFigure = figure;

        newFigure.position = moveTo;

        if (isCellWithOpponentFigure({
          position: moveTo,
          figureColor: figure.color,
          opponentFigures: currentBlackFigures,
        })) {
          setBlackFigures(
            getFiguresWithoutDeleted({
              figures: currentBlackFigures,
              position: moveTo,
            }),
          );
        }

        newWhiteFigures[i] = newFigure;

        setWhiteFigures(newWhiteFigures);
        return;
      }
    }

    for (let i = 0; i < currentBlackFigures.length; i++) {
      if (
        currentBlackFigures[i].position.x === figure.position.x
        && currentBlackFigures[i].position.y === figure.position.y
      ) {
        const newBlackFigures = [...currentBlackFigures];

        const newFigure = figure;

        newFigure.position = moveTo;

        if (isCellWithOpponentFigure({
          position: moveTo,
          figureColor: figure.color,
          opponentFigures: currentWhiteFigures,
        })) {
          setWhiteFigures(
            getFiguresWithoutDeleted({
              figures: currentWhiteFigures,
              position: moveTo,
            }),
          );
        }

        newBlackFigures[i] = newFigure;

        setBlackFigures(newBlackFigures);
        return;
      }
    }
  };

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
