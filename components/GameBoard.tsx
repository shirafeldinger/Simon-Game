
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
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
    const [btnsOpacity, setBtnsOpacity] = useState({ blue: 1, green: 1, yellow: 1, red: 1 });
    const [simonTurn, setSimonTurn] = useState(true)


    const simonPlay = async (simonColors: Array<string>) => {
        setSimonTurn(true) // disabled buttons when simon is playing
        let newSimonsColors: Array<string> = [...simonColors]
        let chosenColor = colors[Math.floor(Math.random() * colors.length)];
        newSimonsColors.push(chosenColor);
        dispatch({ type: 'SET_SIMON_COLORS', simonsColors: newSimonsColors });
        await showSimonMoves(newSimonsColors); // active showSimonMoves function to show user simon's choices
        setSimonTurn(false) // enabled buttons for user turn
    };

    const wait = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    const showSimonMoves = async (simonsColors: Array<string>) => {

        await wait(300)
        // loop through simon chosen colors and for chosen button set background with opacity 
        // and don't change opacity for  others colors in the array
        for (let color of simonsColors) {
            let clonedOpacities = {
                ...btnsOpacity,
                [color]: 0.5
            };

            setBtnsOpacity(clonedOpacities)

            sound.play();

            await wait(50)

            clonedOpacities = {  // disabled opacity
                ...btnsOpacity,
                [color]: 1
            };

            setBtnsOpacity(clonedOpacities)
        }
    }

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
        // check if user chosen colors are the same as simon colors
        const hasUserSucceeded = userColors.every((color, index) => color === simonsColors[index])
        // if true added 1 score and clean users old choices
        if (hasUserSucceeded) {
            dispatch({ type: 'SET_SCORE' })
            dispatch({ type: 'SET_USER_COLORS', userColors: [] });
            simonPlay(simonsColors);

            // if user failed navgiate to results component and show modal
        } else {
            navigation.navigate('Results')
            dispatch({ type: 'SET_MODAL_IS_VISIBLE', modalIsVisible: true })
        }
    };
    console.log(userColors, 'user');
    console.log(simonsColors, 'simon');

    const lockButton = () => {
        return simonsColors.length == 0 || simonTurn
    }
    return (
        <View style={styles.container}>
            <View style={styles.boradContainer}>

                <View >
                    {/* opacity only works in parent view */}
                    <View style={{ opacity: btnsOpacity.blue }}>
                        <TouchableOpacity disabled={lockButton()} onPress={() => { userPlay('blue') }}
                            style={[styles.touchableOpacityStyle, { backgroundColor: 'blue', borderTopLeftRadius: 100 }]} />
                    </View>
                    <View style={{ opacity: btnsOpacity.green }}>
                        <TouchableOpacity disabled={lockButton()} onPress={() => { userPlay('green') }}
                            style={[styles.touchableOpacityStyle, { backgroundColor: 'green', borderBottomLeftRadius: 100 }]} />
                    </View>
                </View>

                <View>
                    <View style={{ opacity: btnsOpacity.yellow }}>
                        <TouchableOpacity disabled={lockButton()} onPress={() => { userPlay('yellow') }}
                            style={[styles.touchableOpacityStyle, { backgroundColor: 'yellow', borderTopRightRadius: 100 }]} />
                    </View>
                    <View style={{ opacity: btnsOpacity.red }}>
                        <TouchableOpacity disabled={lockButton()} onPress={() => { userPlay('red') }}
                            style={[styles.touchableOpacityStyle, { backgroundColor: 'red', borderBottomRightRadius: 100 }]} />
                    </View>
                </View>

                {/* when user click on start button simons chosen color's array should be empaty,
                     even if it is in the middle of game */}
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
        borderWidth: 10,
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
