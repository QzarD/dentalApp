import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Item, Input, Label} from 'native-base';
import patientsApi from '../api/patients';
import MyButton from "../components/MyButton";
import AddAppointmentScreen from "./AddAppointmentScreen";


const AddPatientScreen=({navigation})=> {
    const item=navigation.getParam('item');
    const isEdit=navigation.getParam('isEdit');
    const [values, setValues] = useState(isEdit ? {fullname:item.fullname,
        phone:item.phone} : {});

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
            .then((data) => {
                navigation.navigate('AddAppointment', {patientId:data.data.data._id});
            })
            .catch(e => {
                if (e.response.data && e.response.data.message) {
                    e.response.data.message.forEach(err => {
                        const fieldName = err.param;
                        alert(`Error! Field "${fieldsName[fieldName]}" is incorrect.`);
                    });
                }
            });
    };

    const onSubmitEdit = () => {
        patientsApi
            .patch(item._id, values)
            .then((data) => {
                navigation.navigate('Home', { lastUpdate: new Date() });
            })
            .catch(e => {
                if (e.response.data && e.response.data.message) {
                    e.response.data.message.forEach(err => {
                        const fieldName = err.param;
                        alert(`Error! Field "${fieldsName[fieldName]}" is incorrect.`);
                    });
                }
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
                <MyButton onPress={isEdit ? onSubmitEdit : onSubmit} color="#87CC6F">
                    {isEdit
                        ? <Text>Edit Patient</Text>
                        : <Text><Ionicons name="ios-add" size={16} color="white"/>Add Patient</Text>
                    }
                </MyButton>
            </View>
        </View>
    );
};

AddPatientScreen.navigationOptions = ({navigation}) => ({
    title: navigation.getParam('isEdit') ? 'Edit patient' : 'Add patient',
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
});

const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        marginTop: 30
    }
});

export default AddPatientScreen