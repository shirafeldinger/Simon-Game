
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProps, SimonState } from '../App';
import Sound from 'react-native-sound';
import { useEffect } from 'react';


const GameBoard = ({ navigation }: NavigationProps) => {
    const userColors = useSelector<SimonState>(state => state.userColors) as Array<string>;
    const simonsColors = useSelector<SimonState>(state => state.simonsColors) as Array<string>;
    const score = useSelector<SimonState>(state => state.score) as number;
    const dispatch = useDispatch();
    const colors = ['red', 'blue', 'green', 'yellow'];
    let playSound: Sound;

    useEffect(() => {
        playSound = new Sound('click_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + playSound.getDuration() + 'number of channels: ' + playSound.getNumberOfChannels());

        })
        return () => {
            playSound.release
        }
    })

    const manageSimonchoice = () => {
        let newSimonsColors: string[] = [...simonsColors]
        let chosenColor = colors[Math.floor(Math.random() * colors.length)];
        newSimonsColors.push(chosenColor);
        dispatch({ type: 'SET_SIMON_COLORS', simonsColors: [...newSimonsColors] });
    }
    const manageUserChoice = (chosenColor: string) => {
        let newUserColors: string[] = [...userColors]
        newUserColors.push(chosenColor)
        dispatch({ type: 'SET_USER_COLORS', userColors: [...newUserColors] });
    };

    const checkUserSelection = () => {
        const isMoveEqual = userColors.every((color, index) => color == simonsColors[index])
        if (isMoveEqual) {
            dispatch({ type: 'SET_SCORE' })
            dispatch({ type: 'SET_USER_COLORS', userColors: [] });
            manageSimonchoice();
        } else {
            navigation.navigate('Results')
            dispatch({ type: 'SET_MODAL_IS_VISIBLE', modalIsVisible: true })
        }
    };
    console.log(userColors, 'user');
    console.log(simonsColors, 'simon');

    const checkTurn = () => {
        if (userColors.length >= simonsColors.length && simonsColors.length != 0) {
            checkUserSelection();
        }
    };
    checkTurn();

    const onStartClick = () => {
        playSound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });


    }

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
            <Text style={{ flex: 1, alignSelf: 'center', fontSize: 20 }}>Current Scrore: {score}</Text>
            <Button title='Results' onPress={() => navigation.navigate('Results')} />
            <TouchableOpacity onPress={onStartClick}>
                <View>
                    <Text>Start</Text>
                </View>
            </TouchableOpacity>
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
