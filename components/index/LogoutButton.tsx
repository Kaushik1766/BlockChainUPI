import { Button } from "react-native-paper"
import {StyleSheet} from "react-native"
import { logout } from "@/functions/authFunctions"
import { router } from "expo-router"



const LogoutButton = ()=>{
    async function handleLogout() {
        try {
            await logout()
            router.replace("/Welcome")
        }
        catch (error) {
            console.error(error)
        }
    }

    return(
        <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        contentStyle={styles.logoutButtonContent}
        labelStyle={styles.logoutButtonLabel}
        icon="logout"
        >
            Logout
        </Button>

)}
const styles = StyleSheet.create({
    logoutButton: {
        marginTop: 16,
        backgroundColor: "#FF4136",
        borderRadius: 8,
    },
    logoutButtonContent: {
        height: 48,
    },
    logoutButtonLabel: {
        fontSize: 16,
    },
})

export default LogoutButton