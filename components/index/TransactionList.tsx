import type React from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { Text, List, Divider } from "react-native-paper"

interface Transaction {
    id: string
    amount: number
    recipient: string
    date: string
}

interface TransactionListProps {
    transactions: Transaction[]
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    // const renderTransaction = ({ item }: { item: Transaction }) => (
    //     <List.Item
    //         title={item.recipient}
    //         description={item.date}
    //         right={() => <Text style={styles.amount}>₹{item.amount.toFixed(2)}</Text>}
    //     />
    // )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Transactions</Text>
            {/* <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <Divider />}
            /> */}
            {
                transactions.map((item, idx) => <List.Item key={idx}
                    title={item.recipient}
                    description={item.date}
                    right={() => <Text style={styles.amount}>₹{item.amount.toFixed(2)}</Text>}
                />)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#FFFFFF",
    },
    amount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4CAF50",
    },
})

export default TransactionList

