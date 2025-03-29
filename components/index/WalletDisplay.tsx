import type React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, useTheme} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Wallet } from "@/functions/walletFunctions";


interface Props{
    "chain":string,
    "wallets":Wallet[],
}

const WalletDisplay = ({chain, wallets}:Props) => {
    const theme = useTheme();
    const chainDetails : Record<string, string[]>= {
        "eth":["Ethereum", "eth"],
        "trx":["Tron", "trx"]
    }
    
    return (
        <View style={styles.chainCard} key={chain}>
            <Text style={styles.chainName}>{chainDetails[chain][0]}</Text>
            {wallets.map((wallet, walletIndex) => (
                <View key={wallet.address} style={[styles.walletCard, walletIndex === 0 && { borderColor: "#6200ee", borderWidth: 2 , position:"relative"}]}>
                    {walletIndex === 0 && <Text style={styles.primaryText} >Primary</Text>}
                    <Text style={styles.walletAddress}>{wallet.address}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    chainCard: {
        backgroundColor: "#1E1E1E",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    chainName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 12,
    },
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
    walletChain: {
        fontSize: 14,
        color: "#A0A0A0",
        fontStyle: "italic",
    },
    addWalletButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    addWalletText: {
        fontSize: 14,
        color: "#6200ee",
        marginLeft: 8,
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
    }
});
export default WalletDisplay