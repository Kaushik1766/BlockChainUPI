import { Text } from 'react-native';
import { Redirect, Stack, Tabs } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
import { useEffect } from 'react';

export default function AppLayout() {
    const { user, isLoading } = useAuth0();
    useEffect(() => {
        console.log(user);
    }, [user]);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!user) {
        return <Redirect href="/Welcome" />;
    }

    return <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
            }}
        />
        <Tabs.Screen
            name="wallet"
            options={{
                title: 'Wallet',
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
            }}
        />
    </Tabs>;
}
