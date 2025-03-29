import type React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Button, Divider, List, TouchableRipple } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { router } from "expo-router"
import { useUserStore } from "@/app/UserContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import VerifyPassword from "@/components/index/VerifyPassword"



const ProfilePage: React.FC = () => {
    // const navigation = useNavigation()
    const user = useUserStore((state)=>(state))
    const [verifyPasswordVisibile, setVerifyPasswordVisible] = useState<boolean>(false);

    async function handleLogout() {
        try {
            useUserStore.setState(undefined)
            await AsyncStorage.removeItem('UPI-login-token')
            let res = await AsyncStorage.getItem('UPI-login-token')
            console.log(res + "logout")
            router.navigate("/Welcome")
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.title}>Profile</Text>

                    <List.Section>
                        <List.Item titleStyle={{ color: 'white' }} title="Name" description={user?.Name} left={(props) => <List.Icon {...props} icon="account" color="white" />} />
                        <List.Item titleStyle={{ color: 'white' }} title="UPI ID" description={`${user?.Email?.substring(0, user.Email.indexOf('@'))}@chainupi`} left={(props) => <List.Icon {...props} icon="qrcode" color="white" />} />
                        <List.Item titleStyle={{ color: 'white' }} title="Email" description={user?.Email} left={(props) => <List.Icon {...props} icon="email" color="white" />} />
                        <TouchableRipple onPress={() => router.push('/(app)/profile/preferences')}>
                            <List.Item
                                titleStyle={{ color: "white" }}
                                title="Preferences"
                                left={(props) => <List.Icon {...props} icon="cog" color="white" />}
                                right={(props) => <List.Icon {...props} icon="chevron-right" color="white" />}
                            />
                        </TouchableRipple>
                        <TouchableRipple onPress={() => router.push('/(app)/profile/terms')}>
                            <List.Item
                                titleStyle={{ color: "white" }}
                                title="Terms and Conditions"
                                left={(props) => <List.Icon {...props} icon="file-document" color="white" />}
                                right={(props) => <List.Icon {...props} icon="chevron-right" color="white" />}
                            />
                        </TouchableRipple>
                        <TouchableRipple onPress={() => setVerifyPasswordVisible(true)}>
                            <List.Item
                                titleStyle={{ color: "red" }}
                                title="Change Password"
                                
                                right={(props) => <List.Icon {...props} icon="chevron-right" color="white" />}
                            />
                        </TouchableRipple>
                    </List.Section>
                    <VerifyPassword visible={verifyPasswordVisibile} setVisible={setVerifyPasswordVisible}></VerifyPassword>
                </ScrollView>

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
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#121212",
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "space-between",
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 24,
        textAlign: "center",
    },
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

export default ProfilePage

