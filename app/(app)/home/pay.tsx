import VerifyPassword from "@/components/index/VerifyPassword"
import payToUpi from "@/functions/payFunctionalities"
import fetchWallets, { Wallet } from "@/functions/walletFunctions"
import { router, useLocalSearchParams } from "expo-router"
import type React from "react"
import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import Modal from "react-native-modal"
import { Text, TextInput, Button, HelperText, Menu, useTheme, ActivityIndicator } from "react-native-paper"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

interface PayPageProps {
    receiverUpiId: string
}

const PayPage: React.FC = () => {
    const [amount, setAmount] = useState("")
    const [selectedChain, setSelectedChain] = useState("eth")
    const [selectedAddress, setSelectedAddress] = useState<string| undefined>('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [chainWallets, setChainWallets] = useState<Record<string, Wallet[]>>()
    const [checkUrl, setCheckUrl] = useState<string>()
    const [verifyPasswordVisibile, setVerifyPasswordVisible] = useState(false);
    const [verified, setVerified] = useState(false);
    const params = useLocalSearchParams();
    const receiverUpiId= params.upiId
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

    useEffect(()=>{
        fetchWallets(setChainWallets)
        setLoading(true)
    }, [])

    useEffect(()=>{
        setSelectedAddress((chainWallets && chainWallets[selectedChain][0].address)|| undefined)
    }, [chainWallets, selectedChain])

    useEffect(()=>{
        if (selectedAddress){
            setLoading(false)
        }
    }, [selectedAddress])

    
    const validateAmount = (value: string) => {
        const numValue = Number.parseFloat(value)
        if (isNaN(numValue) || numValue <= 0) {
            setError("Please enter a valid amount")
            return false
        }
        setError("")
        return true
    }
    
    const handlePay = async () => {
        if (!validateAmount(amount)) return
        if (!selectedChain) {
            setError("Please select a chain")
            return
        }
        setVerifyPasswordVisible(true)
    }
    
    const completePay = async () => {
        //@ts-ignore
        let chk = await payToUpi(receiverUpiId, amount, selectedChain, selectedAddress, setCheckUrl)
        if (chk){
            console.log("success")
        }
        else{
            setError("incorrect info")
        }
    }
    
    useEffect(()=>{
        if (verified){
            completePay()
        }
    }, [verified])
    

    const revertShowConf = ()=>{
        setCheckUrl("")
        setAmount("")
        router.replace("/(app)/home")
    }

    if (loading){
        return (
            <SafeAreaProvider>
                <SafeAreaView style={[{margin:"auto"}]}>
                    <ActivityIndicator size="large" color="#6200ee"/>
                </SafeAreaView>
            </SafeAreaProvider>
            )
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
                    <Dropdown
                            placeholder="Select Wallet"
                            value={selectedAddress}
                            selectedTextStyle={{ color: 'white' }}
                            data={
                                //@ts-ignore
                                chainWallets[selectedChain].map((el)=>({label:el.address, value:el.address}))
                            }
                            placeholderStyle={{ color: "#BDBDBD" }}
                            style={{
                                marginTop:20,
                                padding: 10,
                                backgroundColor: "#1E1E1E",
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: theme.colors.outline
                            }}

                            onChange={(item: any) => {
                                setSelectedAddress(item.value)
                            }}
                            labelField={"label"} valueField={"value"}
                        />
                    <HelperText type="error" visible={!!error}>
                        {error}
                    </HelperText>

                    <Button mode="contained" onPress={handlePay} style={[styles.payButton, (!amount || !selectedChain)&&{backgroundColor:"#1E1E1E"}]} disabled={!amount || !selectedChain}>
                        <Text>
                            Pay
                        </Text>
                    </Button>
                    <VerifyPassword visible={verifyPasswordVisibile} setVisible={setVerifyPasswordVisible} setVerified={setVerified}></VerifyPassword>
                </View>
        <Modal
            isVisible={!!checkUrl} 
            animationIn="slideInDown"
            onBackButtonPress={revertShowConf}
            onBackdropPress={revertShowConf}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Payment Initiated</Text>
                    <Text style={styles.modalText}>Amount: {amount}</Text>
                    <Text style={styles.modalText}>Receiver UPI ID: {receiverUpiId}</Text>
                    <Text style={styles.modalText}>Chain: {selectedChain}</Text>
                    <Text style={styles.modalText}>Check Status:</Text>
                    <TouchableOpacity onPress={()=>{
                            //@ts-ignore
                            Linking.openURL(checkUrl).catch(err => console.error("Couldn't load page", err))}}
                    >
                        <Text style={styles.hyperlink}>{checkUrl}</Text>
                    </TouchableOpacity>
                    <Button mode="contained" onPress={revertShowConf} style={styles.closeButton}>Close</Button>
                </View>
            </View>
        </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalContent: {
        backgroundColor: "#1E1E1E",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 10,
    },
    modalText: {
        color: "#BDBDBD",
        marginBottom: 10,
        textAlign: "center",
    },
    closeButton: {
        marginTop: 10,
    },
    hyperlink: {
        color: "#1f93be",
        textDecorationLine: "underline", // Underline like a hyperlink
        fontWeight: "bold", // Optional: Make it stand out
      },
})

export default PayPage

