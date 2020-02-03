import React, {useState, useEffect} from 'react';
import {SectionList, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Appointment from "../components/Appointment";
import ButtonPlus from "../components/ButtonPlus";
import appointmentsApi from "../api/appointments";
import Swipeable from 'react-native-swipeable-row';
import {Ionicons} from '@expo/vector-icons';

const HomeScreen=({navigation})=> {
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
            'Delete Reception',
            'Are you sure you want to delete the appointment?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
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
            <ButtonPlus onPress={navigation.navigate.bind(this, 'Patients', {isAddAppointment: true})}/>
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

HomeScreen.navigationOptions = ({ navigation }) => ({
    title: 'Reception Journal',
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    },
    headerRight: () => (
        <TouchableOpacity
            onPress={navigation.navigate.bind(this, 'Patients')}
            style={{ marginRight: 20 }}
        >
            <Ionicons name="md-people" size={28} color="black" />
        </TouchableOpacity>
    )
});

export default HomeScreen;
