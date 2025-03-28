import type React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"

const TermsAndConditionsPage: React.FC = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Terms and Conditions</Text>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.content}>
                        {"\n"}**1. Acceptance of Terms**{"\n"}
                        By accessing and using the Chain UPI application ("the App"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the App.
                    </Text>
                    <Text style={styles.content}>
                        {"\n"}**2. Description of Service**{"\n"}
                        Chain UPI is a blockchain-based Unified Payments Interface (UPI) application that allows users to make secure and fast transactions across multiple blockchain networks.
                    </Text>
                    <Text style={styles.content}>
                        {"\n"}**3. User Accounts**{"\n"}
                        - You must create an account to use the App's services.{"\n"}
                        - You are responsible for maintaining the confidentiality of your account information.{"\n"}
                        - You are responsible for all activities that occur under your account.
                    </Text>
                    <Text style={styles.content}>
                        {"\n"}**4. Transactions & Fees**{"\n"}
                        - You are solely responsible for any transactions made through your account.{"\n"}
                        - All transactions are final and non-refundable unless required by law.{"\n"}
                        - Fees, if applicable, will be disclosed before the transaction.
                    </Text>
                    <Text style={styles.content}>
                        {"\n"}**5. Privacy & Security**{"\n"}
                        Your use of the App is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
                    </Text>
                    <Text style={styles.content}>
                        {"\n"}**6. Intellectual Property**{"\n"}
                        The App and its original content, features, and functionality are owned by Chain UPI and protected under intellectual property laws.
                    </Text>
                    <Text style={styles.content}>
                        {"\n"}**7. Contact Us**{"\n"}
                        If you have any questions about these Terms, please contact us at **support@chainupi.com**.
                    </Text>
                </ScrollView>
                <Button 
                    mode="contained" 
                    onPress={handleGoBack} 
                    style={styles.button} 
                    contentStyle={{ paddingVertical: 8 }} // Increased touch area
                >
                    Back to Profile
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
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 16,
        textAlign: "center",
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    content: {
        fontSize: 14,
        lineHeight: 22,
        color: "#E0E0E0",
        marginBottom: 12,
    },
    button: {
        marginTop: 16,
        borderRadius: 8,
    },
})

export default TermsAndConditionsPage
