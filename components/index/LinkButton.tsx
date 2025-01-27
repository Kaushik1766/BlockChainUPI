import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { ExternalPathString, Link, RelativePathString, router } from 'expo-router'
import { useTheme } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'

export default function LinkButton({ link, title }: { link: string, title: string }) {
    const theme = useTheme()
    return (
        // <Link href={link} asChild>
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
                'rgba(255, 255, 255, 0.3)',
                false
            )}
            style={{
                borderRadius: 8,
                overflow: 'hidden'
            }}
            useForeground={true}
            onPress={() => router.navigate(link)}
        >
            <View
                style={{
                    backgroundColor: "#1E1E1E",
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 16,
                    flexDirection: 'row'
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                >
                    {title}
                </Text>
                <AntDesign name="right" size={24} color="white" style={{ marginLeft: 'auto' }} />
            </View>
        </TouchableNativeFeedback>
        // </Link>
    )
}

const styles = StyleSheet.create({})