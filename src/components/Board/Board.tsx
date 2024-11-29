/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import uuid from 'react-uuid';

import { Box, styled } from '@mui/material';
import { useBoard } from '../../utils/hooks/gameHooks/useBoard';
import { useFigures } from '../../utils/hooks/gameHooks/useFigures';
import { BoardRow } from '../BoardRow';
import { useGameStatus } from '../../utils/hooks/gameHooks/useGameStatus';

const StyledRowBox = styled(Box)({
  display: 'contents',
});

export const Board: React.FC = () => {
  const [board, , updateFigures, getFigureMoves] = useBoard();
  const [whiteFigures, , blackFigures] = useFigures();
  const [
    ,
    ,
    ,
    , ,
    lastMovedFigure, ,
    , ,
    checkForKingsCheck,
  ] = useGameStatus();

  useEffect(() => {
    updateFigures({ whiteFigures, blackFigures });
  }, [whiteFigures, blackFigures]);

  useEffect(() => {
    const lastMovedFigureAvailableMoves = getFigureMoves({
      currentBoard: board,
      figure: lastMovedFigure,
    });

    checkForKingsCheck({
      board,
      availableMoves: lastMovedFigureAvailableMoves,
      figure: lastMovedFigure,
    });
  }, [lastMovedFigure]);

  return (
    <>
      {board.map((row, rowIndex: number) => (
        <StyledRowBox key={uuid()}>
          <BoardRow boardRow={row} rowIndex={rowIndex} />
        </StyledRowBox>
      ))}
    </>
  );
};
