
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProps, SimonState } from '../App';
import Sound from 'react-native-sound';

const colors = ['blue', 'green', 'yellow', 'red'];
const sound: Sound = new Sound('click_sound.mp3', Sound.MAIN_BUNDLE)

const GameBoard = ({ navigation }: NavigationProps) => {
    const userColors = useSelector<SimonState>(state => state.userColors) as Array<string>;
    const simonsColors = useSelector<SimonState>(state => state.simonsColors) as Array<string>;
    const score = useSelector<SimonState>(state => state.score) as number;
    const dispatch = useDispatch();
    // const [buttonChosen, setButtonChosen] = useState('')


    const simonPlay = (simonColors: Array<string>) => {
        let newSimonsColors: Array<string> = [...simonColors]
        let chosenColor = colors[Math.floor(Math.random() * colors.length)];
        newSimonsColors.push(chosenColor);
        dispatch({ type: 'SET_SIMON_COLORS', simonsColors: newSimonsColors });
        // playButtons(newSimonsColors);
    };

    // const playButtons = (simonsColors: Array<string>) => {
    //     simonsColors.forEach(color => {
    //         sound.play();
    //         setButtonChosen(color);
    //     })
    // }

    const userPlay = (chosenColor: string) => {
        sound.play();
        let newUserColors: Array<string> = [...userColors]
        newUserColors.push(chosenColor);
        if (newUserColors.length === simonsColors.length) {
            checkUserSelection(newUserColors);
        } else {
            dispatch({ type: 'SET_USER_COLORS', userColors: newUserColors });
        };
    };

    const checkUserSelection = (userColors: Array<string>) => {
        const hasUserSucceeded = userColors.every((color, index) => color === simonsColors[index])
        if (hasUserSucceeded) {
            dispatch({ type: 'SET_SCORE' })
            dispatch({ type: 'SET_USER_COLORS', userColors: [] });
            simonPlay(simonsColors);
        } else {
            navigation.navigate('Results')
            dispatch({ type: 'SET_MODAL_IS_VISIBLE', modalIsVisible: true })
        }
    };
    console.log(userColors, 'user');
    console.log(simonsColors, 'simon');

    return (
        <View style={styles.container}>
            <View style={styles.boradContainer}>

                <View>
                    <TouchableOpacity disabled={simonsColors.length == 0} onPress={() => { userPlay('blue') }}
                        style={[styles.touchableOpacityStyle, { backgroundColor: 'blue', borderTopLeftRadius: 100 }]} />
                    <TouchableOpacity disabled={simonsColors.length == 0} onPress={() => { userPlay('green') }}
                        style={[styles.touchableOpacityStyle, { backgroundColor: 'green', borderBottomLeftRadius: 100 }]} />
                </View>

                <View>
                    <TouchableOpacity disabled={simonsColors.length == 0} onPress={() => { userPlay('yellow') }}
                        style={[styles.touchableOpacityStyle, { backgroundColor: 'yellow', borderTopRightRadius: 100 }]} />
                    <TouchableOpacity disabled={simonsColors.length == 0} onPress={() => { userPlay('red') }}
                        style={[styles.touchableOpacityStyle, { backgroundColor: 'red', borderBottomRightRadius: 100 }]} />
                </View>

                <TouchableOpacity style={styles.centerBottom} onPress={() => simonPlay([])} >
                    <Text style={{ fontSize: 20 }}>Start</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ flex: 1, alignSelf: 'center', fontSize: 20 }}>Current Scrore: {score}</Text>
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
        position: 'relative',
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
        borderWidth: 10,
        borderColor: 'black',
        height: 80,
        width: 80
    }
});

export default GameBoard;
