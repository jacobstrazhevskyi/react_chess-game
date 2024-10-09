/* eslint-disable no-unused-vars */
import React from 'react';

import { Box, styled } from '@mui/material';

import uuid from 'react-uuid';

import { useGameStatus } from '../../utils/hooks/gameHooks/useGameStatus';
import { useFigures } from '../../utils/hooks/gameHooks/useFigures';
import { Cell } from '../../types/Cell';
import { CaptureIndicator } from '../CaptureIndicator';
import { ChessFigure } from '../ChessFigure';
import { Figure } from '../../types/Figure';
import { checkIsThisMovePosition } from '../../utils/checkIsThisMovePosition';
import { Position } from '../../types/Position';

type StyledCellBoxProps = {
  isDark: boolean,
  hasFigure: boolean,
};

const StyledCellBox = styled(Box, {
  shouldForwardProp: (props) => props !== 'isDark' && props !== 'hasFigure',
})<StyledCellBoxProps>(({
  isDark,
  hasFigure,
}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `${isDark ? '#B58863' : '#F0D9B5'}`,
  cursor: `${hasFigure ? 'grab' : ''}`,
  position: 'relative',
}));

type Props = {
  cell: Cell,
  isDark: boolean,
  availableMoves: Position[],
  setAvailableMoves: (value: Position[]) => void,
};

const isPropsAreEqual = (prevProps: Props, nextProps: Props) => {
  const isFigureChanged = JSON.stringify(prevProps.cell)
    === JSON.stringify(nextProps.cell);
  
  const isMovePositionChanged = checkIsThisMovePosition(
    prevProps.availableMoves,
    prevProps.cell.position,
  ) === checkIsThisMovePosition(
    nextProps.availableMoves,
    nextProps.cell.position,
  );
  
  return isFigureChanged && isMovePositionChanged;
};

export const BoardCell: React.FC<Props> = React.memo(({
  cell,
  isDark,
  availableMoves,
  setAvailableMoves,
}) => {
  const [, , , , selectedFigure, selectFigure] = useFigures();
  const [playerTurn] = useGameStatus();

  const handleSelect = (selectedCell: Cell) => {
    if (!selectedCell.figure) {
      return;
    }

    const {
      figure,
      position: {
        x,
        y,
      },
    } = selectedCell;

    if (figure.color !== playerTurn) {
      return;
    }

    if (!selectedFigure) {
      selectFigure({ x, y }, figure.color);
      return;
    }

    if (selectedFigure.position.x === x
      && selectedFigure.position.y === y
    ) {
      selectFigure({ x: -1, y: -1 });
    } else {
      selectFigure({ x, y }, figure.color);
    }
  };

  return (
    <StyledCellBox
      key={uuid()}
      isDark={isDark}
      hasFigure={Boolean(cell.figure)}
      onClick={() => handleSelect(cell)}
    >
      {
        Boolean(cell.figure) && (
          <ChessFigure
            figure={cell.figure as Figure}
          />
        )
      }
      {
        checkIsThisMovePosition(availableMoves, cell.position) && (
          <CaptureIndicator
            cell={cell}
            setAvailableMoves={setAvailableMoves}
          />
        )
      }
    </StyledCellBox>
  );
}, isPropsAreEqual);

BoardCell.displayName = 'BoardCell';
