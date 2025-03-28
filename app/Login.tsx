import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, TextInput, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from './UserContext';
import { useRouter } from 'expo-router';
import { decode as base64Decode } from 'base-64';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6A11CB',  
        background: '#F5F5F5',
        text: '#333',
        placeholder: '#999',
    },
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                'https://dev-chain-upi.azurewebsites.net/api/auth/login',
                { email, password }
            );

            const cookieHeader = response.headers['set-cookie'];
            if (cookieHeader) {
                const tokenString = cookieHeader[0];
                const tokenStart = tokenString.indexOf('=') + 1;
                const tokenEnd = tokenString.indexOf(';');
                const jwtToken = tokenString.substring(tokenStart, tokenEnd);

                const tokens = jwtToken.split('.');
                const bodyObject = JSON.parse(base64Decode(tokens[1]));

                useUserStore.setState(() => ({ ...bodyObject }));

                await AsyncStorage.setItem('UPI-login-token', jwtToken);
            }

            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Incorrect email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container}>

                {/* Logo at the top */}
                <Image 
                    source={require('../assets/images/Logo.webp')} 
                    style={styles.logo} 
                    resizeMode="contain"
                />

                <Text style={styles.title}>Welcome Back</Text>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Gradient Button */}
                <LinearGradient 
                    colors={['#8E2DE2', '#4A00E0']}  
                    style={styles.buttonGradient}
                >
                    <Button
                        mode="contained"
                        onPress={handleLogin}
                        loading={loading}
                        disabled={loading}
                        labelStyle={styles.buttonText}
                        style={styles.button}
                    >
                        Sign In
                    </Button>
                </LinearGradient>

            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    logo: {
        width: 100,  
        height: 100,  
        borderRadius: 20,  
        marginBottom: 20,  
        borderWidth: 3,  
        borderColor: '#6A11CB',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        marginBottom: 12,
        backgroundColor: '#FFF',
        borderRadius: 8,
    },
    buttonGradient: {
        width: '100%',
        borderRadius: 12,
        marginTop: 10,
        shadowColor: '#4A00E0',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    button: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: 'transparent',  
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default Login;
