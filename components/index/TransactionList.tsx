import type React from "react"
import { View, StyleSheet, FlatList, SectionList } from "react-native"
import { Text, List, Divider } from "react-native-paper"

// interface Transaction {
//     id: string
//     amount: number
//     recipient: string
//     date: string
// }
interface Transaction {
    id: string;
    amount: number;
    recipient: string;
    date: string;
    chain: string;
    logo: string;
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
            <SectionList
                sections={transactions.reduce((acc, transaction) => {
                    const existingSection = acc.find(section => section.title === transaction.date);
                    if (existingSection) {
                        existingSection.data.push(transaction);
                    } else {
                        acc.push({
                            title: transaction.date,
                            data: [transaction]
                        });
                    }
                    return acc;
                }, [] as Array<{ title: string, data: Transaction[] }>)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <List.Item
                        titleStyle={{ color: '#a6a6a6' }}
                        descriptionStyle={{ color: '#7b7f83' }}
                        title={item.recipient}
                        description={`${item.chain}`}
                        right={() => <Text style={styles.amount}>₹{item.amount.toFixed(2)}</Text>}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <>
                        <List.Subheader style={styles.title}>{title}</List.Subheader>
                        {/* <Divider /> */}
                    </>
                )}
            />
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
        marginTop: 10,
        color: "#FFFFFF",
    },
    amount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4CAF50",
    },
})

export default TransactionList

