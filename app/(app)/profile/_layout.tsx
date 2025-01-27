import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
    return (
        <Stack screenOptions={{ headerShown: false }} initialRouteName='index'>
            <Stack.Screen name='terms' />
            <Stack.Screen name='index' />
            <Stack.Screen name='preferences' />
        </Stack>
    )
}

const styles = StyleSheet.create({})