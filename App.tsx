import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';


const App = () => {
  const [userColors, setUserColors] = useState([] as string[]);
  const [simonsColors, setSimonColors] = useState([] as string[]);
  const [score, setScore] = useState(0);

  const manageSimonchoice = () => {
    const colors = ['red', 'blue', 'green', 'yellow'];
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
    <View style={styles.container}>
      <View style={styles.boradContainer}>
        <View>
          <TouchableOpacity style={[styles.touchableOpacityStyle, { backgroundColor: 'blue', borderTopLeftRadius: 100 }]} onPress={() => { manageUserChoice('blue') }} />
          <TouchableOpacity style={[styles.touchableOpacityStyle, { backgroundColor: 'green', borderBottomLeftRadius: 100 }]} onPress={() => { manageUserChoice('green') }} />
        </View>
        <View>
          <TouchableOpacity style={[styles.touchableOpacityStyle, { backgroundColor: 'yellow', borderTopRightRadius: 100 }]} onPress={() => { manageUserChoice('yellow') }} />
          <TouchableOpacity style={[styles.touchableOpacityStyle, { backgroundColor: 'red', borderBottomRightRadius: 100 }]} onPress={() => { manageUserChoice('red') }} />
        </View>
        <TouchableOpacity style={styles.centerBottom} onPress={() => manageSimonchoice()} >
          <Text style={{ fontSize: 20 }}>Start</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ flex: 1, alignSelf: 'center', fontSize: 20 }}>Current Scrore:{score}</Text>
    </View>

  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boradContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: '5%',
    position: 'relative'
  },
  touchableOpacityStyle: {
    height: 105,
    width: 105,
    borderColor: 'black',
    borderWidth: 10
  },
  centerBottom: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 15,
    borderColor: 'black',
    height: 100,
    width: 100
  }
});

export default App;
