import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Linking} from 'react-native';
import {Foundation, Ionicons} from '@expo/vector-icons';
import MyButton from "../components/MyButton";
import patientsApi from "../api/patients";
import phoneFormat from "../utils/phoneFormat";
import ButtonPlus from "../components/ButtonPlus";
import Badge from "../components/Badge";

export default function PatientScreen({navigation}) {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const id = navigation.getParam('patient')._id;
        patientsApi
            .show(id)
            .then(({data}) => {
                setAppointments(data.data.appointments);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={styles.PatientDetails}>
                <Text style={styles.PatientFullname}>
                    {navigation.getParam('patient', {}).fullname}
                </Text>
                <Text style={styles.GrayText}>
                    {phoneFormat(navigation.getParam('patient', {}).phone)}
                </Text>

                <View style={styles.PatientButtons}>
                    <View style={styles.FormulaButtonView}>
                        <MyButton>Формула зубов</MyButton>
                    </View>
                    <View style={styles.PhoneButtonView}>
                        <MyButton
                            onPress={() =>
                                Linking.openURL(
                                    'tel:' + navigation.getParam('patient', {}).phone
                                )
                            }
                            color="#84D269"
                        >
                            <Foundation name="telephone" size={22} color="white"/>
                        </MyButton>
                    </View>
                </View>
            </View>

            <View style={styles.PatientAppointments}>
                <View style={styles.container}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#2A86FF"/>
                    ) : (
                        appointments.map(appointment => (
                            <View style={styles.AppointmentCard} key={appointment._id}>
                                <TouchableOpacity style={styles.MoreButton}>
                                    <Ionicons
                                        name="md-more"
                                        size={24}
                                        color="rgba(0, 0, 0, 0.4)"
                                    />
                                </TouchableOpacity>
                                <View style={styles.AppointmentCardRow}>
                                    <Ionicons name="md-medical" size={16} color="#A3A3A3"/>
                                    <Text style={styles.AppointmentCardLabel}>
                                        Зуб:{' '}
                                        <Text style={{fontWeight: '600'}}>
                                            {appointment.dentNumber}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={styles.AppointmentCardRow}>
                                    <Foundation
                                        name="clipboard-notes"
                                        size={16}
                                        color="#A3A3A3"
                                    />
                                    <Text style={styles.AppointmentCardLabel}>
                                        Диагноз:{' '}
                                        <Text style={{fontWeight: '600'}}>
                                            {appointment.diagnosis}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={[styles.AppointmentCardRow,
                                    {marginTop: 15, justifyContent: 'space-between'}]}>
                                    <Badge style={{width: 155}} active>
                                        {appointment.date} - {appointment.time}
                                    </Badge>
                                    <Badge color="green">{appointment.price} Р</Badge>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </View>
            <ButtonPlus
                onPress={navigation.navigate.bind(this, 'AddAppointment', {
                    patientId: navigation.getParam('patient', {})._id
                })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    MoreButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: 10,
        height: 32,
        width: 32,
    },
    AppointmentCardLabel: {
        fontSize: 16,
        marginLeft: 10,
    },
    AppointmentCardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3.5,
        marginBottom: 3.5,
    },
    AppointmentCard: {
        shadowColor: 'gray',
        elevation: 0.5,
        shadowOpacity: 0.4,
        shadowRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 10,
        background: 'white',
        marginBottom: 20,
    },
    PatientDetails: {
        flex: 0.3,
    },
    PatientAppointments: {
        flex: 1,
        background: '#f8fafd',
    },
    FormulaButtonView: {
        flex: 1,
    },
    PhoneButtonView: {
        marginLeft: 10,
        width: 45,
    },
    PatientButtons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20
    },
    PatientFullname: {
        fontWeight: '800',
        fontSize: 24,
        lineHeight: 30,
        marginBottom: 3,
    },
    GrayText: {
        fontSize: 16,
        color: '#8b979f',
    },
});
