import { router } from "expo-router"
import type React from "react"
import { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { TextInput, Button, Text, HelperText, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import NfcManager, { NfcTech } from 'react-native-nfc-manager';


const VerifyUPIPage: React.FC = () => {
    const [error, setError] = useState("")
    const [isSupported, setIsSupported] = useState<boolean | null>(null);
    const [isNfcEnabled, setIsNfcEnabled] = useState<boolean | null>(null);
    const [refresh, setRefresh] = useState<number | null>(1)
    const [scanning, setScanning] = useState<number | null>(0)



    const checkNfcStatus = async () => {
        try {
            const supported = await NfcManager.isSupported();
            setIsSupported(supported);

            if (supported) {
                const enabled = await NfcManager.isEnabled();
                setIsNfcEnabled(enabled);
            }
        } catch (error) {
            console.error('Error checking NFC status:', error);
            setError("error in checking nfc status")
            setIsSupported(false);
        }
    };

    useEffect(() => {
        checkNfcStatus();
        if (refresh === 1) {
            setRefresh(0);
        }
    }, [refresh]);




    const validateUpiId = (id: string) => {
        // const upiRegex = /^[\w.-]+@[\w.-]+$/
        // return upiRegex.test(id)
        return true
    }

    const handleVerify = (upiId: string) => {
        if (!validateUpiId(upiId)) {
            setError("Invalid UPI ID format")
            return
        }

        setError("")
        console.log("Verifying UPI ID:", upiId)
        router.push({
            pathname: "/(app)/home/pay",
            params: {
                upiId: upiId
            }
        })
    }

    async function readNdef() {
        setScanning(1);
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);

            const tag = await NfcManager.getTag();
            let payloads = [""]
            if (tag?.ndefMessage) {

                payloads = tag.ndefMessage.map((content) => (content.payload)).map(el => el.map((el) => (String.fromCharCode(el))).join('').substring(3));
            }
            if (!!payloads[0]) {
                handleVerify(payloads[0])
            }
        } catch (ex) {
            console.log('NFC Read Error:', ex);
        } finally {
            NfcManager.cancelTechnologyRequest();
            setScanning(0)
        }
    }



    if (isSupported === null && isNfcEnabled === null) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Checking NFC support....</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    if (!isSupported) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>NFC is not supported in your device, return to home</Text>
                        <HelperText type="error" visible={!!error}>
                            {error}
                        </HelperText>
                    </View>
                    <Button mode="contained" onPress={() => {
                        router.push({
                            pathname: "/(app)/home"
                        })
                    }} style={styles.button}>
                        Home
                    </Button>
                </View>
            </SafeAreaView>
        );
    }

    if (!isNfcEnabled) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Please enable NFC</Text>
                        <HelperText type="error" visible={!!error}>
                            {error}
                        </HelperText>
                    </View>
                    <Button mode="contained" onPress={() => { setRefresh(1) }} style={styles.button}>
                        Refresh
                    </Button>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Tap to Pay</Text>
                    <HelperText type="error" visible={!!error}>
                        {error}
                    </HelperText>
                </View>
                <Button mode="contained" onPress={readNdef} style={styles.button}>
                    Tap
                </Button>
                <HelperText type="info" style={{ alignSelf: "center", margin: 16 }} visible={!!scanning}>
                    scanning...
                </HelperText>
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
        justifyContent: "center",
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
        alignSelf: "center",
        backgroundColor: "#6F3DE4",
    },
})

export default VerifyUPIPage

