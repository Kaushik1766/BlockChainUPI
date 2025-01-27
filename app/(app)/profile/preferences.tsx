import type React from "react"
import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Switch, Button, Divider, List, RadioButton } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"

const PreferencesPage: React.FC = () => {
    const navigation = useNavigation()
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)
    const [biometricEnabled, setBiometricEnabled] = useState(false)
    const [defaultChain, setDefaultChain] = useState("ethereum")
    const [currency, setCurrency] = useState("usd")

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleSave = () => {
        // Implement save logic here
        console.log("Preferences saved:", {
            notificationsEnabled,
            biometricEnabled,
            defaultChain,
            currency,
        })
        handleGoBack()
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Preferences</Text>
                <ScrollView style={styles.scrollView}>
                    <List.Section>
                        <List.Subheader>Notifications</List.Subheader>
                        <List.Item
                            title="Enable Notifications"
                            right={() => <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />}
                        />
                        <Divider />
                        <List.Subheader>Security</List.Subheader>
                        <List.Item
                            title="Enable Biometric Authentication"
                            right={() => <Switch value={biometricEnabled} onValueChange={setBiometricEnabled} />}
                        />
                        <Divider />
                        <List.Subheader>Default Blockchain</List.Subheader>
                        <RadioButton.Group onValueChange={(value) => setDefaultChain(value)} value={defaultChain}>
                            <RadioButton.Item label="Ethereum" value="ethereum" />
                            <RadioButton.Item label="Binance Smart Chain" value="bsc" />
                            <RadioButton.Item label="Polygon" value="polygon" />
                            <RadioButton.Item label="Solana" value="solana" />
                        </RadioButton.Group>
                        <Divider />
                        <List.Subheader>Display Currency</List.Subheader>
                        <RadioButton.Group onValueChange={(value) => setCurrency(value)} value={currency}>
                            <RadioButton.Item label="USD" value="usd" />
                            <RadioButton.Item label="EUR" value="eur" />
                            <RadioButton.Item label="GBP" value="gbp" />
                            <RadioButton.Item label="JPY" value="jpy" />
                        </RadioButton.Group>
                    </List.Section>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Button mode="outlined" onPress={handleGoBack} style={styles.button}>
                        Cancel
                    </Button>
                    <Button mode="contained" onPress={handleSave} style={styles.button}>
                        Save
                    </Button>
                </View>
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
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 16,
        textAlign: "center",
    },
    scrollView: {
        flex: 1,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
    },
})

export default PreferencesPage

