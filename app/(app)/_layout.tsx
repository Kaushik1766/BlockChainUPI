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
    const [loading, setLoading] = useState(true);

    const validateUser = async () => {
        try{
        let token = await AsyncStorage.getItem('UPI-login-token')

        if (token){
            let tokenBody = token.split(".")
            console.log(tokenBody[1])
            let bodyObject = JSON.parse(atob(tokenBody[1]))

            //a different checker function needs to be implemented
            let response = await axios.post("https://dev-chain-upi.azurewebsites.net/api/profile/changePassword", {
                "password":"Abcd@12345"
            },{
                headers:{"Authorization":"Bearer "+token}
            })


            useUserStore.setState(bodyObject)
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


    useEffect(()=>{validateUser()}, [])


    return <Tabs screenOptions={{ headerShown: false }} initialRouteName='home'>
        <Tabs.Screen
            name="wallet"
            options={{
                title: 'Wallet',
                tabBarIcon: ({ color }) => <Entypo name="wallet" size={24} color={color} />,
            }}
        />
        <Tabs.Screen
            name="home"
            options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
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
                tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
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
