import type React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import UPIIdDisplay from "../../components/index/UPIIdDisplay"
import QRCodeDisplay from "../../components/index/QRCodeDisplay"
import { useAuth0 } from "react-native-auth0"
import LottieView from "lottie-react-native"

const HomePage: React.FC = () => {
    const { user } = useAuth0()
    const upiId = `${user?.email?.substring(0, user.email.indexOf('@'))}@chainupi`


    const handleScanPay = () => {
        // Implement scan and pay functionality
        console.log("Scan and Pay pressed")
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.scrollView}>
                <View style={styles.container}>
                    <UPIIdDisplay upiId={upiId} />
                    {/* <LottieView
                        source={require("../../assets/animations/upiAnimation.json")}
                        autoPlay
                        loop
                        style={{
                            width: 200,
                            height: 200,
                        }} /> */}
                    {/* <QRCodeDisplay upiId={upiId} /> */}
                    {/* <ScanPayButton onPress={handleScanPay} /> */}
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
    },
})

export default HomePage

