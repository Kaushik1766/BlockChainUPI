import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function LinkButton({ link, title, icon }: { link: string, title: string, icon: any }) {
    return (
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
                'rgba(255, 255, 255, 0.3)',
                false
            )}
            useForeground={true}
            onPress={() => router.navigate(link)}
        >
            <View style={styles.buttonContainer}>
                <AntDesign name={icon} size={32} color="#181A20" style={styles.icon} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#FCD34B",
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: "30%", // Square shape
        height: 120, // Square shape
    },
    icon: {
        marginBottom: 8,
    },
    text: {
        color: '#181A20',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
