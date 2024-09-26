import { useContext, useMemo, useState } from 'react';
import { GameStatusContext } from '../useGameStatusContext';

type Color = 'white' | 'black';

type ReturnedFromUseGameStatus = [
  playerTurn: Color,
  togglePlayerTurn: (currentPlayer: Color) => void,
];

export const useGameStatus = (): ReturnedFromUseGameStatus => {
  const context = useContext(GameStatusContext);

  if (context) {
    return context;
  }

  const [playerTurn, setplayerTurn] = useState('white');

  const togglePlayerTurn = (currentPlayer: Color) => {
    let newPlayer = currentPlayer;

    if (currentPlayer === 'white') {
      newPlayer = 'black';
    } else {
      newPlayer = 'white';
    }

    setplayerTurn(newPlayer);
  };

  const value = useMemo(() => [
    playerTurn,
    togglePlayerTurn,
  ], [playerTurn]) as ReturnedFromUseGameStatus;

  return value;
};
