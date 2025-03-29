import { Text } from 'react-native';
import { Redirect, router, Stack, Tabs } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { useUserStore } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function AppLayout() {
    const [authenticated, setAuthenticated] = useState(false);

    const validateUser = async () => {
        try{
            let token = await AsyncStorage.getItem('UPI-login-token')

            if (token){
                let tokenBody = token.split(".")
                let bodyObject = JSON.parse(atob(tokenBody[1]))

                let response = await axios.get("https://dev-chain-upi.azurewebsites.net/api/auth/check",{
                    headers:{"Authorization":"Bearer "+token}
                })

                useUserStore.setState(bodyObject)
                setAuthenticated(true)
            }
            else{
                router.replace("/Welcome");
            }
        }
        catch(err){
            console.log(err)
            router.replace("/Welcome")
        }
    }


    useEffect(()=>{validateUser()}, [authenticated])


    return <Tabs screenOptions={{ headerShown: false , tabBarStyle: { backgroundColor: "#FCD34B" }, tabBarActiveTintColor: "#181A20", tabBarInactiveTintColor: "#808184",}} initialRouteName='home' >
        <Tabs.Screen
            name="walletsPage"
            options={{
                title: 'Wallets',
                tabBarIcon: ({ color }) => <Entypo name="wallet" size={30} color={color} />,
            }}
        />
        <Tabs.Screen
            name="home"
            options={{
                title: 'Home',
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
                title: 'Profile',
                tabBarIcon: ({ color }) => <AntDesign name="user" size={30} color={color} />,
            }}
        />
        {/* <Tabs.Screen
            name="scan"
            options={{
                href: null
            }}
        /> */}
        {/* <Tabs.Screen
            name='transactions'
            options={{
                href: null,
                headerShown: false
            }}
        /> */}
        {/* <Tabs.Screen
            name='payUpi'
            options={{
                href: null,
            }}
        /> */}
    </Tabs>;
}
