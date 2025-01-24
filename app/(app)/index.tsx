import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth0 } from 'react-native-auth0';
import { Button } from 'react-native-paper';

export default function index() {
    const { clearSession, isLoading } = useAuth0();
    return (
        <View>
            <Text>index</Text>
            <Button onPress={async () => {
                try {
                    await clearSession()
                }
                catch (e) {
                    console.log(e)
                }
            }}>Logout</Button>
        </View>
    )
}

const styles = StyleSheet.create({})