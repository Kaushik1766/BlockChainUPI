import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { router } from 'expo-router';
import {changeUserPassword } from '@/functions/authFunctions';

const darkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6200ee',
        background: '#121212',
        surface: '#121212',
        text: '#ffffff',
    },
};

const changePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [duplicatePassword, setDuplicatePassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const changePassword = async () => {
        if (!newPassword || !duplicatePassword) {
            setError('Please enter all the values.');
            return;
        }
        if (newPassword !== duplicatePassword){
            setError('Passwords dont match.')
            return;
        }
        setError('');
        setLoading(true);
        
        try {
            const chk2 = changeUserPassword(newPassword);
            router.back()
        } catch (err: any) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <PaperProvider theme={darkTheme}>
            <View style={styles.container}>
                <Text style={styles.title}>Change Password</Text>
                <TextInput
                    label="Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    style={styles.input}
                    textColor='#ffffff'
                />
                <TextInput
                    label="Re-enter Password"
                    value={duplicatePassword}
                    onChangeText={setDuplicatePassword}
                    secureTextEntry
                    style={styles.input}
                    textColor='#ffffff'
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Button mode="contained" onPress={changePassword} loading={loading} disabled={loading} style={styles.button}>
                    Change Password
                </Button>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    helper: {
        marginTop: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#1E1E1E',
    },
    button: {
        marginTop: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default changePassword;
