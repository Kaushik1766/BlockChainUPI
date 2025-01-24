import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth0 } from 'react-native-auth0';
import { Button } from 'react-native-paper';
import { Redirect, router } from 'expo-router';

export default function login() {
    const { authorize, isLoading, user } = useAuth0();
    // if (isLoading) {
    //     return <Text>Loading...</Text>
    // }
    // if (user) {
    //     return <Redirect href="/(app)/index" />
    // }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>login</Text>
            <Button onPress={async () => {
                try {
                    await authorize()
                    router.replace('/');
                }
                catch (e) {
                    console.log(e)
                }
            }}>Login</Button>
        </View>
    )
}

const styles = StyleSheet.create({

})