import type React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth0 } from "react-native-auth0";
import { Text, useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import LinkButton from "@/components/index/LinkButton";
import { useUserStore } from "../UserContext";

const WalletsPage: React.FC = () => {
    const user = useUserStore((state)=>(state))
    const theme = useTheme();

    const primaryWallet = {
        address: `${user?.Email?.substring(0, user.Email.indexOf('@'))}@chainupi`,
        balance: "1000 ETH",
        chain: "Ethereum",
    };

    const chains = [
        {
            name: "Ethereum",
            wallets: [
                { address: "0x1234...abcd", balance: "1.23 ETH" },
                { address: "0x5678...efgh", balance: "0.45 ETH" },
            ],
        },
        {
            name: "Polygon",
            wallets: [
                { address: "0xabcd...1234", balance: "500 MATIC" },
            ],
        },
        {
            name: "Binance Smart Chain",
            wallets: [
                { address: "0xefgh...5678", balance: "2.5 BNB" },
            ],
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {/* Primary Wallet Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Primary Wallet</Text>
                        <View style={styles.walletCard}>
                            <Text style={styles.walletAddress}>{primaryWallet.address}</Text>
                            <Text style={styles.walletBalance}>Balance: {primaryWallet.balance}</Text>
                            <Text style={styles.walletChain}>Chain: {primaryWallet.chain}</Text>
                        </View>
                    </View>

                    {/* Supported Chains Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Supported Chains</Text>
                        {chains.map((chain, index) => (
                            <View key={index} style={styles.chainCard}>
                                <Text style={styles.chainName}>{chain.name}</Text>
                                {chain.wallets.map((wallet, walletIndex) => (
                                    <View key={walletIndex} style={styles.walletCard}>
                                        <Text style={styles.walletAddress}>{wallet.address}</Text>
                                        <Text style={styles.walletBalance}>{wallet.balance}</Text>
                                    </View>
                                ))}
                                <TouchableOpacity style={styles.addWalletButton}>
                                    <AntDesign name="pluscircleo" size={20} color={theme.colors.primary} />
                                    <Text style={styles.addWalletText}>Add Wallet</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
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
});

export default WalletsPage;