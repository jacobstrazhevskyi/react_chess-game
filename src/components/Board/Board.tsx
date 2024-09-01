import React from 'react';
import uuid from 'react-uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faChessRook,
  faChessKing,
  faChessBishop,
  faChessPawn,
  faChessQueen,
  faChessKnight,
  faSquareFull,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { Box, styled } from '@mui/material';
import { useBoard } from '../../utils/hooks/gameHooks/useBoard';

type FigureType = 'rook' | 'king' | 'bishop' | 'pawn' | 'queen' | 'knight';

type FiguresIcons = Record<FigureType | 0, IconDefinition>;

const figuresIcons: FiguresIcons = {
  0: faSquareFull,
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
  const [board] = useBoard();

  return (
    <>
      {board.map((row, rowIndex: number) => (
        <StyledRowBox key={uuid()}>
          {row.map((cell, cellIndex: number) => {
            const isDark = (rowIndex + cellIndex) % 2 === 1;

            console.log(cell);

            return (
              <StyledCellBox
                key={uuid()}
                isDark={isDark}
                hasFigure={Boolean(cell.figure)}
              >
                {
                  cell.figure ? (
                    <FontAwesomeIcon
                      icon={figuresIcons[cell.figure.figureType]}
                      color={cell.figure.hexColor}
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
