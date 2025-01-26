import { Link, Redirect, router } from "expo-router"
import type React from "react"
import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { TextInput, Button, Text, HelperText, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

const VerifyUPIPage: React.FC = () => {
    const [upiId, setUpiId] = useState("")
    const [error, setError] = useState("")
    const theme = useTheme()

    const validateUpiId = (id: string) => {
        // const upiRegex = /^[\w.-]+@[\w.-]+$/
        // return upiRegex.test(id)
        return true
    }

    const handleVerify = () => {
        if (!validateUpiId(upiId)) {
            setError("Invalid UPI ID format")
            return
        }

        setError("")
        // upi veification
        console.log("Verifying UPI ID:", upiId)
        // alert(`Verification process initiated for ${upiId}`)
        router.push({
            pathname: "/(app)/home/pay",
            params: {
                upiId: upiId
            }
        })
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Verify UPI ID</Text>
                    <TextInput
                        label="Enter UPI ID"
                        value={upiId}
                        onChangeText={setUpiId}
                        style={styles.input}
                        mode="outlined"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <HelperText type="error" visible={!!error}>
                        {error}
                    </HelperText>
                </View>
                <Button mode="contained" onPress={handleVerify} style={styles.button} disabled={!upiId} >
                    Verify
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#121212",
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "space-between",

    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        marginBottom: 16,
        backgroundColor: "#1E1E1E",
    },
    button: {
        marginTop: 16,
    },
})

export default VerifyUPIPage

