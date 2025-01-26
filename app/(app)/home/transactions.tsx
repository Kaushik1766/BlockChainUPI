import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TransactionList from '@/components/index/TransactionList'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function transactions() {
    const transactions = [
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
        { id: "1", amount: 500, recipient: "John Doe", date: "2023-05-01", chain: "ETH", logo: "ETH" },
        { id: "2", amount: 1000, recipient: "Jane Smith", date: "2023-04-30", chain: "MATIC", logo: "MATIC" },
        { id: "3", amount: 750, recipient: "Bob Johnson", date: "2023-04-29", chain: "ETH", logo: "ETH" },
        { id: "1", amount: 500, recipient: "John Doe", date: "2023-05-01", chain: "MATIC", logo: "MATIC" },
        { id: "2", amount: 1000, recipient: "Jane Smith", date: "2023-04-30", chain: "ETH", logo: "ETH" },
        { id: "3", amount: 750, recipient: "Bob Johnson", date: "2023-04-29", chain: "MATIC", logo: "MATIC" },
    ]
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
                padding: 16,
            }}>Past Transactions</Text>
            <View style={{
                flex: 1,
            }}>
                <TransactionList transactions={transactions} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})