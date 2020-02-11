import React,{useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";

const ToothFormulaScreen=({navigation})=> {
    const appointments=navigation.getParam('appointments');
    const activeTooth=(tooth)=>{
        if (appointments.find(appointment=>appointment.dentNumber === tooth)){
            return {color: 'red'}
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/dentistry.png')} alt='Tooth formula'
            style={styles.image}/>
            <Text style={[{top:258, left:'4%'}, styles.numbers, activeTooth(18)]}>18</Text>
            <Text style={[{top:215, left:'5%'}, styles.numbers, activeTooth(17)]}>17</Text>
            <Text style={[{top:170, left:'8%'}, styles.numbers, activeTooth(16)]}>16</Text>
            <Text style={[{top:140, left:'12%'}, styles.numbers, activeTooth(15)]}>15</Text>
            <Text style={[{top:110, left:'17%'}, styles.numbers, activeTooth(14)]}>14</Text>
            <Text style={[{top:85, left:'23%'}, styles.numbers, activeTooth(13)]}>13</Text>
            <Text style={[{top:65, left:'31%'}, styles.numbers, activeTooth(12)]}>12</Text>
            <Text style={[{top:50, left:'41%'}, styles.numbers, activeTooth(11)]}>11</Text>

            <Text style={[{top:50, right:'41%'}, styles.numbers, activeTooth(21)]}>21</Text>
            <Text style={[{top:65, right:'31%'}, styles.numbers, activeTooth(22)]}>22</Text>
            <Text style={[{top:85, right:'23%'}, styles.numbers, activeTooth(23)]}>23</Text>
            <Text style={[{top:110, right:'17%'}, styles.numbers, activeTooth(24)]}>24</Text>
            <Text style={[{top:140, right:'12%'}, styles.numbers, activeTooth(25)]}>25</Text>
            <Text style={[{top:170, right:'8%'}, styles.numbers, activeTooth(26)]}>26</Text>
            <Text style={[{top:215, right:'5%'}, styles.numbers, activeTooth(27)]}>27</Text>
            <Text style={[{top:258, right:'4%'}, styles.numbers, activeTooth(28)]}>28</Text>

            <Text style={[{top:338, left:'4%'}, styles.numbers, activeTooth(48)]}>48</Text>
            <Text style={[{top:381, left:'6%'}, styles.numbers, activeTooth(47)]}>47</Text>
            <Text style={[{top:420, left:'10%'}, styles.numbers, activeTooth(46)]}>46</Text>
            <Text style={[{top:460, left:'17%'}, styles.numbers, activeTooth(45)]}>45</Text>
            <Text style={[{top:485, left:'22%'}, styles.numbers, activeTooth(44)]}>44</Text>
            <Text style={[{top:505, left:'28%'}, styles.numbers, activeTooth(43)]}>43</Text>
            <Text style={[{top:520, left:'36%'}, styles.numbers, activeTooth(42)]}>42</Text>
            <Text style={[{top:530, left:'44%'}, styles.numbers, activeTooth(41)]}>41</Text>

            <Text style={[{top:530, right:'44%'}, styles.numbers, activeTooth(31)]}>31</Text>
            <Text style={[{top:520, right:'36%'}, styles.numbers, activeTooth(32)]}>32</Text>
            <Text style={[{top:505, right:'28%'}, styles.numbers, activeTooth(33)]}>33</Text>
            <Text style={[{top:485, right:'22%'}, styles.numbers, activeTooth(34)]}>34</Text>
            <Text style={[{top:460, right:'17%'}, styles.numbers, activeTooth(35)]}>35</Text>
            <Text style={[{top:420, right:'10%'}, styles.numbers, activeTooth(36)]}>36</Text>
            <Text style={[{top:381, right:'6%'}, styles.numbers, activeTooth(37)]}>37</Text>
            <Text style={[{top:338, right:'4%'}, styles.numbers, activeTooth(38)]}>38</Text>
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