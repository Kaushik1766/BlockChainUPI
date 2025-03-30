import { Stack } from 'expo-router';

export default function HomeLayout() {
    return <Stack screenOptions={{ headerShown: false }} initialRouteName='index'>
        <Stack.Screen name='payUpi' />
        <Stack.Screen name='index' />
        <Stack.Screen name='scan' />
        <Stack.Screen name='pay' />
    </Stack>;
}