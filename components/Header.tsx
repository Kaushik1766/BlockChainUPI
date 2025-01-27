import { router } from 'expo-router';
import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({ title }: { title: string }) => {

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => router.back()} color='white' />
            <Appbar.Content title={title} color='white' />
        </Appbar.Header>
    );
};

export default Header;