/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Figure } from '../types/Figure';
import { Board } from '../types/Board';

type InitialState = {
  board: Board,
};

const initialState: InitialState = {
  board: new Array(8)
    .fill(0).map(_row => new Array(8).fill(0)),
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    createBoard: (state) => {
      state.board = new Array(8)
        .fill(0).map(_row => new Array(8).fill(0));
    },
    setFigures: (state, action: PayloadAction<Figure[]>) => {
      const newBoard = [...state.board];

      const figures = action.payload;

      for (let i = 0; i < figures.length; i++) {
        const { x, y } = figures[i].position;

        newBoard[y][x] = figures[i];
      }

      state.board = newBoard;
    },    
  },
});

export const { createBoard, setFigures } = gameSlice.actions;
export default gameSlice.reducer;
