import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function ButtonPlus({onPress}){
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Ionicons name="ios-add" size={36} color="white"/>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 64,
        height: 64,
        backgroundColor: '#2a86ff',
        position: 'absolute',
        right: 25,
        bottom: 25,
        shadowColor: '#2a86ff',
        elevation: 4,
        shadowOpacity: 0.4,
        shadowRadius: 3.5
    }
});
