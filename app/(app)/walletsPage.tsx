import type React from "react";
import { View, StyleSheet, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme } from "react-native-paper";
import { useUserStore } from "../UserContext";
import { useEffect, useState } from "react";
import fetchWallets, { Wallet } from "@/functions/walletFunctions";
import WalletDisplay from "@/components/index/WalletDisplay";



const WalletsPage: React.FC = () => {
    const user = useUserStore((state)=>(state))
    const theme = useTheme();
    const [chainWallets, setChainWallets] = useState<Record<string, Wallet[]>>();

    
    useEffect(()=>{fetchWallets(setChainWallets)}, [])
    useEffect(()=>{console.log(chainWallets)}, [chainWallets])

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Wallets</Text>
                <View style={styles.container}>
                    {/* Primary Wallet Section */}
                    <View style={styles.walletCard}>
                        <Text style={styles.upiAddress}>{`${user?.Email?.substring(0, user.Email.indexOf('@'))}@chainupi`}</Text>
                    </View>


                    {/* Supported Chains Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Supported Chains</Text>
                        {chainWallets && Object.keys(chainWallets).map((el) => <WalletDisplay chain={el} wallets={chainWallets[el]}></WalletDisplay>)}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

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
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 12,
    },
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
    upiAddress: {
        fontSize: 18,
        color: "#FFFFFF",
        alignSelf:"center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 15,
        textAlign: "center",
        marginTop: 15
    }
});

export default WalletsPage;