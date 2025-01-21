import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth0 } from 'react-native-auth0'
import { Button } from 'react-native-paper'

export default function index() {
    const { authorize, user, isLoading, clearSession, } = useAuth0()
    useEffect(() => {
        if (user) {
            console.log(user)
        }
    }, [user])
    async function Logout() {
        try {
            await clearSession()
        }
        catch (e) {
            console.log(e)
        }

    }
    return (
        <View>
            <Button onPress={async () => {
                try {
                    await authorize()
                }
                catch (e) {
                    console.log(e)
                }
            }} mode='contained'>Login</Button>
            <Button onPress={Logout} mode='contained'>Logout</Button>
            <Text>index</Text>
        </View>
    )
}

const styles = StyleSheet.create({})