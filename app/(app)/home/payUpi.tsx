import { router } from "expo-router"
import React, { useState } from "react"
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native"
import { TextInput, Button, Text, HelperText, useTheme, Card } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

const VerifyUPIPage: React.FC = () => {
    const [upiId, setUpiId] = useState("")
    const [error, setError] = useState("")
    const theme = useTheme()

    const validateUpiId = (id: string) => {
        const upiRegex = /^[\w.-]+@[\w.-]+$/
        return upiRegex.test(id)
    }

    const handleVerify = () => {
        if (!validateUpiId(upiId)) {
            setError("Invalid UPI ID format. Example: user@chainupi")
            return
        }

        setError("")
        router.push({
            pathname: "/(app)/home/pay",
            params: { upiId },
        })
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.container}
            >
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.title}>Verify UPI ID</Text>

                        <TextInput
                            label="Enter UPI ID"
                            value={upiId}
                            onChangeText={setUpiId}
                            style={styles.input}
                            mode="outlined"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            theme={{ colors: { primary: theme.colors.primary } }}
                        />

                        <HelperText type="error" visible={!!error}>
                            {error}
                        </HelperText>

                        <Button
                            mode="contained"
                            onPress={handleVerify}
                            style={styles.button}
                            labelStyle={{ fontSize: 16 }}
                            disabled={!upiId}
                        >
                            Verify
                        </Button>
                    </Card.Content>
                </Card>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    card: {
        backgroundColor: "#1E1E1E",
        paddingVertical: 20,
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        marginBottom: 10,
        backgroundColor: "#2A2A2A",
    },
    button: {
        marginTop: 10,
        borderRadius: 8,
    },
})

export default VerifyUPIPage
