import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import uuid from 'react-uuid';

import { Box, styled } from '@mui/material';

import { Cell } from '../../types/Cell';
import { BoardCell } from '../BoardCell';
import { useFigures } from '../../utils/hooks/gameHooks/useFigures';
import { useBoard } from '../../utils/hooks/gameHooks/useBoard';

const StyledRowBox = styled(Box)({
  display: 'contents',
});

type Position = {
  x: number,
  y: number,
};

type Props = {
  boardRow: (Cell)[],
  rowIndex: number,
};

const isPropsAreEqual = (prevProps: Props, nextProps: Props) => {
  const isBoardRowChanged = JSON.stringify(prevProps.boardRow)
    === JSON.stringify(nextProps.boardRow);
  
  return isBoardRowChanged;
};

export const BoardRow: React.FC<Props> = React.memo(({
  boardRow,
  rowIndex,
}) => {
  const [, , , , selectedFigure] = useFigures();
  const [board, , , getFigureMoves] = useBoard();

  const [availableMoves, setAvailableMoves] = useState<Position[]>([]);
  const availableMovesRef = useRef<Position[]>([]);

  useEffect(() => {
    if (selectedFigure) {
      const newMoves = getFigureMoves({
        currentBoard: board,
        figure: selectedFigure,
      });
      
      if (JSON.stringify(newMoves) !== JSON.stringify(availableMovesRef.current)) {
        availableMovesRef.current = newMoves;
        setAvailableMoves(newMoves);
      }
    }
  }, [selectedFigure, board, availableMoves]);

  const memoizedBoardRow = useMemo(() => boardRow, [boardRow]);

  return (
    <StyledRowBox>
      {memoizedBoardRow.map((cell: Cell, cellIndex: number) => {
        const isDark = (rowIndex + cellIndex) % 2 === 1;

        return (
          <BoardCell
            key={uuid()}
            cell={cell}
            isDark={isDark}
            availableMoves={availableMoves}
            setAvailableMoves={setAvailableMoves}
          />
        );
      })}
    </StyledRowBox>
  );
}, isPropsAreEqual);

BoardRow.displayName = 'BoardRow';
