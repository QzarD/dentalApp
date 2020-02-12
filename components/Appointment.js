import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import getAvatarColor from "../utils/getAvatarColor";
import Badge from "./Badge";

export default function Appointment({isAddAppointment, navigate, item}) {
    const {patient, diagnosis, active, time, price} = item;
    const avatarColors = getAvatarColor(patient.fullname[0].toUpperCase());
    return (
        <TouchableOpacity onPress={() => {
            if (isAddAppointment){
                navigate('AddAppointment', {patientId:patient._id})
            } else {
                navigate('Patient', item)
            }
        }}
                          style={styles.container}>
            <View style={[styles.avatar, {backgroundColor: avatarColors.background}]}>
                <Text style={[styles.letter, {color: avatarColors.color}]}>
                    {patient.fullname[0].toUpperCase()}
                </Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.fullname}>{patient.fullname}</Text>
                <Text style={styles.diagnosis}>{diagnosis}</Text>
            </View>
            {price && <Badge color='green' style={[styles.time, active && styles.activeTime]}>
                {price} $
            </Badge>
            }
            {time && <Text active={active} style={[styles.time, active && styles.activeTime]}>
                {time}
            </Text>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f3f3',
    },
    avatar: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 40,
        height: 40,
        marginRight: 15
    },
    letter: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -1
    },
    fullname: {
        fontWeight: '600',
        fontSize: 16
    },
    diagnosis: {
        fontSize: 16,
        color: '#8b979f'
    },
    time: {
        backgroundColor: '#e9f5ff',
        color: '#4294ff',
        borderRadius: 18,
        fontWeight: '600',
        fontSize: 14,
        width: 70,
        height: 32,
        textAlign: 'center',
        lineHeight: 28
    },
    activeTime: {
        color: '#fff',
        backgroundColor: '#2A86FF'
    }
});
