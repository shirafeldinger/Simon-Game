import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import GameBoard from './components/GameBoard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ResultsScreen from './components/ResultsScreen';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { PersistGate } from 'redux-persist/integration/react'
import { ActionTypes, RootStackParamList, SimonActions, SimonState } from './types';


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
      case ActionTypes.SetSimonColors:
        return { ...state, simonsColors: action.simonsColors, }
      case ActionTypes.SetUsersColors:
        return { ...state, userColors: action.userColors }
      case ActionTypes.Reset:
        return { ...state, userColors: [], simonsColors: [], score: 0 }
      case ActionTypes.SetScore:
        return { ...state, score: state.score + 1 }
      case ActionTypes.SetModalIsVisible:
        return { ...state, modalIsVisible: action.modalIsVisible }
      case ActionTypes.SetResults:
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

const RootStack = createStackNavigator<RootStackParamList>();

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
