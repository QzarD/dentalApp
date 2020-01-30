import React, { useState } from 'react';
import { NavigationActions } from 'react-navigation';
import {StyleSheet, Text, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Item, Input, Label, Picker } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { appointmentsApi } from '../api/appointments';
import MyButton from "../components/MyButton";

export default function AddAppointmentScreen ({ navigation }) {
    const [values, setValues] = useState({
        diagnosis: 'пульпит',
        dentNumber: '',
        price: '',
        date: null,
        time: null,
        patient: navigation.getParam('patientId')
    });

    const fieldsName = {
        diagnosis: 'Диагноз',
        dentNumber: 'Номер зуба',
        price: 'Цена',
        date: 'Дата',
        time: 'Время'
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
                        alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
                    });
                }
            });
    };

    return (
        <View style={{padding: 25, flex: 1}}>
            <Item style={{ marginLeft: 0 }} floatingLabel>
                <Label>Номер зуба</Label>
                <Input
                    onChange={handleInputChange.bind(this, 'dentNumber')}
                    value={values.fullname}
                    style={{ marginTop: 12 }}
                    keyboardType="numeric"
                    autoFocus
                />
            </Item>
            <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
                <Label>Цена</Label>
                <Input
                    onChange={handleInputChange.bind(this, 'price')}
                    value={values.phone}
                    keyboardType="numeric"
                    style={{ marginTop: 12 }}
                />
            </Item>
            <Item style={{ marginTop: 20, marginLeft: 0 }}>
                <Picker
                    mode="dropdown"
                    placeholder="Выберите диагноз"
                    placeholderStyle={{ color: '#bfc6ea' }}
                    placeholderIconColor="#007aff"
                    style={{ width: '100%' }}
                    onValueChange={setFieldValue.bind(this, 'diagnosis')}
                    selectedValue={values.diagnosis}
                >
                    <Picker.Item label="пульпит" value="пульпит" />
                    <Picker.Item label="удаление зуба" value="удаление зуба" />
                    <Picker.Item label="спид" value="спид" />
                </Picker>
            </Item>
            <Item style={{ marginTop: 20, marginLeft: 0 }}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{ flex: 1 }}>
                        <DatePicker
                            date={new Date()}
                            mode="date"
                            placeholder="Дата"
                            format="YYYY-MM-DD"
                            minDate={new Date()}
                            confirmBtnText="Сохранить"
                            cancelBtnText="Отмена"
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
                            placeholder="Время"
                            format="HH:mm"
                            minDate={new Date()}
                            confirmBtnText="Сохранить"
                            cancelBtnText="Отмена"
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
                <MyButton onPress={onSubmit} color="#87CC6F">
                    <Ionicons name="ios-add" size={24} color="white" />
                    <Text>Добавить приема</Text>
                </MyButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        marginTop: 30
    }
});