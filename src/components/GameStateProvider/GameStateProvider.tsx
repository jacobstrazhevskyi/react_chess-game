import React from 'react';
import { useBoard } from '../../utils/hooks/gameHooks/useBoard';
import { useFigures } from '../../utils/hooks/gameHooks/useFigures';

import { BoardContext } from '../../utils/hooks/useBoardContext';
import { FiguresContext } from '../../utils/hooks/useFiguresContext';

type Props = {
  children: React.ReactNode,
};

export const GameStateProvider: React.FC<Props> = ({ children }) => {
  const boardData = useBoard();
  const figuresData = useFigures();

  return (
    <FiguresContext.Provider value={figuresData}>
      <BoardContext.Provider value={boardData}>
        {children}
      </BoardContext.Provider>
    </FiguresContext.Provider>
  );
};
