import type React from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "react-native-paper"

interface UPIIdDisplayProps {
    upiId: string
}

const UPIIdDisplay: React.FC<UPIIdDisplayProps> = ({ upiId }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Your UPI ID</Text>
            <Text style={styles.upiId}>{upiId}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1E1E1E",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "#BDBDBD",
        marginBottom: 4,
    },
    upiId: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
})

export default UPIIdDisplay

