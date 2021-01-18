
import React from 'react';
import { StyleSheet, View, Text, FlatList, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SimonState } from '../App';

const ResultsScreen = () => {
    const score = useSelector<SimonState>(state => state.score) as number;
    const dispatch = useDispatch();

    return (
        <View>
            <Text> Results</Text>
            <View >
                <FlatList data={[]} renderItem={({ item }) => <Text ></Text>} />
            </View>
        </View>
    )
};


const styles = StyleSheet.create({

});

export default ResultsScreen;
