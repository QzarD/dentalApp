import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function MyButton({children, color, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}
                          color={color}
                          style={[styles.container, color && {backgroundColor: color}]}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        height: 45
    },
    text: {
        color: 'white',
        fontWeight: '400',
        fontSize: 16,
    }
});
