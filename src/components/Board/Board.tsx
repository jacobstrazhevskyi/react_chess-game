/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import uuid from 'react-uuid';

import { Box, styled } from '@mui/material';
import { useBoard } from '../../utils/hooks/gameHooks/useBoard';
import { useFigures } from '../../utils/hooks/gameHooks/useFigures';
import { BoardRow } from '../BoardRow';

const StyledRowBox = styled(Box)({
  display: 'contents',
});

export const Board: React.FC = () => {
  const [board, , updateFigures] = useBoard();
  const [whiteFigures, , blackFigures] = useFigures();

  useEffect(() => {
    updateFigures({ whiteFigures, blackFigures });
  }, [whiteFigures, blackFigures]);

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
