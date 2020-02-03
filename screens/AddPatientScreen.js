import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Item, Input, Label} from 'native-base';
import patientsApi from '../api/patients';
import MyButton from "../components/MyButton";


export default function AddPatientScreen({navigation}) {
    const [values, setValues] = useState({});

    const handleChange = (name, e) => {
        const text = e.nativeEvent.text;
        setValues({
            ...values,
            [name]: text,
        });
    };

    const onSubmit = () => {
        patientsApi
            .add(values)
            .then(() => {
                navigation.navigate('Home');
            })
            .catch(e => {
                alert('ERROR');
            });
    };

    return (
        <View style={{padding: 25, flex: 1}}>
            <Item style={{marginLeft: 0}} floatingLabel>
                <Label>Name and Surname</Label>
                <Input
                    onChange={handleChange.bind(this, 'fullname')}
                    value={values.fullname}
                    style={{marginTop: 12}}
                    autoFocus
                />
            </Item>
            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                <Label>Phone number</Label>
                <Input
                    onChange={handleChange.bind(this, 'phone')}
                    value={values.phone}
                    keyboardType="numeric"
                    dataDetectorTypes="phoneNumber"
                    style={{marginTop: 12}}
                />
            </Item>
            <View style={styles.buttonView}>
                <MyButton onPress={onSubmit} color="#87CC6F">
                    {/*<Ionicons name="ios-add" size={24} color="white"/>*/}
                    <Text>Add Patient</Text>
                </MyButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        marginTop: 30
    },
    ico: {

    }
});