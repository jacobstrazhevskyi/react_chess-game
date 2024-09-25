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

type UpdateFiguresProps = {
  whiteFigures: Figure[],
  blackFigures: Figure[],
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

  const createBoard = () => {
    setBoard(
      new Array(BOARD_SIZE)
        .fill(null).map((_, y) => new Array(BOARD_SIZE)
          .fill(null).map((__, x) => new Cell({ x, y }, 0))),
    );
  };

  const updateFigures = ({
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
  };

  const canBeatOpponentFigure = useCallback((
    { x, y }: Position,
    currentBoard: Board,
    figure: Figure,
  ) => {
    if (currentBoard[y][x].figure) {
      if (currentBoard[y][x].figure.color !== figure.color) {
        return true;
      }
    }

    return false;
  }, []);

  const isValidMove = useCallback(({ x, y }: Position, currentBoard: Board, figureColor: Figure['color']) => (
    x >= 0 && x < BOARD_SIZE && y >= 0
    && y < BOARD_SIZE
    && (currentBoard[y][x].figure ? currentBoard[y][x].figure.color !== figureColor : true)
  ), []);

  const getFigureMoves = ({ currentBoard, figure }: GetFigureMovesProps): Position[] => {
    const availableMoves: Position[] = [];

    if (!figure) {
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

        while (true) {
          newX += dx;
          newY += dy;

          if (
            !isValidMove({ x: newX, y: newY }, currentBoard, figure.color)
          ) {
            break;
          }

          if (canBeatOpponentFigure({ x: newX, y: newY }, currentBoard, figure)) {
            availableMoves.push({ x: newX, y: newY });
            break;
          }

          availableMoves.push({ x: newX, y: newY });
        }
      });

      return availableMoves;
    }

    if (figure.figureType === 'pawn') {
      const [dx, dy] = moves[0];

      let newX = x + dx;
      let newY = y + dy;

      if (
        isValidMove(
          { x: newX, y: newY },
          currentBoard,
          figure.color,
        )
        && !canBeatOpponentFigure(
          { x: newX, y: newY },
          currentBoard,
          figure,
        )
      ) {
        availableMoves.push({
          x: newX,
          y: newY,
        });

        if (figure.firstMove) {
          newX += dx;
          newY += dy;

          if (!canBeatOpponentFigure(
            { x: newX, y: newY },
            currentBoard,
            figure,
          )) {
            availableMoves.push({
              x: newX,
              y: newY,
            });
          }
        }
      }

      return availableMoves;
    }

    moves.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;

      if (isValidMove({ x: newX, y: newY }, currentBoard, figure.color)) {
        availableMoves.push({ x: newX, y: newY });
      }
    });

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
