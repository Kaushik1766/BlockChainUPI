import type React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import UPIIdDisplay from "../../components/index/UPIIdDisplay"
import QRCodeDisplay from "../../components/index/QRCodeDisplay"
import ScanPayButton from "../../components/index/ScanPayButton"
import TransactionList from "../../components/index/TransactionList"
import { useAuth0 } from "react-native-auth0"

const HomePage: React.FC = () => {
    const { user } = useAuth0()
    const upiId = `${user?.email?.substring(0, user.email.indexOf('@'))}@chainupi`
    const transactions = [
        { id: "1", amount: 500, recipient: "John Doe", date: "2023-05-01" },
        { id: "2", amount: 1000, recipient: "Jane Smith", date: "2023-04-30" },
        { id: "3", amount: 750, recipient: "Bob Johnson", date: "2023-04-29" },
    ]

    const handleScanPay = () => {
        // Implement scan and pay functionality
        console.log("Scan and Pay pressed")
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <UPIIdDisplay upiId={upiId} />
                    <QRCodeDisplay upiId={upiId} />
                    {/* <ScanPayButton onPress={handleScanPay} /> */}
                    <TransactionList transactions={transactions} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#121212",
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
    },
})

export default HomePage

