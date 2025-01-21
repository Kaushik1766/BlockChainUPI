import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth0 } from 'react-native-auth0'
import { Button } from 'react-native-paper'

export default function index() {
    const { authorize } = useAuth0()
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
            <Text>index</Text>
        </View>
    )
}

const styles = StyleSheet.create({})