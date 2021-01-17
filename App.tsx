import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Button, } from 'react-native';


const App = () => {
  const [userColors, setUserColors] = useState([] as string[]);
  const [simonsColors, setSimonColors] = useState([] as string[]);
  const [score, setScore] = useState(0);

  const manageSimonchoice = () => {
    const colors = ['red', 'blue', 'green', 'orange'];
    let newSimonsColors: string[] = [...simonsColors]
    let chosenColor = colors[Math.floor(Math.random() * 3)];
    newSimonsColors.push(chosenColor);
    setSimonColors([...newSimonsColors])
  }
  const manageUserChoice = (chosenColor: string) => {
    let newUserColors: string[] = [...userColors]
    newUserColors.push(chosenColor)
    setUserColors([...newUserColors]);
  };

  const clearGame = () => {
    setUserColors([]); setSimonColors([]); setScore(0)
  }
  const checkUserSelection = () => {
    if (JSON.stringify(userColors) == JSON.stringify(simonsColors)) {
      setScore(score + 1);
      setUserColors([]);
      manageSimonchoice();
    } else {
      alert('You lose');
      return clearGame();
    }

  }
  console.log(userColors, 'user');
  console.log(simonsColors, 'simon');

  const checkTurn = () => {
    if (userColors.length == simonsColors.length && simonsColors.length != 0) {
      checkUserSelection();
    }
  };
  checkTurn();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Button color='blue' title='blue' onPress={() => { manageUserChoice('blue') }}></Button>
        <Button color='green' title='green' onPress={() => { manageUserChoice('green') }}></Button>
        <Button color='orange' title='orange' onPress={() => { manageUserChoice('orange') }}></Button>
        <Button color='red' title='red' onPress={() => { manageUserChoice('red') }}></Button>
      </View>
      <View style={{ flex: 1 }}>
        <Button title='clear' onPress={() => clearGame()}></Button>
        <Button title='start' onPress={() => manageSimonchoice()} />
      </View>
      <Text style={{ flex: 1, alignSelf: 'center' }}>Current Scrore:{score}</Text>
    </View>

  )
};


const styles = StyleSheet.create({});

export default App;
