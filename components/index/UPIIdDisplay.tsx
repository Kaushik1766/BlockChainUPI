import React from "react"
import { View, StyleSheet } from "react-native"
import { Button, Portal, Text, useTheme } from "react-native-paper"
import AntDesign from '@expo/vector-icons/AntDesign';
import QRCodeDisplay from "./QRCodeDisplay";
import Modal from "react-native-modal";

interface UPIIdDisplayProps {
    upiId: string
}

const UPIIdDisplay: React.FC<UPIIdDisplayProps> = ({ upiId }) => {
    const [visible, setVisible] = React.useState(false);
    const theme = useTheme()

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
            
        <View style={styles.container}>
            <Text style={styles.label}>Your UPI ID</Text>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Text style={styles.upiId}>{upiId}</Text>
                <AntDesign name="qrcode" size={24} color="#181A20" onPress={showModal} />
            </View>
            <Modal
                isVisible={visible}
                onDismiss={hideModal}
                animationIn={'slideInUp'}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0
                }}
                onBackdropPress={() => setVisible(false)}
                onSwipeComplete={() => setVisible(false)}
                swipeDirection="down"
                swipeThreshold={50}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
                propagateSwipe={true}
            >
                <View style={{
                    backgroundColor: theme.colors.surface,
                    height: '50%',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <QRCodeDisplay upiId={upiId} />
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FCD34B",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "#181A20",
        marginBottom: 4,
    },
    upiId: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#181A20",
    },
})

export default UPIIdDisplay

