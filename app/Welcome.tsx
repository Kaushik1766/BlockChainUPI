import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
// import { useAuth0 } from 'react-native-auth0';
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
    // async function handleLogin() {
    //     try {
    //         await authorize();
    //         router.replace('/');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <PaperProvider theme={darkTheme}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={require("../assets/images/logo_transparent1.png")} style={{ width: 400, height: 200 }} />
                    {/* <Text style={styles.title}>Welcome to</Text> */}
                    {/* <Text style={styles.appName}>Chain UPI</Text>
                    <Text style={styles.subtitle}>Secure. Fast. Decentralized.</Text> */}
                </View>
                <Button
                    mode="contained"
                    onPress={() => { router.push("./Signup") }}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >Signup</Button>
                <Button
                    mode="contained"
                    onPress={() => { router.push("./Login") }}
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
        color: '#FCD34B',
        marginBottom: 10,
    },
    appName: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FCD34B', // Primary color
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#FCD34B',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: "#FCD34B",

    },
    buttonLabel: {
        color: "#181A20",
        fontSize: 18,
    },
});

export default WelcomePage;