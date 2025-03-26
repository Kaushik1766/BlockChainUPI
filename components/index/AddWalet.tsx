import { StyleSheet, View, TextInput, Keyboard } from "react-native";
import Modal from "react-native-modal";
import { Text, useTheme, Button } from "react-native-paper";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { addWallet } from "@/functions/walletFunctions";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddWallet = ({ visible, setVisible}: Props) => {
    const theme = useTheme();
    
    const [accountAddress, setAccountAddress] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [selectedChain, setSelectedChain] = useState("eth");
    const [error, setError] = useState("")


    const revertAddWallet = () => {
        setVisible(false);
        setAccountAddress("");
        setPrivateKey("")
    };

    const saveWallet = () => {
        console.log("Account Number:", accountAddress);
        console.log("Private Key:", privateKey);
        console.log("Selected Chain:", selectedChain);
        addWallet(accountAddress, privateKey, selectedChain, setError)
        revertAddWallet();
    };

    return (
        <Modal
            isVisible={visible}
            style={[styles.modal]}
            onBackButtonPress={revertAddWallet}
            onBackdropPress={revertAddWallet}
        >
            <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
                <Text style={styles.title}>Add Wallet</Text>

                <Picker
                    selectedValue={selectedChain}
                    onValueChange={(itemValue) => setSelectedChain(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Ethereum (ETH)" value="eth" />
                    <Picker.Item label="Tron (TRX)" value="trx" />
                </Picker>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Account address"
                    placeholderTextColor="#999"
                    value={accountAddress}
                    onChangeText={setAccountAddress}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter Private Key"
                    placeholderTextColor="#999"
                    value={privateKey}
                    onChangeText={setPrivateKey}
                    secureTextEntry
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Button mode="contained" onPress={saveWallet} style={styles.saveButton}>
                    Save Wallet
                </Button>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    container: {
        height: 350,
        borderRadius: 5,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: "#fff",
    },
    picker: {
        width: "100%",
        height: 50,
        marginBottom: 20,
        color: "#fff",
        backgroundColor: "#333",
    },
    saveButton: {
        width: "100%",
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default AddWallet;
