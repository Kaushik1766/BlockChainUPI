import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen name="wallets" options={{
        title: 'Wallets',
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="qrcode-scan" size={24} color={color} />
      }} />
      <Tabs.Screen name='index' options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />
      }} />
      <Tabs.Screen name="settings" options={{
        title: 'Settings',
        tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />
      }} />
    </Tabs>
  )
}
