
import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button, Modal, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SimonState } from '../App';

const ResultsScreen = () => {
    const modalIsVisible = useSelector<SimonState>(state => state.modalIsVisible) as boolean;
    const score = useSelector<SimonState>(state => state.score) as number;
    const [userName, setUserName] = useState('');
    const [results, setResults] = useState([{ userName: 'shira', score: 20 }])
    const dispatch = useDispatch();

    type Result = {
        userName: string;
        score: number;
    }
    const fetchResults = (userName: string) => {
        let newResults = [...results]
        newResults.push({ userName, score })
        setResults([...newResults])
    };

    const renderResults: (result: { item: Result, index: number }) => ReactElement<JSX.Element> = ({ item, index }) => {
        return (
            <View key={index} style={styles.resultStyle}>
                <Text>{item.userName}</Text>
                <Text>{item.score}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text> Results</Text>
            <View style={{ width: '50%' }}>
                <FlatList data={results} renderItem={renderResults} keyExtractor={(result: Result) => result.userName ?? ''} />
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
                                fetchResults(userName);
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
        justifyContent: 'center'
    },
    resultStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        marginVertical: '5%',
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
