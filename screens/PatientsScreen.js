import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Swipeable from 'react-native-swipeable-row';
import patientsApi from "../api/patients";
import phoneFormat from "../utils/phoneFormat";
import ButtonPlus from "../components/ButtonPlus";
import {Item, Input} from 'native-base';
import Appointment from "../components/Appointment";

export default function PatientScreen({navigation}) {
    const [data, setData] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchPatients = () => {
        setIsLoading(true);
        patientsApi
            .get()
            .then(({data}) => {
                setData(data.data);
            })
            .finally(e => {
                setIsLoading(false);
            });
    };
    useEffect(fetchPatients, []);
    useEffect(fetchPatients, [navigation.state.params]);

    const onSearch = e => {
        setSearchValue(e.nativeEvent.text);
    };
    const removePatient = id => {
        Alert.alert(
            'Delete Reception',
            'Are you sure you want to delete the reception?',
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
                        patientsApi
                            .remove(id)
                            .then(() => {
                                fetchPatients();
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
        <View style={{flex: 1}}>
            {data && (
                <>
                    <View style={{margin: 20}}>
                        <Item style={{paddingLeft: 15, borderRadius: 30, paddingBottom: 10}} regular>
                            <Input onChange={onSearch} placeholder="Search..."/>
                        </Item>
                    </View>
                    <FlatList
                        data={data.filter(
                            item =>
                                item.fullname
                                    .toLowerCase()
                                    .indexOf(searchValue.toLowerCase()) >= 0
                        )}
                        keyExtractor={item => item._id}
                        onRefresh={fetchPatients}
                        refreshing={isLoading}
                        renderItem={({item}) => (
                            <Swipeable
                                rightButtons={[
                                    <TouchableOpacity style={[styles.SwipeViewButton, {backgroundColor: '#B4C1CB'}]}>
                                        <Ionicons name="md-create" size={28} color="white"/>
                                    </TouchableOpacity>,
                                    <TouchableOpacity
                                        onPress={removePatient.bind(this, item._id)}
                                        style={[styles.SwipeViewButton, {backgroundColor: '#F85A5A'}]}
                                    >
                                        <Ionicons name="ios-close" size={48} color="white"/>
                                    </TouchableOpacity>
                                ]}
                            >
                                <Appointment
                                    navigate={navigation.navigate}
                                    isAddAppointment={navigation.getParam('isAddAppointment')}
                                    item={{
                                        patient: item,
                                        diagnosis: phoneFormat(item.phone)
                                    }}
                                />
                            </Swipeable>
                        )}
                        renderSectionHeader={({section: {title}}) => (
                            <Text style={styles.SectionTitle}>{title}</Text>
                        )}
                    />
                </>
            )}
            <ButtonPlus onPress={navigation.navigate.bind(this, 'AddPatient')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    SwipeViewButton: {
        width: 75,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SectionTitle: {
        fontWeight: '800',
        fontSize: 22,
        color: '#000000',
        marginTop: 25,
        paddingHorizontal: 20
    }
});
