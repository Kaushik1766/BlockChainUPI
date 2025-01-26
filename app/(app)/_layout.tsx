import { Text } from 'react-native';
import { Redirect, Stack, Tabs } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
import { useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
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
            name="wallet"
            options={{
                title: 'Wallet',
                tabBarIcon: ({ color }) => <Entypo name="wallet" size={24} color={color} />,
            }}
        />
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
            }}
        />
        <Tabs.Screen
            name="scan"
            options={{
                href: null
            }}
        />
        <Tabs.Screen
            name='transactions'
            options={{
                href: null,
                headerShown: false
            }}
        />
    </Tabs>;
}
