import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from "../components/LoginScreen";
import * as SecureStore from "expo-secure-store";


const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfitmedium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfitbold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  if (!loaded) {
    return null; // Don't render until fonts are loaded
  }


  const linking = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: {
      screens: {
        home: 'home',
        admin: 'admin',
        login: 'login',
        // Other screens
      },
    },
  };
  
  return (
    <ClerkProvider>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}  linking={linking}>


          {/* Other routes */}
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
