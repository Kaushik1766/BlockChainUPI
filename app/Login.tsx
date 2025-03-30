import React, { useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { Text, Button, TextInput, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from './UserContext';
import { State } from 'react-native-gesture-handler';
import { router } from 'expo-router';


const darkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FCD34B',
        background: '#181A20',
        surface: '#181A20',
        text: '#ffffff',
    },
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email && !password) {
            setError('Please enter both email and password.');
            return;
        }
        else if (!email) {
            setError('Please enter email');
            return;
        }
        if (!password) {
            setError('Please enter password.');
            return;
        }
        setError('');
        setLoading(true);
        
        try {
            const response = await axios.post('https://dev-chain-upi.azurewebsites.net/api/auth/login', {
                "email": email,
                "password": password,
            }, {
                headers:{
                    "set-cookie":""
                }
            });
            if (response.headers["set-cookie"]){
                let end = response.headers["set-cookie"][0].indexOf(";")
                let tokens = response.headers["set-cookie"][0].substring(6, end).split(".")
                let bodyObject = JSON.parse(atob(tokens[1]))
                useUserStore.setState(bodyObject)
                await AsyncStorage.setItem('UPI-login-token', response.headers["set-cookie"][0].substring(6, end))
            }
            console.log('Login successful:', response.data);
            router.push('/')
        } catch (err: any) {
            console.log('Login failed:', err.toJSON());
            setError(err.response?.data?.message || 'Incorrect email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PaperProvider theme={darkTheme}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    textColor='#ffffff'
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                    textColor='#ffffff'
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Button mode="contained" onPress={handleLogin} loading={loading} disabled={loading} style={styles.button} labelStyle={styles.buttonLabel}>
                    Login
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
        backgroundColor: '#181A20',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FCD34B',
        textAlign: 'center',
        marginBottom: 60,
    },
    input: {
        marginBottom: 30,
        backgroundColor: '#181A20',
    },
    button: {
        marginTop: 16,
        backgroundColor:"#FCD34B",
        color:"#181A20"
    },
    buttonLabel: {
        color:"#181A20",
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default Login;
