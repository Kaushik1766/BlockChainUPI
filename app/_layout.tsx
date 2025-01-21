import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // const theme = {
  //   ...DefaultTheme,
  //   myOwnProperty: true,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     myOwnColor: '#BADA55',
  //   },
  // };

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
    <Auth0Provider domain={"dev-avbpamn8nlbn8lg3.us.auth0.com"} clientId={"AM64NAAD0FEMNNT34XgXHWuNhoTkEmse"}>
      <PaperProvider>
        <ThemeProvider value={DarkTheme}>

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </Auth0Provider>
    // </ThemeProvider>
  );
}
