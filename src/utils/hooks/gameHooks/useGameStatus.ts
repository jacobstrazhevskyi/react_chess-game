/* eslint-disable no-unused-vars */
import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { GameStatusContext } from '../useGameStatusContext';
import { Figure } from '../../../types/Figure';
import { Board } from '../../../types/Board';
import { Position } from '../../../types/Position';

type Color = 'white' | 'black';

type CheckForKingsCheckProps = {
  board: Board,
  figure: Figure,
  availableMoves: Position[],
};

type ReturnedFromUseGameStatus = [
  playerTurn: Color,
  togglePlayerTurn: (currentPlayer: Color) => void,
  beatenBlackFigures: Figure[],
  beatenWhiteFigures: Figure[],
  addBeatenFigureToCount: (figure: Figure) => void,
  movedFigurePrevState: Figure,
  setMovedFigurePrevState: (figure: Figure) => void,
  checkForWhiteKing: boolean,
  checkForBlackKing: boolean,
  checkForKingsCheck: ({
    figure,
    availableMoves,
    board,
  }: CheckForKingsCheckProps) => void,
];

export const useGameStatus = (): ReturnedFromUseGameStatus => {
  const context = useContext(GameStatusContext);

  if (context) {
    return context;
  }

  const [playerTurn, setplayerTurn] = useState('white');

  const [beatenBlackFigures, setBeatenBlackFigures] = useState<Figure[]>([]);
  const [beatenWhiteFigures, setBeatenWhiteFigures] = useState<Figure[]>([]);

  const movedFigurePrevState = useRef<Figure>();

  const [checkOnWhiteKing, setCheckOnWhiteKing] = useState(false);
  const [checkOnBlackKing, setCheckOnBlackKing] = useState(false);

  const setMovedFigurePrevState = useCallback((figure: Figure) => {
    movedFigurePrevState.current = figure;
  }, []);
  
  const togglePlayerTurn = useCallback((currentPlayer: Color) => {
    let newPlayer = currentPlayer;

    if (currentPlayer === 'white') {
      newPlayer = 'black';
    } else {
      newPlayer = 'white';
    }

    setplayerTurn(newPlayer);
  }, []);

  const addBeatenFigureToCount = useCallback((figure: Figure) => {
    const figureColor = figure.color;

    let newBeatenFigures;

    if (figureColor === 'black') {
      newBeatenFigures = beatenBlackFigures;
      newBeatenFigures.push(figure);

      setBeatenBlackFigures(newBeatenFigures);
    } else {
      newBeatenFigures = beatenWhiteFigures;
      newBeatenFigures.push(figure);

      setBeatenWhiteFigures(newBeatenFigures);
    }
  }, []);

  const toggleCheckOnKing = useCallback((kingColor: Color) => {
    if (kingColor === 'white') {
      setCheckOnWhiteKing(prev => !prev);
    } else {
      setCheckOnBlackKing(prev => !prev);
    }
  }, []);

  const checkForKingsCheck = useCallback(({
    figure,
    availableMoves,
    board,
  }: CheckForKingsCheckProps) => {
    availableMoves.forEach((move) => {
      const { x, y } = move;

      if (!board[y][x].figure) {
        return;
      }

      if (
        board[y][x].figure.figureType === 'king'
        && board[y][x].figure.color !== figure.color
      ) {
        const kingColor = board[y][x].figure.color;

        toggleCheckOnKing(kingColor as Color);
      }
    });
  }, []);

  const value = useMemo(() => [
    playerTurn,
    togglePlayerTurn,
    beatenBlackFigures,
    beatenWhiteFigures,
    addBeatenFigureToCount,
    movedFigurePrevState.current,
    setMovedFigurePrevState,
    checkOnWhiteKing,
    checkOnBlackKing,
    checkForKingsCheck,
  ], [
    playerTurn,
    beatenBlackFigures,
    beatenWhiteFigures,
    movedFigurePrevState,
    checkOnWhiteKing,
    checkOnBlackKing,
  ]) as ReturnedFromUseGameStatus;

  return value;
};
