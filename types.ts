
import { StackNavigationProp } from '@react-navigation/stack';

export enum ActionTypes {
    SetSimonColors = 'SET_SIMON_COLORS',
    SetUsersColors = 'SET_USER_COLORS',
    Reset = 'RESET',
    SetScore = 'SET_SCORE',
    SetModalIsVisible = 'SET_MODAL_IS_VISIBLE',
    SetResults = 'SET_RESULTS'
};

export type Result = {
    userName: string;
    score: number;
  };


  export type SimonState = {
    simonsColors: Array<string>;
    score: number;
    userColors: Array<string>;
    modalIsVisible: boolean;
    results: Array<Result>
  };


  export type SimonActions = {
    type: ActionTypes.Reset;
  } | {
    type: ActionTypes.SetSimonColors;
    simonsColors: Array<string>;
  } | {
    type: ActionTypes.SetScore;
    score: number
  } | {
    type: ActionTypes.SetUsersColors;
    userColors: Array<string>;
  } | {
    type: ActionTypes.SetModalIsVisible;
    modalIsVisible: boolean;
  } | {
    type: ActionTypes.SetResults;
    results: Array<Result>
  };

  
export type RootStackParamList = {
    GameBoard: undefined;
    Results: undefined;
  };

export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameBoard'>;

export type NavigationProps = {
  navigation: ProfileScreenNavigationProp;
};