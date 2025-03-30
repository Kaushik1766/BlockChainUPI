import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TransactionList from '@/components/index/TransactionList'
import { ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { useLocalSearchParams } from 'expo-router'
import { getEthWalletTransactions } from '@/functions/walletFunctions'


interface Transaction {
    id: string,
    amount: number,
    recipient: string,
    date: string,
    chain: string,
}

export default function transactions() {
    const { address, chain } = useLocalSearchParams();

    const [loading, setLoading] = useState(true)
    const [transactionData, setTransactionData] = useState<Transaction[] | undefined>(undefined)


    const getTransactions = async () => {
        if (chain === "eth") {
            let result = await getEthWalletTransactions(address)
            let tData = result.map((el: any) => {
                return {
                    "id": el.hash,
                    "amount": parseFloat((el.value * 1e-18).toFixed(4)),
                    "recipient": el.from,
                    "date": new Date(el.timeStamp * 1000).toISOString().split('T')[0],
                    "chain": "eth"
                }
            })
            setTransactionData(tData)
            return;
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])

    useEffect(() => {
        if (!!transactionData) {
            setLoading(false)
        }
    }, [transactionData])

    const transactions = [
        { id: "1", amount: 500, recipient: "John Doe", date: "2023-05-01", chain: "ETH", logo: "ETH" },
        { id: "2", amount: 1000, recipient: "Jane Smith", date: "2023-05-01", chain: "MATIC", logo: "MATIC" },
        { id: "3", amount: 750, recipient: "Bob Johnson", date: "2023-04-29", chain: "ETH", logo: "ETH" },
        { id: "1", amount: 500, recipient: "John Doe", date: "2023-05-01", chain: "MATIC", logo: "MATIC" },
        { id: "2", amount: 1000, recipient: "Jane Smith", date: "2023-04-30", chain: "ETH", logo: "ETH" },
        { id: "3", amount: 750, recipient: "Bob Johnson", date: "2023-04-29", chain: "MATIC", logo: "MATIC" },
        { id: "1", amount: 500, recipient: "John Doe", date: "2023-05-01", chain: "ETH", logo: "ETH" },
        { id: "2", amount: 1000, recipient: "Jane Smith", date: "2023-04-30", chain: "MATIC", logo: "MATIC" },
        { id: "3", amount: 750, recipient: "Bob Johnson", date: "2023-04-29", chain: "ETH", logo: "ETH" },
        { id: "1", amount: 500, recipient: "John Doe", date: "2023-05-01", chain: "MATIC", logo: "MATIC" },
        { id: "2", amount: 1000, recipient: "Jane Smith", date: "2023-04-30", chain: "ETH", logo: "ETH" },
        { id: "3", amount: 750, recipient: "Bob Johnson", date: "2023-04-29", chain: "MATIC", logo: "MATIC" },
        { id: "1", amount: 500, recipient: "John Doe", date: "2023-05-01", chain: "ETH", logo: "ETH" },
        { id: "2", amount: 1000, recipient: "Jane Smith", date: "2023-04-30", chain: "MATIC", logo: "MATIC" },
        { id: "3", amount: 750, recipient: "Bob Johnson", date: "2023-04-29", chain: "ETH", logo: "ETH" },
        { id: "1", amount: 500, recipient: "John Doe", date: "2023-05-01", chain: "MATIC", logo: "MATIC" },
        { id: "2", amount: 1000, recipient: "Jane Smith", date: "2023-04-30", chain: "ETH", logo: "ETH" },
        { id: "3", amount: 750, recipient: "Bob Johnson", date: "2023-04-29", chain: "MATIC", logo: "MATIC" },
    ]

    if (loading) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={[{ margin: "auto" }]}>
                    <ActivityIndicator size="large" color="#FCD34B" />
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }

    return (
        <>
            <Header title="Transactions" />
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: "#181A20",
                }}>
                    <TransactionList transactions={transactionData} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({})