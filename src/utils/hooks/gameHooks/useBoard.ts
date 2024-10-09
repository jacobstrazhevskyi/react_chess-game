/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import {
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react';

import { Cell } from '../../../classes/Cell';

import { BoardContext } from '../useBoardContext';

import { Board } from '../../../types/Board';
import { Figure } from '../../../types/Figure';

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

type UpdateFiguresProps = {
  whiteFigures: Figure[],
  blackFigures: Figure[],
};

type GetLongRangeMovesProps = {
  figure: Figure,
  currentBoard: Board,
  moves: number[][],
};

type GetPawnMovesProps = {
  figure: Figure,
  currentBoard: Board,
};

type GetDefaultMovesProps = {
  figure: Figure,
  currentBoard: Board,
  moves: number[][],
};

type TryToAddMoveProps = {
  position: Position,
  currentBoard: Board,
  figure: Figure,
  addToAvailableMoves: (position: Position) => void,
};

type ReturnedFromUseBoard = [
  Board,
  () => void,
  ({ whiteFigures, blackFigures }: UpdateFiguresProps) => void,
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

  const createBoard = useCallback(() => {
    setBoard(
      new Array(BOARD_SIZE)
        .fill(null).map((_, y) => new Array(BOARD_SIZE)
          .fill(null).map((__, x) => new Cell({ x, y }, 0))),
    );
  }, []);

  const updateFigures = useCallback(({
    whiteFigures,
    blackFigures,
  }: UpdateFiguresProps) => {
    const newBoard = new Array(BOARD_SIZE)
      .fill(null).map((_, y) => new Array(BOARD_SIZE)
        .fill(null).map((__, x) => new Cell({ x, y }, 0)));

    whiteFigures.forEach((figure) => {
      const { x, y } = figure.position;
      newBoard[y][x].figure = figure;
    });

    blackFigures.forEach((figure) => {
      const { x, y } = figure.position;
      newBoard[y][x].figure = figure;
    });

    setBoard(newBoard);
  }, []);

  const canBeatOpponentFigure = useCallback((
    { x, y }: Position,
    currentBoard: Board,
    figure: Figure,
  ) => {
    if (!currentBoard[y][x]?.figure) {
      return false;
    }

    if (currentBoard[y][x].figure.color !== figure.color) {
      return true;
    }

    return false;
  }, []);

  const isValidMove = useCallback(({ x, y }: Position, currentBoard: Board, figureColor: Figure['color']) => (
    x >= 0 && x < BOARD_SIZE && y >= 0
    && y < BOARD_SIZE
    && (currentBoard[y][x].figure ? currentBoard[y][x].figure.color !== figureColor : true)
  ), []);

  const getLongRangeMoves = useCallback(({
    figure,
    currentBoard,
    moves,
  }: GetLongRangeMovesProps) => {
    const availableMoves: Position[] = [];

    const { x, y } = figure.position;

    moves.forEach(([dx, dy]) => {
      let newX = x;
      let newY = y;

      while (true) {
        newX += dx;
        newY += dy;

        if (
          !isValidMove({ x: newX, y: newY }, currentBoard, figure.color)
        ) {
          break;
        }

        availableMoves.push({ x: newX, y: newY });

        if (canBeatOpponentFigure({ x: newX, y: newY }, currentBoard, figure)) {
          break;
        }
      }
    });

    return availableMoves;
  }, []);

  const tryToAddMove = useCallback(({
    position,
    currentBoard,
    figure,
    addToAvailableMoves,
  }: TryToAddMoveProps) => {
    const { x, y } = position;

    if (
      isValidMove(
        { x, y },
        currentBoard,
        figure.color,
      )
      && !canBeatOpponentFigure(
        { x, y },
        currentBoard,
        figure,
      )
    ) {
      addToAvailableMoves({ x, y });
    }
  }, []);

  const getPawnMoves = useCallback(({
    figure,
    currentBoard,
  }: GetPawnMovesProps) => {
    const availableMoves: Position[] = [];

    const addToAvailableMoves = (position: Position) => availableMoves.push(position);

    const [dx, dy] = figure.moves[0];
    const { x, y } = figure.position;
    const beatMoves = figure.beatMove as number[][];

    const newX = x + dx;
    const newY = y + dy;

    tryToAddMove({
      addToAvailableMoves,
      currentBoard,
      figure,
      position: { x: newX, y: newY },
    });

    if (figure.firstMove) {
      tryToAddMove({
        addToAvailableMoves,
        currentBoard,
        figure,
        position: { x: newX + dx, y: newY + dy },
      });
    }

    beatMoves.forEach(([bdx, bdy]) => {
      const newBeatX = x + bdx;
      const newBeatY = y + bdy;

      if (!canBeatOpponentFigure(
        { x: newBeatX, y: newBeatY },
        currentBoard,
        figure,
      )) {
        return;
      }

      availableMoves.push({
        x: newBeatX,
        y: newBeatY,
      });
    });

    return availableMoves;
  }, []);

  const getDefaultMoves = useCallback(({
    currentBoard,
    figure,
    moves,
  }: GetDefaultMovesProps) => {
    const availableMoves: Position[] = [];
    const { x, y } = figure.position;

    moves.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;

      if (isValidMove({ x: newX, y: newY }, currentBoard, figure.color)) {
        availableMoves.push({ x: newX, y: newY });
      }
    });

    return availableMoves;
  }, []);

  const getFigureMoves = useCallback(({
    currentBoard,
    figure,
  }: GetFigureMovesProps): Position[] => {
    if (!figure) {
      return [];
    }

    const { figureType } = figure;

    switch (figureType) {
      case 'bishop':
      case 'rook':
      case 'queen':
        return getLongRangeMoves({ currentBoard, figure, moves: figure.moves });

      case 'pawn':
        return getPawnMoves({ currentBoard, figure });

      case 'king':
      case 'knight':
        return getDefaultMoves({ currentBoard, figure, moves: figure.moves });

      default:
        return [];
    }
  }, []);

  const value = useMemo(() => [
    board,
    createBoard,
    updateFigures,
    getFigureMoves,
  ], [board]) as ReturnedFromUseBoard;

  return value;
};
