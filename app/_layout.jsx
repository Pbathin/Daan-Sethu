// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
// import LoginScreen from "./../components/LoginScreen";

// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key) {
//     try {
//       return SecureStore.getItemAsync(key);
//     } catch (err) {
//       return null;
//     }
//   },
//   async saveToken(key, value) {
//     try {
//       return SecureStore.setItemAsync(key, value);
//     } catch (err) {
//       return;
//     }
//   },
// };

// export default function RootLayout() {
//   useFonts({
//     'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
//     'outfitmedium': require('./../assets/fonts/Outfit-Medium.ttf'),
//     'outfitbold': require('./../assets/fonts/Outfit-Bold.ttf'),
//   })
//   return (
//     <ClerkProvider
//       tokenCache={tokenCache}
//       publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
//       <SignedIn>
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="(tabs)" />
//         </Stack>
//       </SignedIn>
//       <SignedOut>
//         <LoginScreen />
//       </SignedOut>

//     </ClerkProvider>
//   );
// }



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

  return (
    <ClerkProvider>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="admin" />
          <Stack.Screen name="(tabs)" />
          
          {/* Other routes */}
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
