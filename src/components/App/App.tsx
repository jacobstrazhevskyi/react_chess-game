import React, { useEffect, useRef, useState } from 'react';

import '../../reset.css';

import { Box, Container, styled } from '@mui/material';
import { Board } from '../Board';
import { useBoard } from '../../utils/hooks/gameHooks/useBoard';
import { useFigures } from '../../utils/hooks/gameHooks/useFigures';

type StyledBoardBoxCustomProps = {
  cellsSize: number,
};

export const getCalculatedBoardCellSize = (size: number) => {
  const cellSize = Math.min(window.innerWidth / size, window.innerHeight / size);
  const maxCellSize = 500 / size;

  if (cellSize > maxCellSize) {
    return maxCellSize;
  }

  return cellSize;
};

const StyledContainer = styled(Container)({
  overlow: 'hidden',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledBoardBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'cellsSize',
})<StyledBoardBoxCustomProps>(({ cellsSize }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${8}, ${cellsSize - 2}px)`,
  gridTemplateRows: `repeat(${8}, ${cellsSize - 2}px)`,
  border: '2px solid black',
  margin: '10px',
}));

const App: React.FC = () => {
  const [finalCelllSize, setFinalCellSize] = useState<number>(() => getCalculatedBoardCellSize(8));
  let prevWindowSize: number;

  const isFirstRender = useRef(true);

  const [whiteFigures, setWhiteFigures, blackFigures, setBlackFigures] = useFigures();
  const [board,, updateFigures] = useBoard();

  const handleResize = () => {
    const currentWindowSize = window.innerHeight + window.innerWidth;

    if (prevWindowSize === currentWindowSize) {
      return;
    }

    setFinalCellSize(getCalculatedBoardCellSize(8));

    prevWindowSize = window.innerHeight + window.innerWidth;
  };

  useEffect(() => {
    if (isFirstRender) {
      updateFigures({
        whiteFigures,
        blackFigures,
      });

      isFirstRender.current = false;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [board]);

  return (
    <StyledContainer>
      <StyledBoardBox
        cellsSize={finalCelllSize}
      >
        <Board />
      </StyledBoardBox>
    </StyledContainer>
  );
};

export default App;
