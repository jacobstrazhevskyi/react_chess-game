import React, { useEffect } from 'react';

import { Box, styled } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Cell } from '../../types/Cell';
import { useFigures } from '../../utils/hooks/gameHooks/useFigures';
import { useGameStatus } from '../../utils/hooks/gameHooks/useGameStatus';
import { Figure } from '../../types/Figure';

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

  const [playerTurn, togglePlayerTurn, , , , , setLastMovedFigure] = useGameStatus();

  const handleMove = (selectedCell: Cell) => {
    const moveTo = selectedCell.position;

    moveFigure({
      moveTo,
      figure: selectedFigure,
      currentWhiteFigures: whiteFigures,
      currentBlackFigures: blackFigures,
    });

    const movedFigure: Figure = {
      ...selectedFigure,
      position: moveTo,
    };

    setLastMovedFigure(movedFigure);

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
