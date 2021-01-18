
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SimonState } from '../App';




const GameBoard = () => {
    const userColors = useSelector<SimonState>(state => state.userColors) as Array<string>;
    const simonsColors = useSelector<SimonState>(state => state.simonsColors) as Array<string>;
    const score = useSelector<SimonState>(state => state.score) as number;
    const dispatch = useDispatch();
    const colors = ['red', 'blue', 'green', 'yellow'];

    const manageSimonchoice = () => {
        let newSimonsColors: string[] = [...simonsColors]
        let chosenColor = colors[Math.floor(Math.random() * 3)];
        newSimonsColors.push(chosenColor);
        dispatch({ type: 'SET_SIMON_COLORS', simonsColors: [...newSimonsColors] });
    }
    const manageUserChoice = (chosenColor: string) => {
        let newUserColors: string[] = [...userColors]
        newUserColors.push(chosenColor)
        dispatch({ type: 'SET_USER_COLORS', userColors: [...newUserColors] });
    };

    const checkUserSelection = () => {
        if (JSON.stringify(userColors) == JSON.stringify(simonsColors)) {
            dispatch({ type: 'SET_SCORE' })
            dispatch({ type: 'SET_USER_COLORS', userColors: [] });
            manageSimonchoice();
        } else {
            alert('You lose');
            dispatch({ type: 'RESET' });
        }
    };
    console.log(userColors, 'user');
    console.log(simonsColors, 'simon');

    const checkTurn = () => {
        if (userColors.length == simonsColors.length && simonsColors.length != 0) {
            checkUserSelection();
        }
    };
    checkTurn();
    /// listen on state.simonColors using useEffect. on every state change fire a function that goes over 
    // the array of colors one by one whith timeout between one another and triggers an animation state for a matching color element.
    const isActive = true;

    return (
        <View style={styles.container}>
            <View style={styles.boradContainer}>
                <View>
                    <TouchableOpacity style={[styles.touchableOpacityStyle, { backgroundColor: 'blue', borderTopLeftRadius: 100 }]} onPress={() => { manageUserChoice('blue') }} />
                    <TouchableOpacity style={[styles.touchableOpacityStyle, { backgroundColor: 'green', borderBottomLeftRadius: 100 }]} onPress={() => { manageUserChoice('green') }} />
                </View>
                <View>
                    <TouchableOpacity style={[styles.touchableOpacityStyle, { backgroundColor: 'yellow', opacity: isActive ? 1 : 0.5, borderTopRightRadius: 100 }]} onPress={() => { manageUserChoice('yellow') }} />
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

export default GameBoard;
