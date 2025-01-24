import type React from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import QRCode from "react-native-qrcode-svg"

interface QRCodeDisplayProps {
    upiId: string
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ upiId }) => {
    return (
        <View style={styles.container}>
            <QRCode value={upiId} size={200} color="white" backgroundColor="transparent" />
            <Text style={styles.label}>Scan to pay</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 24,
    },
    label: {
        marginTop: 8,
        fontSize: 14,
        color: "#BDBDBD",
    },
})

export default QRCodeDisplay

