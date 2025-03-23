import type React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, useTheme} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Wallet } from "@/functions/walletFunctions";


interface Props{
    "chain":string,
    "wallets":Wallet[]
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
                <View key={walletIndex} style={[styles.walletCard, walletIndex === 0 && { borderColor: "#6200ee", borderWidth: 2 }]}>
                    <Text style={styles.walletAddress}>{wallet.address}</Text>
                    <Text style={styles.walletBalance}>{wallet.balance + " " + chainDetails[chain][1]}</Text>
                </View>
            ))}
            <TouchableOpacity style={styles.addWalletButton}>
                <AntDesign name="pluscircleo" size={20} color={theme.colors.primary} />
                <Text style={styles.addWalletText}>Add Wallet</Text>
            </TouchableOpacity>
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

});
export default WalletDisplay