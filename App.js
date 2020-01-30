import React from 'react';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import HomeScreen from "./screens/HomeScreen";
import PatientScreen from "./screens/PatientScreen";
import { SectionList, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddPatientScreen from "./screens/AddPatientScreen";
import AddAppointmentScreen from "./screens/AddAppointmentScreen";
import PatientsScreen from "./screens/PatientsScreen";

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'Журнал приёмов', headerTintColor: '#2A86FF', headerStyle:{
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
            }
        },
        Patient: {
            screen: PatientScreen,
            navigationOptions: {
                title: 'Map of patient', headerTintColor: '#2A86FF', headerStyle:{
                    elevation: 0.8,
                    shadowOpacity: 0.8
                }
            }
        },
        AddPatient: {
            screen: AddPatientScreen,
            navigationOptions: {
                title: 'Добавить пациента',
                headerTintColor: '#2A86FF',
                headerStyle: {
                    elevation: 0.8,
                    shadowOpacity: 0.8,
                }
            }
        },
        AddAppointment: {
            screen: AddAppointmentScreen,
            navigationOptions: {
                title: 'Добавить прием',
                headerTintColor: '#2A86FF',
                headerStyle: {
                    elevation: 0.8,
                    shadowOpacity: 0.8
                }
            }
        },
        Patients: {
            screen: PatientsScreen,
            navigationOptions: {
                title: 'Пациенты',
                headerTintColor: '#2A86FF',
                headerStyle: {
                    elevation: 0.8,
                    shadowOpacity: 0.8
                }
            }
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);