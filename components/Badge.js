import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function Badge({children, active, color}) {
    const colors = {
        green: {
            backgroundColor: 'rgba(132, 210, 105, 0.21)',
            color: '#61BB42'
        },
        active: {
            backgroundColor: '#2A86FF',
            color: '#fff'
        },
        default: {
            backgroundColor: '#E9F5FF',
            color: '#4294ff'
        }
    };

    let result;
    if (active) {
        result = colors.active;
    } else if (color && colors[color]) {
        result = colors[color];
    } else {
        result = colors.default;
    }

    return (
        <Text style={[result, styles.badge]}>
            {children}
        </Text>
    )
};

const styles = StyleSheet.create({
    badge: {
        borderRadius: 18,
        fontWeight: '600',
        fontSize: 14,
        minWidth: 70,
        paddingHorizontal: 10,
        height: 32,
        textAlign: 'center',
        lineHeight: 30
    }
});