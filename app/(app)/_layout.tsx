import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
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
        return <Redirect href="/login" />;
    }

    return <Stack>
        <Stack.Screen name='index' />
    </Stack>;
}
