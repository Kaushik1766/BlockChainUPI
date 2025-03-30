import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TransactionList from '@/components/index/TransactionList'
import { ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { useLocalSearchParams } from 'expo-router'
import { getEthWalletTransactions, getTrxWalletTransactions } from '@/functions/walletFunctions'


interface Transaction {
    id: string,
    amount: number,
    recipient: string,
    date: string,
    chain: string,
    send: boolean
}

export default function transactions() {
    const { address, chain } = useLocalSearchParams();

    const [loading, setLoading] = useState(true)
    const [transactionData, setTransactionData] = useState<Transaction[] | undefined>(undefined)


    const getTransactions = async () => {
        if (chain === "eth") {
            //@ts-ignore
            let result = await getEthWalletTransactions(address)
            let tData = result.map((el: any) => {
                return {
                    "id": el.hash,
                    "amount": parseFloat((el.value * 1e-18).toFixed(4)),
                    //@ts-ignore
                    "recipient": el.from.toUpperCase() == address.toUpperCase() ? el.to : el.from,
                    "date": new Date(el.timeStamp * 1000).toISOString().split('T')[0],
                    "chain": "eth",
                    //@ts-ignore
                    "send": el.from.toUpperCase() == address.toUpperCase() ? true : false
                }
            })
            setTransactionData(tData)
            return;
        }
        else if (chain === "trx") {
            try {
                //@ts-ignore
                let result = await getTrxWalletTransactions(address)
                let tData = result.map((el: any) => {
                    return {
                        "id": el.txID,
                        "amount": parseFloat((el.raw_data.contract[0].parameter.value.amount * 1e-6).toFixed(4)),
                        //@ts-ignore
                        "recipient": el.raw_data.contract[0].parameter.value.owner_address.toUpperCase() == address.toUpperCase() ? el.raw_data.contract[0].parameter.value.to_address : el.raw_data.contract[0].parameter.value.owner_address,
                        "date": new Date(el.raw_data.timestamp).toISOString().split('T')[0],
                        "chain": "trx",
                        //@ts-ignore
                        "send": el.raw_data.contract[0].parameter.value.owner_address.toUpperCase() == address.toUpperCase() ? true : false
                    }
                })
                setTransactionData(tData)
                return;
            }
            catch (err) {
                console.log(err)
            }
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
                    <TransactionList
                        //@ts-ignore
                        transactions={transactionData} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({})