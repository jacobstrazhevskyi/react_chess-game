import { Position } from '../types/Position';

export const checkIsThisMovePosition = (moves: Position[], cellPosition: Position) => {
  const isPossibleMovePosition = moves.some(
    move => move.x === cellPosition.x && move.y === cellPosition.y,
  );

  return isPossibleMovePosition;
};
