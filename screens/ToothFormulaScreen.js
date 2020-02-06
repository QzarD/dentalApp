import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";

const ToothFormulaScreen=({navigation})=> {
    const appointments=navigation.getParam('appointments');
    return (
        <View style={styles.container}>
            <Image source={require('../assets/dentistry.png')} alt='Tooth formula'
            style={styles.image}/>
            <Text style={[{top:255, left:20}, styles.numbers]}>18</Text>
            <Text style={[{top:235, left:20}, styles.numbers]}>18</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image:{
        width:'100%',
        marginTop:50,
        position: 'relative'
    },
    numbers:{
        position: 'absolute',
        fontSize:19
    }
});

ToothFormulaScreen.navigationOptions = () => ({
    title: 'Tooth Formula',
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
});

export default ToothFormulaScreen