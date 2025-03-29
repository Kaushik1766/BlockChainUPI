import type React from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, TouchableNativeFeedback } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import UPIIdDisplay from "@/components/index/UPIIdDisplay"
// import QRCodeDisplay from "../../../components/index/QRCodeDisplay"
import LottieView from "lottie-react-native"
import { Link, router } from "expo-router"
import { Text, useTheme } from "react-native-paper"
import { Button } from "react-native-paper"
import { AntDesign } from "@expo/vector-icons"
import LinkButton from "@/components/index/LinkButton"
import { useUserStore } from "@/app/UserContext"

const HomePage: React.FC = () => {
    const user = useUserStore((state)=>(state))
    const upiId = `${user?.Email?.substring(0, user.Email.indexOf('@'))}@chainupi`
    const theme = useTheme()

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
                    <LinkButton link="/(app)/home/scan" title="Scan and Pay" />
                    <LinkButton link="/(app)/home/payUpi" title="Pay with UPI ID" />
                    <LinkButton link="/(app)/home/payNFC" title="Contactless Payment" />
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

