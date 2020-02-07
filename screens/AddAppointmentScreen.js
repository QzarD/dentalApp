import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Item, Input, Label, Picker } from 'native-base';
import DatePicker from 'react-native-datepicker';
import appointmentsApi from '../api/appointments';
import MyButton from "../components/MyButton";

const AddAppointmentScreen = ({ navigation }) => {
    const item=navigation.getParam('item');
    const isEdit=navigation.getParam('isEdit');
    const [values, setValues] = useState({
        diagnosis: isEdit ? item.diagnosis : 'Pulpitis',
        dentNumber: isEdit ? String(item.dentNumber) : '',
        price: isEdit ? String(item.price) : '',
        date: isEdit ? item.date : null,
        time: isEdit ? item.time : null,
        patient: isEdit ? item.patient._id : navigation.getParam('patientId')
    });

    const fieldsName = {
        diagnosis: 'Diagnosis',
        dentNumber: 'Tooth number',
        price: 'Price',
        date: 'Date',
        time: 'Time'
    };

    const setFieldValue = (name, value) => {
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleInputChange = (name, e) => {
        const text = e.nativeEvent.text;
        setFieldValue(name, text);
    };

    const onSubmit = () => {
        appointmentsApi
            .add(values)
            .then(() => {
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
    const onSubmitEdit = () => {
        appointmentsApi
            .edit(item._id, values)
            .then(() => {
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
            <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label>Tooth number</Label>
                <Input
                    onChange={handleInputChange.bind(this, 'dentNumber')}
                    value={values.dentNumber}
                    style={{ marginTop: 12 }}
                    keyboardType="numeric"
                    autoFocus
                />
            </Item>
            <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
                <Label>Price</Label>
                <Input
                    onChange={handleInputChange.bind(this, 'price')}
                    value={values.price}
                    keyboardType="numeric"
                    style={{ marginTop: 12 }}
                />
            </Item>
            <Item style={{ marginTop: 20, marginLeft: 0 }}>
                <Picker
                    mode="dropdown"
                    placeholder="Choose a diagnosis"
                    placeholderStyle={{ color: '#bfc6ea' }}
                    placeholderIconColor="#007aff"
                    style={{ width: '100%' }}
                    onValueChange={setFieldValue.bind(this, 'diagnosis')}
                    selectedValue={values.diagnosis}
                >
                    <Picker.Item label="Pulpitis" value="Pulpitis" />
                    <Picker.Item label="Removal of a tooth" value="Removal of a tooth" />
                    <Picker.Item label="Dead" value="Dead" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>
            </Item>
            <Item style={{ marginTop: 20, marginLeft: 0 }}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{ flex: 1 }}>
                        <DatePicker
                            date={isEdit ? item.date : new Date()}
                            mode="date"
                            placeholder="Date"
                            format="YYYY-MM-DD"
                            minDate={new Date()}
                            confirmBtnText="OK"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0
                                },
                                dateText: {
                                    fontSize: 18
                                }
                            }}
                            date={values.date}
                            onDateChange={setFieldValue.bind(this, 'date')}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <DatePicker
                            mode="time"
                            placeholder="Time"
                            format="HH:mm"
                            minDate={new Date()}
                            confirmBtnText="OK"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0
                                },
                                dateText: {
                                    fontSize: 18
                                }
                            }}
                            date={values.time}
                            onDateChange={setFieldValue.bind(this, 'time')}
                        />
                    </View>
                </View>
            </Item>
            <View style={styles.buttonView}>
                <MyButton onPress={isEdit ? onSubmitEdit : onSubmit} color="#87CC6F">
                    {/*<Ionicons name="ios-add" size={24} color="white" />*/}
                    <Text>Add Reception</Text>
                </MyButton>
            </View>
        </View>
    );
};

AddAppointmentScreen.navigationOptions = ({navigation}) => ({
    title: navigation.getParam('isEdit') ? 'Edit appointment' : 'Add appointment',
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

export default AddAppointmentScreen