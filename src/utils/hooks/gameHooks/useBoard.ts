/* eslint-disable no-unused-vars */
import { useState, useMemo, useContext } from 'react';
import { Board } from '../../../types/Board';
import { Figure } from '../../../types/Figure';
import { Cell } from '../../../classes/Cell';
import { BoardContext } from '../useBoardContext';

type SetFiguresProps = {
  whiteFigures: Figure[],
  blackFigures: Figure[],
};

type ReturnedFromUseBoard = [
  Board,
  () => void,
  ({ whiteFigures, blackFigures }: SetFiguresProps) => void,
];

export const useBoard = (): ReturnedFromUseBoard => {
  const context = useContext(BoardContext);

  if (context) {
    return context;
  }

  const [board, setBoard] = useState<Board>(
    new Array(8)
      .fill(null).map((_, y) => new Array(8)
        .fill(null).map((__, x) => new Cell({ x, y }, 0))),
  );

  const createBoard = () => {
    setBoard(
      new Array(8)
        .fill(null).map((_, y) => new Array(8)
          .fill(null).map((__, x) => new Cell({ x, y }, 0))),
    );
  };

  const setFigures = ({
    whiteFigures,
    blackFigures,
  }: SetFiguresProps) => {
    const newBoard = [...board];

    whiteFigures.forEach((figure) => {
      const { x, y } = figure.position;
      newBoard[y][x].figure = figure;
    });

    blackFigures.forEach((figure) => {
      const { x, y } = figure.position;
      newBoard[y][x].figure = figure;
    });

    setBoard(newBoard);
  };

  const value = useMemo(() => [board, createBoard, setFigures], [board]) as ReturnedFromUseBoard;

  return value;
};
