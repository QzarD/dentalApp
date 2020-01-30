import React, {useState, useEffect} from 'react';
import {SectionList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Appointment from "../components/Appointment";
import ButtonPlus from "../components/ButtonPlus";
import appointmentsApi from "../api/appointments";
import Swipeable from 'react-native-swipeable-row';
import {Ionicons} from '@expo/vector-icons';

export default function HomeScreen({navigation}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdateTime, setlastUpdateTime] = useState(null);

    const fetchAppointments = () => {
        setIsLoading(true);
        appointmentsApi
            .get()
            .then(({data}) => {
                setData(data.data);
            })
            .finally(e => {
                setIsLoading(false);
            });
    };

    useEffect(fetchAppointments, []);

    useEffect(fetchAppointments, [navigation.state.params]);

    // TODO: Продумать удаление приемов
    const removeAppointment = id => {
        Alert.alert(
            'Удаление приема',
            'Вы действительно хотите удалить прием?',
            [
                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    onPress: () => {
                        setIsLoading(true);
                        appointmentsApi
                            .remove(id)
                            .then(() => {
                                fetchAppointments();
                            })
                            .catch(() => {
                                setIsLoading(false);
                            });
                    }
                }
            ],
            {cancelable: false}
        );
    };

    return (
        <View style={styles.container}>
            {data && (
                <SectionList
                    sections={data}
                    keyExtractor={item => item._id}
                    onRefresh={fetchAppointments}
                    refreshing={isLoading}
                    renderItem={({item}) => (
                        <Swipeable
                            rightButtons={[
                                <TouchableOpacity
                                    style={[styles.rightButton, {backgroundColor: '#B4C1CB'}]}>
                                    <Ionicons name="md-create" size={28} color="white"/>
                                </TouchableOpacity>,
                                <TouchableOpacity
                                    onPress={removeAppointment.bind(this, item._id)}
                                    style={[styles.rightButton, {backgroundColor: '#F85A5A'}]}
                                >
                                    <Ionicons name="ios-close" size={48} color="white"/>
                                </TouchableOpacity>
                            ]}
                        >
                            <Appointment navigate={navigation.navigate} item={item}/>
                        </Swipeable>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={styles.SectionTitle}>{title}</Text>
                    )}
                />
            )}
            <ButtonPlus onPress={navigation.navigate.bind(this, 'AddPatient')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: '800',
        fontSize: 22,
        color: '#000000',
        marginTop: 25,
        paddingHorizontal: 20,
    },
    rightButton: {
        width: 75,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SectionTitle: {
        fontWeight: '800',
        fontSize: 22,
        color: '#000000',
        marginTop: 25,
        paddingHorizontal: 20
    }
});
