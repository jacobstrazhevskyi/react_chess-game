import React from 'react';

import { Box, styled } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Cell } from '../../types/Cell';
import { useFigures } from '../../utils/hooks/gameHooks/useFigures';
import { useGameStatus } from '../../utils/hooks/gameHooks/useGameStatus';

const StyledCaptureIndicator = styled(Box)({
  position: 'absolute',
  left: '0',
  top: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
});

type Position = {
  x: number,
  y: number,
};

type Props = {
  cell: Cell,
  setAvailableMoves: (value: Position[]) => void,
};

export const CaptureIndicator: React.FC<Props> = ({
  cell,
  setAvailableMoves,
}) => {
  const [whiteFigures, , blackFigures, , selectedFigure, selectFigure, moveFigure] = useFigures();
  const [playerTurn, togglePlayerTurn] = useGameStatus();

  const handleMove = (selectedCell: Cell) => {
    moveFigure({
      moveTo: selectedCell.position,
      figure: selectedFigure,
      currentWhiteFigures: whiteFigures,
      currentBlackFigures: blackFigures,
    });
    selectFigure({
      x: -1,
      y: -1,
    });
    togglePlayerTurn(playerTurn);
    setAvailableMoves([]);
  };

  return (
    <StyledCaptureIndicator
      onClick={() => handleMove(cell)}
    >
      <FontAwesomeIcon
        icon={faCircle}
        size="1x"
        style={{
          color: '#000000',
          opacity: '0.3',
        }}
      />
    </StyledCaptureIndicator>
  );
};
