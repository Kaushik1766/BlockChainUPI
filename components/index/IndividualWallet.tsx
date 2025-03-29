import { getEthWalletBalance, getTrxWalletBalance, Wallet } from "@/functions/walletFunctions"
import { View , StyleSheet, TouchableOpacity} from "react-native"
import { Text, useTheme} from "react-native-paper";
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from "react";


interface Props{
    wallet: Wallet,
    walletIndex: number
}

const IndividualWallet = ({wallet, walletIndex}: Props)=>{
    const [balanceVisible, setBalanceVisible] = useState(false)
    const [balance, setBalance] = useState<number>(-1)


    const toggleVisibility = async ()=>{
        if (!balanceVisible){
            if (wallet.chain === "eth"){
                let result = await getEthWalletBalance(wallet.address)
                setBalance(result)
            }
            else if (wallet.chain === "trx"){
                let result = await getTrxWalletBalance(wallet.address)
                setBalance(result)
            }
        }
    }

    useEffect(()=>{
        if (balance > -1){
            setBalanceVisible(true)
        }
    }, [balance])

    return (
        <View key={wallet.address} style={[styles.walletCard, walletIndex === 0 && { borderColor: "#6200ee", borderWidth: 2 , position:"relative"}]}>
            {walletIndex === 0 && <Text style={styles.primaryText} >Primary</Text>}
            <Text style={styles.walletAddress}>{wallet.address}</Text>
            <TouchableOpacity style={styles.balanceContainer} onPress={() => toggleVisibility()}>
                <Feather name={(balanceVisible) ? "eye" : "eye-off"} size={16} color="white" />
                {balanceVisible?
                <Text> {balance + " " + wallet.chain}</Text>
                :<Text> Get Balance </Text>}
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({

    walletCard: {
        backgroundColor: "#2C2C2C",
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    walletAddress: {
        fontSize: 14,
        color: "#FFFFFF",
    },
    walletBalance: {
        fontSize: 14,
        color: "#A0A0A0",
    },
    primaryText:{
        fontSize: 12,
        color: "#6200ee",
        position:"absolute",
        top:-15,
        right:10,
        backgroundColor: "#A0A0A0",
        borderColor:"#6200ee",
        borderWidth:2,
        borderRadius:10,
        padding:5,
        fontWeight:"bold"
    },
    eyeIcon: {
        marginLeft: 4,
    },
    balanceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
});
export default IndividualWallet