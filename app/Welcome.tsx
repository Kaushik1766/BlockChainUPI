import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { useAuth0 } from 'react-native-auth0';
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

const WelcomePage = () => {
    const { authorize } = useAuth0();

    async function handleLogin() {
        try {
            await authorize();
            router.replace('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PaperProvider theme={darkTheme}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Welcome to</Text>
                    <Text style={styles.appName}>Chain UPI</Text>
                    <Text style={styles.subtitle}>Secure. Fast. Decentralized.</Text>
                </View>
                <Button
                    mode="contained"
                    onPress={()=>{router.push("./Signup")}}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >Signup</Button>
                <Button
                    mode="contained"
                    onPress={()=>{router.push("./Login")}}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    Login
                </Button>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#121212', // Dark background
        padding: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    appName: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#6200ee', // Primary color
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonLabel: {
        fontSize: 18,
    },
});

export default WelcomePage;