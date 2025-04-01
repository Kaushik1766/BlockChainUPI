import React, { useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { Text, Button, TextInput, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { login } from '@/functions/authFunctions';


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
    const [loggedin, setLoggedIn] = useState(false);

    const handleLogin = async () => {
        console.log("hello")
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
            let response = await login(email, password)
            console.log('Login successful:', response.data);
            setLoggedIn(true);
            setTimeout(()=>{
                router.push('/')
            }, 1000)
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
                <Button mode="contained"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                style={styles.button}
                labelStyle={styles.buttonLabel}>
                    Login
                </Button>
                {loggedin && <Text style={{color:"white", alignSelf:"center", marginTop:10}}>Login successful.. leading to home</Text>}
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
