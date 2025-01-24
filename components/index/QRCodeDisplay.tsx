import { Link } from "expo-router"
import type React from "react"
import { View, StyleSheet } from "react-native"
import { Text, useTheme } from "react-native-paper"
import QRCode from "react-native-qrcode-svg"

interface QRCodeDisplayProps {
    upiId: string
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ upiId }) => {
    const theme = useTheme()
    return (
        <View style={styles.container}>
            <View style={{ borderRadius: 10, borderColor: theme.colors.primary, borderWidth: 10, padding: 4 }}>
                <QRCode value={upiId} size={200} color="black" backgroundColor="white" ecl="H" />
            </View>
            <Link href={'/(app)/scan'} style={{
                backgroundColor: theme.colors.primary,
                fontSize: 16,
                marginTop: 8,
                padding: 8,
                paddingHorizontal: 16,
                color: "white",
                borderRadius: 8,
            }}>Scan to pay</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 24,
    }
})

export default QRCodeDisplay
