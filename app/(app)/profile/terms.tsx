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
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.content}>
                        1. Acceptance of Terms By accessing and using the Chain UPI application ("the App"), you agree to be bound
                        by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the App. 2.
                        Description of Service Chain UPI is a blockchain-based Unified Payments Interface (UPI) application that
                        allows users to make secure and fast transactions across multiple blockchain networks. 3. User Accounts 3.1.
                        You must create an account to use the App's services. 3.2. You are responsible for maintaining the
                        confidentiality of your account information. 3.3. You are responsible for all activities that occur under
                        your account. 4. Use of the Service 4.1. You agree to use the App only for lawful purposes and in accordance
                        with these Terms. 4.2. You agree not to use the App: a) In any way that violates any applicable federal,
                        state, local, or international law or regulation. b) To transmit any material that is unlawful, threatening,
                        abusive, harassing, defamatory, vulgar, obscene, pornographic, profane, or otherwise objectionable. c) To
                        impersonate or attempt to impersonate the App, an App employee, another user, or any other person or entity.
                        5. Transactions 5.1. You are solely responsible for any transactions made through your account. 5.2. All
                        transactions are final and non-refundable unless required by law. 5.3. We reserve the right to refuse or
                        cancel any transaction at our sole discretion. 6. Fees 6.1. We may charge fees for certain transactions or
                        services. 6.2. All fees will be clearly disclosed before you complete a transaction. 7. Privacy Your use of
                        the App is also governed by our Privacy Policy, which is incorporated into these Terms by reference. 8.
                        Intellectual Property The App and its original content, features, and functionality are owned by Chain UPI
                        and are protected by international copyright, trademark, patent, trade secret, and other intellectual
                        property or proprietary rights laws. 9. Termination We may terminate or suspend your account and access to
                        the App immediately, without prior notice or liability, for any reason whatsoever, including without
                        limitation if you breach the Terms. 10. Changes to Terms We reserve the right to modify or replace these
                        Terms at any time. It is your responsibility to review these Terms periodically for changes. 11. Contact Us
                        If you have any questions about these Terms, please contact us at support@chainupi.com. By using Chain UPI,
                        you acknowledge that you have read and understood these Terms and agree to be bound by them.
                    </Text>
                </ScrollView>
                <Button mode="contained" onPress={handleGoBack} style={styles.button}>
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
    scrollView: {
        flex: 1,
        marginBottom: 16,
    },
    content: {
        fontSize: 14,
        lineHeight: 20,
        color: "#E0E0E0",
    },
    button: {
        marginTop: 16,
        borderRadius: 8,
    },
})

export default TermsAndConditionsPage

