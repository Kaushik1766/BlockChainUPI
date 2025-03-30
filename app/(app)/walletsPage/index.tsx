import type React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, useTheme } from "react-native-paper";
import { useUserStore } from "../../UserContext";
import { useCallback, useEffect, useState } from "react";
import fetchWallets, { getEthWalletTransactions, getTrxWalletTransactions, Wallet } from "@/functions/walletFunctions";
import WalletDisplay from "@/components/index/WalletDisplay";
import AddWallet from "@/components/index/AddWalet";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";




const WalletsPage: React.FC = () => {
    const theme = useTheme();
    const user = useUserStore((state) => (state))
    const [chainWallets, setChainWallets] = useState<Record<string, Wallet[]>>();
    const [addWalletVisible, setAddWalletVisible] = useState(false)
    const [update, setUpdate] = useState(true)


    useEffect(() => {
        fetchWallets(setChainWallets)
        setUpdate(false)
    }, [update])

    // getEthWalletTransactions("0x0fD236f3d36D3D62bbfaf931ae4c7c95dFb3A0Cc").then((el)=>{console.log(el)})
    // getTrxWalletTransactions("TCZVZUQpj1jB1YEoCMmhdAeNbCenkisrTq")

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Wallets</Text>
                <View style={styles.container}>
                    {/* Primary Wallet Section */}
                    <View key={"upi"} style={styles.walletCard}>
                        <Text style={styles.upiAddress}>{`${user?.Email?.substring(0, user.Email.indexOf('@'))}@chainupi`}</Text>
                    </View>


                    {/* Supported Chains Section */}
                    <View key={"wallets"} style={styles.section}>
                        <Text style={styles.sectionTitle}>Supported Chains</Text>
                        {chainWallets && Object.keys(chainWallets).map((el) =>
                            <WalletDisplay
                                chain={el}
                                wallets={chainWallets[el]}
                                key={el} />)}
                    </View>

                    <TouchableOpacity style={styles.addWalletButton} onPress={() => { setAddWalletVisible(true); }}>
                        <AntDesign name="pluscircleo" size={20} color={theme.colors.primary} />
                        <Text style={styles.addWalletText}>Add Wallet</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <AddWallet visible={addWalletVisible} setVisible={setAddWalletVisible} setUpdate={setUpdate}></AddWallet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
    },
    section: {
        marginBottom: 0,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 12,
        paddingTop: 36,
        paddingBottom: 13,
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
        backgroundColor: "#7E61C1",
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
        alignSelf: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginTop: 15
    }
});

export default WalletsPage;