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
import ToothFormulaScreen from "./screens/ToothFormulaScreen";

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
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
                title: 'Add patient',
                headerTintColor: '#2A86FF',
                headerStyle: {
                    elevation: 0.8,
                    shadowOpacity: 0.8,
                }
            }
        },
        AddAppointment: {
            screen: AddAppointmentScreen
        },
        Patients: {
            screen: PatientsScreen,
            navigationOptions: {
                title: 'Patients',
                headerTintColor: '#2A86FF',
                headerStyle: {
                    elevation: 0.8,
                    shadowOpacity: 0.8
                }
            }
        },
        ToothFormula: {
            screen: ToothFormulaScreen
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);