import React from 'react';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs";
import HomeScreen from "./screens/HomeScreen";
import PatientScreen from "./screens/PatientScreen";
import { SectionList, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddPatientScreen from "./screens/AddPatientScreen";
import AddAppointmentScreen from "./screens/AddAppointmentScreen";
import PatientsScreen from "./screens/PatientsScreen";
import ToothFormulaScreen from "./screens/ToothFormulaScreen";

const AppContainer = createStackNavigator({
        default: createBottomTabNavigator({
                Home: {
                    screen: HomeScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name='ios-home' size={24} color={tintColor}/>
                    }
                },
                History: {
                    screen: HomeScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name='logo-buffer' size={24} color={tintColor}/>
                    }
                },
                AddAppointment: {
                    screen: AddAppointmentScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name='ios-add-circle' size={48} color='#E9446A'
                                                               style={{
                                                                   shadowColor: '#E9446A',
                                                                   shadowOffset: {width: 0, height: 0},
                                                                   shadowRadius: 10,
                                                                   shadowOpacity: 0.3
                                                               }}/>
                    }
                },
                Patients: {
                    screen: PatientsScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name='ios-notifications' size={24} color={tintColor}/>
                    }
                },
                Profile: {
                    screen: PatientsScreen,
                    navigationOptions: {
                        title: 'Map of patient', headerTintColor: '#2A86FF', headerStyle:{
                            elevation: 0.8,
                            shadowOpacity: 0.8
                        },
                        tabBarIcon: ({tintColor}) => <Ionicons name='ios-person' size={24} color={tintColor}/>
                    }
                }
            },
            {
                defaultNavigationOptions: {
                    tabBarOnPress: ({navigation, defaultHandler}) => {
                        if (navigation.state.key === 'Post') {
                            navigation.navigate('postModal')
                        } else {
                            defaultHandler()
                        }
                    }
                }
            },
            {
                tabBarOptions: {
                    activeTintColor: 'black',
                    inactiveTintColor: '#a8a8a8',
                    showLabel: false
                }
            }),
        postModal: {
            screen: HomeScreen
        }
    },
    {
        mode: 'modal',
        //headerMode: 'none',
        //initialRouteName:'Home'
    }
);
const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        HomeOld: {
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