import { StyleSheet, View, TextInput, Keyboard } from "react-native";
import Modal from "react-native-modal";
import { Text, useTheme, Button } from "react-native-paper";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { addWallet } from "@/functions/walletFunctions";
import { checkPassword } from "@/functions/authFunctions";
import { RelativePathString, router } from "expo-router";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    nextRoute: RelativePathString;
}

const VerifyPassword= ({ visible, setVisible, nextRoute}: Props) => {
    const theme = useTheme();
    
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")


    const revertVerifyPassword = () => {
        setVisible(false);
        setPassword("");
        setError('');
    };

    const verify = async () => {
        console.log("password"+ password);
        try {
            let chk = await checkPassword(password)
            if (!chk){
                setError("Incorrect Password")
                return
            }
            revertVerifyPassword()
            router.push(nextRoute)
        }
        catch(err){
            console.log(err)
        }

    };

    return (
        <Modal
            isVisible={visible}
            style={[styles.modal]}
            onBackButtonPress={revertVerifyPassword}
            onBackdropPress={revertVerifyPassword}
        >
            <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
                <Text style={styles.title}>Verify Password</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Current Password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={(value)=>{setPassword(value);setError('')}}
                    secureTextEntry
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Button mode="contained" onPress={verify} style={styles.saveButton}>
                    Verify
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

export default VerifyPassword;