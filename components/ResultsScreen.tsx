
import React from 'react';
import { StyleSheet, View, Text, FlatList, Button, Modal, TextInput, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SimonState } from '../App';

const ResultsScreen = () => {
    const modalIsVisible = useSelector<SimonState>(state => state.modalIsVisible) as boolean;
    const score = useSelector<SimonState>(state => state.score) as number;
    const dispatch = useDispatch();

    return (
        <View>
            <Text> Results</Text>
            <View >
                <FlatList data={[]} renderItem={({ item }) => <Text ></Text>} />
            </View>


            <Modal animationType="slide" transparent={true} visible={modalIsVisible}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>You Lost!😢</Text>
                        <Text>Please Enter your name: </Text>
                        <TextInput />
                        <Button title='move to Results' onPress={() => { dispatch({ type: 'SET_MODAL_IS_VISIBLE', modalIsVisible: false }) }}></Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
};


const styles = StyleSheet.create({
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
        margin: '3%'
    }

});

export default ResultsScreen;
