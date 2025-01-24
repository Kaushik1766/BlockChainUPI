import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth0 } from 'react-native-auth0'
import { Button } from 'react-native-paper'

export default function Profile() {
    const { clearSession } = useAuth0()

    const handleLogout = async () => {
        try {
            await clearSession()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Button
                mode="contained"
                onPress={handleLogout}
                style={styles.logoutButton}
                buttonColor="#ff0000"
            >
                Logout
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    logoutButton: {
        marginTop: 20,
    }
})
