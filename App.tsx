import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import GameBoard from './components/gameBoard';

export type SimonState = {
  simonsColors: Array<string>;
  score: number;
  userColors: Array<string>;
}

type SimonActions = {
  type: 'RESET';
} | {
  type: 'SET_SIMON_COLORS';
  simonsColors: Array<string>;
} | {
  type: 'SET_SCORE';
  score: number
} | {
  type: 'SET_USER_COLORS';
  userColors: Array<string>;
}

export const AppWrapper = () => {
  const initialState = {
    simonsColors: [],
    score: 0,
    userColors: [],
  }

  const reducer = (state: SimonState = initialState, action: SimonActions): SimonState => {
    switch (action.type) {
      case 'SET_SIMON_COLORS':
        return {
          ...state,
          simonsColors: action.simonsColors,
        }
      case 'SET_USER_COLORS':
        return {
          ...state,
          userColors: action.userColors,
        }
      case 'RESET':
        return initialState;
      case 'SET_SCORE':
        return { ...state, score: state.score + 1 }
      default:
        return state;
    }
  }

  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <App />
    </Provider>)
}

const App = () => {
  return (
    <GameBoard />
  )
};

export default App;
