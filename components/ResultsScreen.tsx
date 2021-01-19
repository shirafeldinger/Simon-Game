
import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button, Modal, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProps, Result, SimonState } from '../App';

const ResultsScreen = ({ navigation }: NavigationProps) => {
    const modalIsVisible = useSelector<SimonState>(state => state.modalIsVisible) as boolean;
    const score = useSelector<SimonState>(state => state.score) as number;
    // const results = useSelector<SimonState>(state => state.simonsColors) as Array<Result>;
    const [userName, setUserName] = useState('');
    const [results, setResults] = useState([{ userName: 'lemon', score: 200 }, { userName: 'shira', score: 300 }])
    const dispatch = useDispatch();

    const manageResults = (userName: string) => {
        let newResults: Array<Result> = [...results]
        newResults.push({ userName, score })
        setResults([...newResults])
        dispatch({ type: 'RESET' });
        // dispatch({ type: 'SET_RESULTS', results: [...newResults] });
    };


    const renderResults: (result: { item: Result, index: number }) => ReactElement<JSX.Element> = ({ item, index }) => {
        return (
            <View key={index} style={styles.resultStyle}>
                <Text style={styles.resultText}>{item.userName}</Text>
                <Text style={styles.resultText}>{item.score}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, padding: '5%', flex: 1 }}> Results</Text>
            <View style={{ width: '50%', flex: 5 }} >
                <View style={styles.resultStyle}>
                    <Text style={styles.resultHeardLine}>Name</Text>
                    <Text style={styles.resultHeardLine}>Score</Text>
                </View>
                <FlatList data={results} renderItem={renderResults} keyExtractor={(result: Result) => result.userName ?? ''} />
            </View>
            <View style={{ flex: 2 }}>
                <Button title='Start New Game' onPress={() => navigation.navigate('GameBoard')} />
            </View>
            <Modal animationType="slide" transparent={true} visible={modalIsVisible}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>You Lost! 😢</Text>
                        <TextInput style={styles.inputStyle}
                            placeholder={'Please enter your name'}
                            onChangeText={userName => setUserName(userName)}
                            value={userName} />
                        <Button title='move to Results'
                            onPress={() => {
                                manageResults(userName);
                                dispatch({ type: 'SET_MODAL_IS_VISIBLE', modalIsVisible: false })
                            }}>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    resultStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: '5%'
    },
    resultHeardLine: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    resultText: {
        fontSize: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        fontSize: 20,
    },
    inputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: '3%'
    }

});

export default ResultsScreen;
