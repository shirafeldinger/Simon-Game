import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import GameBoard from './components/GameBoard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ResultsScreen from './components/ResultsScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { PersistGate } from 'redux-persist/integration/react'

export type SimonState = {
  simonsColors: Array<string>;
  score: number;
  userColors: Array<string>;
  modalIsVisible: boolean;
  results: Array<Result>
}

export type Result = {
  userName: string;
  score: number;
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
} | {
  type: 'SET_MODAL_IS_VISIBLE';
  modalIsVisible: boolean;
} | {
  type: 'SET_RESULTS';
  results: Array<Result>
}

export const AppWrapper = () => {
  const initialState = {
    simonsColors: [],
    score: 0,
    userColors: [],
    modalIsVisible: false,
    results: []
  }

  const reducer = (state: SimonState = initialState, action: SimonActions): SimonState => {
    switch (action.type) {
      case 'SET_SIMON_COLORS':
        return { ...state, simonsColors: action.simonsColors, }
      case 'SET_USER_COLORS':
        return { ...state, userColors: action.userColors }
      case 'RESET':
        return initialState;
      case 'SET_SCORE':
        return { ...state, score: state.score + 1 }
      case 'SET_MODAL_IS_VISIBLE':
        return { ...state, modalIsVisible: action.modalIsVisible }
      case 'SET_RESULTS':
        return { ...state, results: action.results }
      default:
        return state;
    };
  };

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['results'], //  only results will be persisted
  };

  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer);
  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>)
};

type RootStackParamList = {
  GameBoard: undefined;
  Results: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameBoard'>;

export type NavigationProps = {
  navigation: ProfileScreenNavigationProp;
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="GameBoard">
        <RootStack.Screen name="GameBoard" component={GameBoard} options={{ title: "Game board", headerTitleAlign: 'center' }} />
        <RootStack.Screen name="Results" component={ResultsScreen} options={{ title: "Game Results", headerTitleAlign: 'center' }} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
};

export default App;
