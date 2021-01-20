
import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button, Modal, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes, NavigationProps, Result, SimonState } from '../types';

const ResultsScreen = ({ navigation }: NavigationProps) => {
    const modalIsVisible = useSelector<SimonState>(state => state.modalIsVisible) as boolean;
    const score = useSelector<SimonState>(state => state.score) as number;
    const results = useSelector<SimonState>(state => state.results) as Array<Result>;
    const [userName, setUserName] = useState('');
    const [validName, setValidName] = useState('');
    const dispatch = useDispatch();

    const manageResults = (userName: string) => {
        if (userName.length === 0) {
            return setValidName('you must enter a name')
        };
        let newResults: Array<Result> = [...results]
        // check if user name already in use
        const checkUserName = newResults.some(result => result.userName === userName)
        if (checkUserName) {
            return setValidName('name already in use')
        };
        // check if result is in the top 10 . if the results length is 10 or higher
        // or if the score is lowest than any score do not add result to the array of results
        const checkScore = results.some(result => score < result.score);
        if (checkScore && results.length >= 10) {
            dispatch({ type: ActionTypes.SetModalIsVisible, modalIsVisible: false })
            alert('you are not in the top 10');
            return;
        };
        newResults.push({ userName, score })
        const sortResults = newResults.sort((a, b) => (a.score < b.score) ? 1 : -1); // sort results array to show the hightest score first
        dispatch({ type: ActionTypes.Reset });
        dispatch({ type: ActionTypes.SetResults, results: sortResults });
        dispatch({ type: ActionTypes.SetModalIsVisible, modalIsVisible: false })
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

            <Text style={styles.pageHeadline}> Results</Text>
            <View style={{ width: '50%', flex: 6 }} >
                <View style={styles.resultStyle}>
                    <Text style={styles.resultHeardLine}>Name</Text>
                    <Text style={styles.resultHeardLine}>Score</Text>
                </View>
                {/* if there is not space to show all the user can scrol */}
                <ScrollView>
                    <FlatList data={results} renderItem={renderResults} keyExtractor={(result: Result) => result.userName ?? ''} />
                </ScrollView>
            </View>

            <View style={{ flex: 1 }}>
                <Button title='Start New Game' onPress={() => navigation.navigate('GameBoard')} />
            </View>

            <Modal animationType="slide" transparent={true} visible={modalIsVisible}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>You Lost! 😢</Text>
                        <TextInput style={styles.inputStyle}
                            placeholder={'Please enter your name'}
                            placeholderTextColor={'grey'}
                            onChangeText={userName => setUserName(userName)}
                            value={userName} />
                        <Button title='move to Results'
                            onPress={() => { manageResults(userName) }}>
                        </Button>
                        <Text style={{ color: 'red' }}>{validName}</Text>
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
    pageHeadline: {
        fontSize: 40,
        padding: '5%',
        flex: 1,
        color: '#6495ED',
        fontWeight: 'bold'
    },
    resultStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: '4%',
    },
    resultHeardLine: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    resultText: {
        fontSize: 20,
        flex: 1,
        textAlign: 'center'
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
        height: 45,
        borderColor: 'black',
        borderWidth: 1,
        margin: '3%'
    }

});

export default ResultsScreen;
