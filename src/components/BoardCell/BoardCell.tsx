/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';

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
  isCellInCheck: boolean,
};

const StyledCellBox = styled(Box, {
  shouldForwardProp: (props) => props !== 'isDark' && props !== 'hasFigure' && props !== 'isCellInCheck',
})<StyledCellBoxProps>(({
  isDark,
  hasFigure,
  isCellInCheck,
}) => {
  let backgroundColor;

  if (isCellInCheck) {
    backgroundColor = '#CD3D2C';
  } else if (isDark) {
    backgroundColor = '#B58863';
  } else {
    backgroundColor = '#F0D9B5';
  }

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
    cursor: `${hasFigure ? 'grab' : ''}`,
    position: 'relative',
  };
});

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
  const {
    position,
  } = cell;

  const {
    figureType,
  } = cell.figure ? cell.figure : {};

  const [, , , , selectedFigure, selectFigure] = useFigures();

  const [playerTurn,
    ,
    ,
    , ,
    , , 
    whiteKingCheck,
    blackKingCheck,
  ] = useGameStatus();

  const checkIsHereKingAndHeInCheck = (cellForCheck: Cell) => {
    if (!cellForCheck.figure) {
      return false;
    }

    if (cellForCheck.figure.figureType !== 'king') {
      return false;
    }

    if (cellForCheck.figure.color === 'black' && blackKingCheck) {
      return true;
    }

    if (cellForCheck.figure.color === 'white' && whiteKingCheck) {
      return true;
    }

    return false;
  };

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

  useEffect(() => {
    console.log({ whiteKingCheck });
    console.log({ blackKingCheck });
  }, [whiteKingCheck, blackKingCheck]);

  return (
    <StyledCellBox
      key={uuid()}
      isDark={isDark}
      hasFigure={Boolean(cell.figure)}
      isCellInCheck={checkIsHereKingAndHeInCheck(cell)}
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
        (checkIsThisMovePosition(availableMoves, position) && figureType !== 'king') && (
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
