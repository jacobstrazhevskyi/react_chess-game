/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
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
  faCircle,
} from '@fortawesome/free-solid-svg-icons';

import { Box, styled } from '@mui/material';
import { useBoard } from '../../utils/hooks/gameHooks/useBoard';
import { useFigures } from '../../utils/hooks/gameHooks/useFigures';

type Position = {
  x: number,
  y: number,
};

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
  position: 'relative',
}));

const isMovePosition = (moves: Position[], cellPosition: Position) => {
  const isPossibleMovePosition = moves.some(
    move => move.x === cellPosition.x && move.y === cellPosition.y,
  );

  return isPossibleMovePosition;
};

export const Board: React.FC = () => {
  const [board, , updateFigures, getFigureMoves] = useBoard();

  const [whiteFigures, , blackFigures, , selectedFigure, selectFigure, moveFigure] = useFigures();

  const [availableMoves, setAvailableMoves] = useState<Position[]>([]);

  useEffect(() => {
    setAvailableMoves(
      getFigureMoves({
        currentBoard: board,
        figure: selectedFigure,
      }),
    );
  }, [selectedFigure]);

  useEffect(() => {
    updateFigures({ whiteFigures, blackFigures });
  }, [whiteFigures, blackFigures]);

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
                hasFigure={Boolean(cell.figure)}
                onClick={() => {
                  if (!cell.figure) {
                    return;
                  }

                  const {
                    x,
                    y,
                  } = cell.position;

                  if (selectedFigure) {
                    selectFigure({ x: -1, y: -1 });
                    return;
                  }

                  selectFigure({ x, y });
                }}
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
                  ) : ''
                }
                {
                  isMovePosition(availableMoves, cell.position) ? (
                    <Box
                      onClick={() => {
                        moveFigure({
                          moveTo: cell.position,
                          figure: selectedFigure,
                          currentWhiteFigures: whiteFigures,
                          currentBlackFigures: blackFigures,
                        });
                        selectFigure({
                          x: -1,
                          y: -1,
                        });
                        setAvailableMoves([]);
                      }}
                      style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCircle}
                        size="1x"
                        style={{
                          color: '#000000',
                          opacity: '0.3',
                        }}
                      />
                    </Box>
                  ) : ''
                }
              </StyledCellBox>
            );
          })}
        </StyledRowBox>
      ))}
    </>
  );
};
