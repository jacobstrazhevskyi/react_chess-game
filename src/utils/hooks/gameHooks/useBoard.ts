/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import {
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react';

import { Board } from '../../../types/Board';
import { Figure } from '../../../types/Figure';
import { Cell } from '../../../classes/Cell';
import { BoardContext } from '../useBoardContext';

import { aux as settingsAux } from '../../../auх/settings';

const {
  BOARD_SIZE,
} = settingsAux.settings;

type Position = {
  x: number,
  y: number,
};

type GetFigureMovesProps = {
  currentBoard: Board,
  figure: Figure,
};

type SetFiguresProps = {
  prevBoard: Board,
  whiteFigures: Figure[],
  blackFigures: Figure[],
};

type ReturnedFromUseBoard = [
  Board,
  () => void,
  ({ whiteFigures, blackFigures }: SetFiguresProps) => void,
  ({ currentBoard, figure }: GetFigureMovesProps) => Position[],
];

export const useBoard = (): ReturnedFromUseBoard => {
  const context = useContext(BoardContext);

  if (context) {
    return context;
  }

  const [board, setBoard] = useState<Board>(
    new Array(BOARD_SIZE)
      .fill(null).map((_, y) => new Array(BOARD_SIZE)
        .fill(null).map((__, x) => new Cell({ x, y }, 0))),
  );

  const createBoard = () => {
    setBoard(
      new Array(BOARD_SIZE)
        .fill(null).map((_, y) => new Array(BOARD_SIZE)
          .fill(null).map((__, x) => new Cell({ x, y }, 0))),
    );
  };

  const updateFigures = ({
    prevBoard,
    whiteFigures,
    blackFigures,
  }: SetFiguresProps) => {
    const newBoard = [...prevBoard];

    whiteFigures.forEach((figure) => {
      const { x, y } = figure.position;
      newBoard[y][x].figure = figure;
    });

    blackFigures.forEach((figure) => {
      const { x, y } = figure.position;
      newBoard[y][x].figure = figure;
    });

    console.log(123);

    setBoard(newBoard);
  };

  const isValidMove = useCallback(({ x, y }: Position, currentBoard: Board, figureColor: Figure['color']) => (
    x >= 0 && x < BOARD_SIZE && y >= 0
    && y < BOARD_SIZE
    && (currentBoard[y][x].figure ? currentBoard[y][x].figure.color !== figureColor : true)
  ), []);

  const getFigureMoves = ({ currentBoard, figure }: GetFigureMovesProps): Position[] => {
    const availableMoves: Position[] = [];

    if (!figure) {
      console.log(123);
      return [];
    }

    const { x, y } = figure.position;

    const { moves } = figure;

    if (figure.figureType === 'bishop'
      || figure.figureType === 'rook'
      || figure.figureType === 'queen'
    ) {
      moves.forEach(([dx, dy]) => {
        let newX = x;
        let newY = y;

        while (isValidMove({ x: newX, y: newY }, currentBoard, figure.color)) {
          newX += dx;
          newY += dy;

          availableMoves.push({ x: newX, y: newY });
        }
      });

      console.log(availableMoves);

      return availableMoves;
    }

    moves.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;

      if (isValidMove({ x: newX, y: newY }, currentBoard, figure.color)) {
        availableMoves.push({ x: newX, y: newY });
      }
    });

    console.log(moves);
    console.log(figure);
    console.log(availableMoves);

    return availableMoves;
  };

  const value = useMemo(() => [
    board,
    createBoard,
    updateFigures,
    getFigureMoves,
  ], [board]) as ReturnedFromUseBoard;

  return value;
};
