import React,{useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";

const ToothFormulaScreen=({navigation})=> {
    const appointments=navigation.getParam('appointments');
    appointments.map(appointment =>appointment.dentNumber);
    return (
        <View style={styles.container}>
            <Image source={require('../assets/dentistry.png')} alt='Tooth formula'
            style={styles.image}/>
            <Text style={[{top:258, left:'4%'}, styles.numbers]}>18</Text>
            <Text style={[{top:215, left:'5%'}, styles.numbers]}>17</Text>
            <Text style={[{top:170, left:'8%'}, styles.numbers]}>16</Text>
            <Text style={[{top:140, left:'12%'}, styles.numbers]}>15</Text>
            <Text style={[{top:110, left:'17%'}, styles.numbers]}>14</Text>
            <Text style={[{top:85, left:'23%'}, styles.numbers]}>13</Text>
            <Text style={[{top:65, left:'31%'}, styles.numbers]}>12</Text>
            <Text style={[{top:50, left:'41%'}, styles.numbers]}>11</Text>

            <Text style={[{top:50, right:'41%'}, styles.numbers]}>21</Text>
            <Text style={[{top:65, right:'31%'}, styles.numbers]}>22</Text>
            <Text style={[{top:85, right:'23%'}, styles.numbers]}>23</Text>
            <Text style={[{top:110, right:'17%'}, styles.numbers]}>24</Text>
            <Text style={[{top:140, right:'12%'}, styles.numbers]}>25</Text>
            <Text style={[{top:170, right:'8%'}, styles.numbers]}>26</Text>
            <Text style={[{top:215, right:'5%'}, styles.numbers]}>27</Text>
            <Text style={[{top:258, right:'4%'}, styles.numbers]}>28</Text>

            <Text style={[{top:338, left:'4%'}, styles.numbers]}>48</Text>
            <Text style={[{top:381, left:'6%'}, styles.numbers]}>47</Text>
            <Text style={[{top:420, left:'10%'}, styles.numbers]}>46</Text>
            <Text style={[{top:460, left:'17%'}, styles.numbers]}>45</Text>
            <Text style={[{top:485, left:'22%'}, styles.numbers]}>44</Text>
            <Text style={[{top:505, left:'28%'}, styles.numbers]}>43</Text>
            <Text style={[{top:520, left:'36%'}, styles.numbers]}>42</Text>
            <Text style={[{top:530, left:'44%'}, styles.numbers]}>41</Text>

            <Text style={[{top:530, right:'44%'}, styles.numbers]}>31</Text>
            <Text style={[{top:520, right:'36%'}, styles.numbers]}>32</Text>
            <Text style={[{top:505, right:'28%'}, styles.numbers]}>33</Text>
            <Text style={[{top:485, right:'22%'}, styles.numbers]}>34</Text>
            <Text style={[{top:460, right:'17%'}, styles.numbers]}>35</Text>
            <Text style={[{top:420, right:'10%'}, styles.numbers]}>36</Text>
            <Text style={[{top:381, right:'6%'}, styles.numbers]}>37</Text>
            <Text style={[{top:338, right:'4%'}, styles.numbers]}>38</Text>
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