import React from 'react';
import uuid from 'react-uuid';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faChessRook,
  faChessKing,
  faChessBishop,
  faChessPawn,
  faChessQueen,
  faChessKnight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { Box, styled } from '@mui/material';
import { useAppSelector } from '../../utils/hooks/useAppSelector';

type FigureType = 'rook' | 'king' | 'bishop' | 'pawn' | 'queen' | 'knight';

type FiguresIcons = Record<FigureType, IconDefinition>;

const figuresIcons: FiguresIcons = {
  rook: faChessRook,
  king: faChessKing,
  bishop: faChessBishop,
  pawn: faChessPawn,
  queen: faChessQueen,
  knight: faChessKnight,
};

const StyledRowBox = styled(Box)({
  display: 'contents',
});

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
}));

export const Board: React.FC = () => {
  const board = useAppSelector(state => state.game.board);

  return (
    <>
      {board.map((row, rowIndex: number) => (
        <StyledRowBox key={uuid()}>
          {row.map((cell, cellIndex: number) => {
            const isDark = (rowIndex + cellIndex) % 2 === 1;

            return (
              <StyledCellBox
                key={uuid()}
                isDark={isDark}
                hasFigure={Boolean(cell)}
              >
                {
                  cell ? (
                    <FontAwesomeIcon
                      icon={figuresIcons[cell.figure]}
                      color={cell.hexColor}
                      style={{
                        stroke: 'black',
                        strokeWidth: 30,
                        strokeLinejoin: 'round',
                        fontSize: '40px',
                      }}
                    />
                  ) : (
                    ''
                  )
                }
              </StyledCellBox>
            );
          })}
        </StyledRowBox>
      ))}
    </>
  );
};
