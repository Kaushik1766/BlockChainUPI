import { Text } from 'react-native';
import { Redirect, router, Stack, Tabs } from 'expo-router';
// import { useAuth0 } from 'react-native-auth0';
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { validateUser } from '@/functions/authFunctions';

export default function AppLayout() {
    const [authenticated, setAuthenticated] = useState(false);

    const validation = async () => {
        try {
            await validateUser()
            setAuthenticated(true)
        }
        catch (err) {
            router.replace("/Welcome")
        }
    }

    useEffect(() => { if (!authenticated){validation()}}, [authenticated])


    return <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: "#703be7", }, tabBarActiveTintColor: "#FCD34B", tabBarInactiveTintColor: "#ccbaf7" }} initialRouteName='home' >
        <Tabs.Screen
            name="walletsPage"
            options={{
                // title: 'Wallets',
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => <Entypo name="wallet" size={30} color={color} />,
            }}
        />
        <Tabs.Screen
            name="home"
            options={{
                // title: 'Home',
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => <AntDesign name="home" size={30} color={color} />,
            }}
        />
        <Tabs.Screen
            name="index"
            options={{
                href: null
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                // title: 'Profile',
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => <AntDesign name="user" size={30} color={color} />,
            }}
        />
    </Tabs>;
}
