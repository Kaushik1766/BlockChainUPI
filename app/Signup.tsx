import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, TextInput, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useRouter } from 'expo-router';

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

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        if (!email || !username || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
    
        setError('');
        setLoading(true);
    
        try {
            await axios.post('https://dev-chain-upi.azurewebsites.net/api/auth/signup', {
                email, username, password
            });
            setTimeout(() => {
                router.replace('/Login');  // Ensure '/Login' exists in your pages folder
            }, 1000);
        } catch (err) {
            console.error("Signup Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Signup failed. Try again.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container}>
                <Image source={require('../assets/images/Logo.webp')} style={styles.logo} resizeMode="contain" />
                <Text style={styles.title}>Create an Account</Text>
                <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} />
                <TextInput label="Username" value={username} onChangeText={setUsername} autoCapitalize="none" style={styles.input} />
                <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
                <TextInput label="Re-enter Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.input} />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.buttonGradient}>
                    <Button mode="contained" onPress={handleSignup} loading={loading} disabled={loading} labelStyle={styles.buttonText} style={styles.button}>Sign Up</Button>
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

export default Signup;
