import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import axios from 'axios';
import { router } from 'expo-router';

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

const Login = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [duplicatePassword, setDuplicatePassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [signedup, setSignedUp] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !username || !duplicatePassword) {
            setError('Please enter all the values.');
            return;
        }
        if (password !== duplicatePassword){
            setError('Passwords dont match.')
            return;
        }
        setError('');
        setLoading(true);
        
        try {
            const response = await axios.post('https://dev-chain-upi.azurewebsites.net/api/auth/signup', {
                "username": username,
                "email": email,
                "password": password,
            });
            setSignedUp(true)
            console.log('Signup successful:', response.data);
            setTimeout(()=>{
                router.replace("./Login")
            }, 1000)
        } catch (err: any) {
            if (err.response.data.error === "email address in use"){
                setError("Email address in use")
            }
            else{
                console.error('Login failed:', err.toJSON());
                setError(err.response?.data?.message || 'Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <PaperProvider theme={darkTheme}>
            <View style={styles.container}>
                <Text style={styles.title}>Signup</Text>
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
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
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
                <TextInput
                    label="Re-enter Password"
                    value={duplicatePassword}
                    onChangeText={setDuplicatePassword}
                    secureTextEntry
                    style={styles.input}
                    textColor='#ffffff'
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Button mode="contained" onPress={handleSignup} loading={loading} disabled={loading} style={styles.button}>
                    Signup
                </Button>
                {signedup && <Text style={styles.helper}>Signup successful. Leading to Login</Text>}
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

export default Login;
