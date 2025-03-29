import { useLocalSearchParams } from "expo-router"
import type React from "react"
import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import { Text, TextInput, Button, HelperText, Menu, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

interface PayPageProps {
    receiverUpiId: string
}

const PayPage: React.FC = () => {
    const [amount, setAmount] = useState("")
    const [selectedChain, setSelectedChain] = useState("")
    const [error, setError] = useState("")
    const params = useLocalSearchParams();
    const receiverUpiId = params.upiId
    const theme = useTheme()

    const chains = [
        {
            label: "Ethereum (eth)",
            value: "eth"
        },
        {
            label: "Tron (trx)",
            value: "trx"
        },
    ]

    const validateAmount = (value: string) => {
        const numValue = Number.parseFloat(value)
        if (isNaN(numValue) || numValue <= 0) {
            setError("Please enter a valid amount")
            return false
        }
        setError("")
        return true
    }

    const handlePay = () => {
        if (!validateAmount(amount)) return
        if (!selectedChain) {
            setError("Please select a chain")
            return
        }
        console.log(`Paying ${amount} to ${receiverUpiId} on ${selectedChain} chain`)
        alert(`Payment of ${amount} initiated to ${receiverUpiId} on ${selectedChain} chain`)
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={styles.title}>Confirm Payment</Text>
                    <Text style={styles.receiverInfo}>Paying to: {receiverUpiId}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                    }}>
                        <TextInput
                            label="Amount"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            style={styles.input}
                            mode="outlined"
                            textColor="white"
                        />
                        <Dropdown
                            placeholder="Select Chain"
                            value={selectedChain}
                            selectedTextStyle={{ color: 'white' }}
                            data={chains}
                            placeholderStyle={{ color: "#BDBDBD" }}
                            style={{
                                width: '50%',
                                padding: 10,
                                backgroundColor: "#1E1E1E",
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: theme.colors.outline
                            }}

                            onChange={(item: any) => {
                                setSelectedChain(item.value)
                            }}
                            labelField={"label"} valueField={"value"}
                        />
                    </View>

                    <HelperText type="error" visible={!!error}>
                        {error}
                    </HelperText>

                    <Button mode="contained" onPress={handlePay} style={[styles.payButton, (!amount || !selectedChain)&&{backgroundColor:"#1E1E1E"}]} disabled={!amount || !selectedChain}>
                        <Text>
                            Pay
                        </Text>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#121212",
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 24,
        textAlign: "left",
    },
    receiverInfo: {
        fontSize: 16,
        color: "#BDBDBD",
        marginBottom: 24,
        textAlign: "left",
    },
    input: {
        color: 'white',
        marginBottom: 16,
        backgroundColor: "#1E1E1E",
        width: '30%'
    },
    dropdownButton: {
        marginBottom: 16,
        backgroundColor: "#1E1E1E",
        borderRadius: 8
    },
    payButton: {
        marginTop: 16,
    },
})

export default PayPage

