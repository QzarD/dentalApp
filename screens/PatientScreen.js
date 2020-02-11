import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Linking, FlatList, Alert} from 'react-native';
import {AntDesign, Foundation, Ionicons, MaterialIcons} from '@expo/vector-icons';
import patientsApi from "../api/patients";
import phoneFormat from "../utils/phoneFormat";
import ButtonPlus from "../components/ButtonPlus";
import Badge from "../components/Badge";
import MyButton from "../components/MyButton";
import appointmentsApi from "../api/appointments";

export default function PatientScreen({navigation}) {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAppointmentCardEdit, setIsAppointmentCardEdit] = useState(false);

    useEffect(() => {
        const id = navigation.getParam('patient')._id;
        patientsApi
            .show(id)
            .then(({data}) => {
                setAppointments(data.data.appointments);
                setIsLoading(false);
                setIsAppointmentCardEdit(false)
            })
            .catch(() => {
                setIsLoading(false);
                setIsAppointmentCardEdit(false)
            });
    }, []);

    const fetchAppointments = () => {
        setIsLoading(true);
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
    };

    useEffect(fetchAppointments, []);

    useEffect(fetchAppointments, [navigation.state.params]);

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
                        <MyButton onPress={navigation.navigate.bind(this,'ToothFormula', {appointments:appointments})} color='#2A86FF'>Tooth formula</MyButton>
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
                        <ActivityIndicator style={{marginTop: 40}} size="large" color="#2A86FF"/>
                    ) : (
                        <FlatList data={appointments} keyExtractor={item=>item._id} renderItem={({item})=>(
                            <View style={styles.AppointmentCard} key={item._id}>
                                <TouchableOpacity style={styles.MoreButton} onPress={()=>setIsAppointmentCardEdit(true)}>
                                    <Ionicons
                                        name="md-more"
                                        size={24}
                                        color="rgba(0, 0, 0, 0.4)"
                                    />
                                </TouchableOpacity>
                                <View style={styles.AppointmentCardRow}>
                                    <Ionicons name="md-medical" size={16} color="#A3A3A3"/>
                                    <Text style={styles.AppointmentCardLabel}>
                                        Tooth:{' '}
                                        <Text style={{fontWeight: '600'}}>
                                            {item.dentNumber}
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
                                        Diagnosis:{' '}
                                        <Text style={{fontWeight: 'bold'}}>
                                            {item.diagnosis}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={[styles.AppointmentCardRow,
                                    {marginTop: 15, justifyContent: 'space-between'}]}>
                                    <Badge style={{width: 155}} active>
                                        {item.date} - {item.time}
                                    </Badge>
                                    <Badge color="green">{item.price} $</Badge>
                                </View>
                                {isAppointmentCardEdit &&
                                    <View style={styles.AppointmentCardEdit}>
                                        <TouchableOpacity style={[{backgroundColor: '#B4C1CB'}, styles.CardEditButton]}
                                                          onPress={navigation.navigate.bind(this,'AddAppointment',
                                                              {item:item, isEdit:true})}>
                                            <Ionicons
                                                name="md-create"
                                                size={28}
                                                color="rgba(0, 0, 0, 0.4)"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{backgroundColor: '#F85A5A'}, styles.CardEditButton]}
                                                          onPress={removeAppointment.bind(this, item._id)}>
                                            <MaterialIcons
                                                name="delete"
                                                size={28}
                                                color="rgba(0, 0, 0, 0.4)"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{backgroundColor: '#def0f9'}, styles.CardEditButton]}
                                                          onPress={()=>setIsAppointmentCardEdit(false)}>
                                            <Ionicons
                                                name="ios-close"
                                                size={38}
                                                color="rgba(0, 0, 0, 0.4)"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        )}/>
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
        backgroundColor: 'white',
        marginBottom: 20,
    },
    PatientDetails: {
        flex: 0.3,
        padding: 20,
        backgroundColor: 'white',
    },
    PatientAppointments: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#f8fafd',
        paddingHorizontal: 20
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
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 30,
        marginBottom: 3,
    },
    GrayText: {
        fontSize: 16,
        color: '#8b979f',
    },
    AppointmentCardEdit: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 57,
        width: 200,
        borderRadius:10,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    CardEditButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width:66,
        borderRadius:10,
    },
});
