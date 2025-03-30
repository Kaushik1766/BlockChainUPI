import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function LinkButton({ link, title, icon, color }: { link: string, title: string, icon: any, color?: string }) {
    return (
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
                'rgba(255, 255, 255, 0.3)',
                false
            )}
            useForeground={true}
            onPress={() => router.navigate(link)}
        >
            <View style={[styles.buttonContainer, { backgroundColor: color || "#7E61C1" }]}>
                <AntDesign name={icon} size={32} color="#ffffff" style={styles.icon} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#703be7",
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
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
