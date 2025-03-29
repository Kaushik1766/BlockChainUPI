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
import { useUserStore } from "@/app/UserContext"

const HomePage: React.FC = () => {
    const user = useUserStore((state)=>(state))
    const upiId = `${user?.Email?.substring(0, user.Email.indexOf('@'))}@chainupi`

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.scrollView}>
                <View style={styles.container}>
                    <UPIIdDisplay upiId={upiId} />
                    <Text style={{ color: '#FCD34B',textAlign: 'center',fontSize: 24,fontStyle: 'italic',fontFamily: 'sans-serif',textTransform: 'capitalize',marginBottom:10,marginTop:25}}>Welcome,{user?.Name}</Text>

                    <LottieView
                        source={require("../../../assets/animations/upiAnimationNew.json")}
                        autoPlay
                        loop
                        style={{
                            width: 250,
                            height: 250,
                            marginHorizontal: 'auto',
                            borderWidth: 10,
                            borderColor: 'white'
                        }} />

                    {/* <QRCodeDisplay upiId={upiId} /> */}
                    {/* <ScanPayButton onPress={handleScanPay} /> */}
                    {/* <Link href={'/(app)/payUpi'} /> */}
                    {/* <View style={styles.gridContainer}>
                    <View style={styles.gridItem}>
                        <LinkButton link="/(app)/home/transactions" title="Transactions" />
                    </View>
                    <View style={styles.gridItem}>
                        <LinkButton link="/(app)/home/scan" title="Scan and Pay" />
                    </View>
                    <View style={styles.gridItem}>
                        <LinkButton link="/(app)/home/payUpi" title="Pay with UPI ID" />                    
                    </View>
                    <View style={styles.gridItem}>
                        <LinkButton link="/(app)/home/payNFC" title="Contactless Payment" />

                    </View>
                    </View> */}
                     <View style={styles.container1}>
                        {/* <LinkButton link="/(app)/home/transactions" title="Transaction" icon="profile" /> */}
                        <LinkButton link="/(app)/home/scan" title="  Scan & Pay   "  icon="qrcode"/>
                        <LinkButton link="/(app)/home/payUpi" title="Pay with UPI" icon="arrowright"/>
                        <LinkButton link="/(app)/home/payNFC" title="NFC Payment" icon="wallet" />
                    </View>
                 
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    welcomeText:{
        color:"#FCD34B",
        textAlign:"center",
        
    },
    safeArea: {
        flex: 1,
        backgroundColor: "#181A20",
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        alignContent: 'center',
    },
    container1: {
        flex: 1,
        padding: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        // justifyContent: 'center',
      },

})

export default HomePage

