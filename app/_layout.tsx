import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { DefaultTheme as defaultTheme } from 'react-native-paper';

import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const darkTheme: typeof defaultTheme = {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: '#6F3DE4',
      background: '#6F3DE4',
      surface: '#6F3DE4',
      onSurface: '#FCD34B',
      onSurfaceVariant: '#FCD34B',
    },
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    // <ThemeProvider value={DefaultTheme}>
    <PaperProvider theme={darkTheme}>
      <ThemeProvider value={DarkTheme}>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
    // </ThemeProvider>
  );
}
