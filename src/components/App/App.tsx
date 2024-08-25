import React, { useEffect, useState } from 'react';

import { Box, Container, styled } from '@mui/material';
import '../../reset.css';
import { useAppSelector } from '../../utils/hooks/useAppSelector';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { createBoard, setFigures } from '../../redux/gameSlice';
import { Bishop } from '../../figuresClasses/Bishop';
import { King } from '../../figuresClasses/King';
import { Knight } from '../../figuresClasses/Knight';
import { Queen } from '../../figuresClasses/Queen';
import { Rook } from '../../figuresClasses/Rook';
import { Board } from '../Board';
import { Figure } from '../../types/Figure';
import { Pawn } from '../../figuresClasses/Pawn';

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

const getPawns = () => {
  const pawns = [];

  for (let i = 0; i <= 7; i++) {
    pawns.push(new Pawn(
      'black',
      { y: 1, x: i },
      { y: 1, x: i },
      '#575452',
    ));
  }

  for (let i = 0; i <= 7; i++) {
    pawns.push(new Pawn(
      'white',
      { y: 6, x: i },
      { y: 6, x: i },
      '#F9F9F9',
    ));
  }

  return pawns;
};

const App: React.FC = () => {
  const board = useAppSelector(state => state.game.board);
  const dispatch = useAppDispatch();

  const [finalCelllSize, setFinalCellSize] = useState<number>(() => getCalculatedBoardCellSize(8));
  let prevWindowSize: number;

  const [whiteFigures, setWhiteFigures] = useState([
    new Rook('white', { x: 0, y: 7 }, { x: 0, y: 7 }, '#F9F9F9'),
    new Rook('white', { x: 7, y: 7 }, { x: 7, y: 7 }, '#F9F9F9'),
    new Knight('white', { x: 1, y: 7 }, { x: 1, y: 7 }, '#F9F9F9'),
    new Knight('white', { x: 6, y: 7 }, { x: 6, y: 7 }, '#F9F9F9'),
    new Bishop('white', { x: 2, y: 7 }, { x: 2, y: 7 }, '#F9F9F9'),
    new Bishop('white', { x: 5, y: 7 }, { x: 5, y: 7 }, '#F9F9F9'),
    new Queen('white', { x: 3, y: 7 }, { x: 4, y: 7 }, '#F9F9F9'),
    new King('white', { x: 4, y: 7 }, { x: 4, y: 7 }, '#F9F9F9'),
  ]);

  const [blackFigures, setBlackFigures] = useState([
    new Rook('black', { x: 0, y: 0 }, { x: 0, y: 0 }, '#575452'),
    new Rook('black', { x: 7, y: 0 }, { x: 7, y: 0 }, '#575452'),
    new Knight('black', { x: 1, y: 0 }, { x: 1, y: 0 }, '#575452'),
    new Knight('black', { x: 6, y: 0 }, { x: 6, y: 0 }, '#575452'),
    new Bishop('black', { x: 2, y: 0 }, { x: 2, y: 0 }, '#575452'),
    new Bishop('black', { x: 5, y: 0 }, { x: 5, y: 0 }, '#575452'),
    new Queen('black', { x: 3, y: 0 }, { x: 4, y: 0 }, '#575452'),
    new King('black', { x: 4, y: 0 }, { x: 4, y: 0 }, '#575452'),
  ]);

  const getFiguresFromClasses = () => {
    const allFigures: Figure[] = [];

    for (let i = 0; i < blackFigures.length; i++) {
      allFigures.push({
        ...blackFigures[i] as Figure,
      });
    }

    for (let i = 0; i < whiteFigures.length; i++) {
      allFigures.push({
        ...whiteFigures[i] as Figure,
      });
    }

    const pawns = getPawns();

    allFigures.push(...pawns as Figure[]);

    return allFigures;
  };

  useEffect(() => {
    dispatch(createBoard());
    dispatch(setFigures(getFiguresFromClasses()));
  }, []);

  const handleResize = () => {
    const currentWindowSize = window.innerHeight + window.innerWidth;

    if (prevWindowSize === currentWindowSize) {
      return;
    }

    setFinalCellSize(getCalculatedBoardCellSize(8));

    prevWindowSize = window.innerHeight + window.innerWidth;
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [board]);

  console.log(board);

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
