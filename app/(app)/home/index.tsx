import type React from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, TouchableNativeFeedback } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import UPIIdDisplay from "@/components/index/UPIIdDisplay"
// import QRCodeDisplay from "../../../components/index/QRCodeDisplay"
import { useAuth0 } from "react-native-auth0"
import LottieView from "lottie-react-native"
import { Link, router } from "expo-router"
import { Text, useTheme } from "react-native-paper"
import { Button } from "react-native-paper"
import { AntDesign } from "@expo/vector-icons"
import LinkButton from "@/components/index/LinkButton"

const HomePage: React.FC = () => {
    const { user } = useAuth0()
    const upiId = `${user?.email?.substring(0, user.email.indexOf('@'))}@chainupi`
    const theme = useTheme()

    const handleScanPay = () => {
        // Implement scan and pay functionality
        console.log("Scan and Pay pressed")
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.scrollView}>
                <View style={styles.container}>
                    <UPIIdDisplay upiId={upiId} />
                    <LottieView
                        source={require("../../../assets/animations/upiAnimation.json")}
                        autoPlay
                        loop
                        style={{
                            width: 300,
                            height: 300,
                            marginHorizontal: 'auto',
                            borderWidth: 10,
                            borderColor: 'white'
                        }} />

                    {/* <QRCodeDisplay upiId={upiId} /> */}
                    {/* <ScanPayButton onPress={handleScanPay} /> */}
                    {/* <Link href={'/(app)/payUpi'} /> */}
                    <LinkButton link="/(app)/home/transactions" title="Transactions" />
                    <LinkButton link="/(app)/home/scan" title="Scan and Pay" />
                    <LinkButton link="/(app)/home/payUpi" title="Pay with UPI ID" />
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
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        alignContent: 'center',
    },
})

export default HomePage

