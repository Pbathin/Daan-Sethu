import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import { WindowWidth, WindowHeight } from './../GlobalCSS';
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8c1aff" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Image
            style={styles.image}
            source={require('./../assets/images/login1.png')}
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.headtext}>
            Delighting Lives with
            <Text style={{ color: "yellow" }}> Every Act of Giving</Text> ...!
          </Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.btnText}>Let's Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Default background for the entire screen
  },
  scrollContainer: {
    flexGrow: 1, // Ensures the ScrollView takes the full screen height
  },
  image: {
    width: WindowWidth,
    height: WindowHeight * 0.6,
    marginBottom: 10,
  },
  subContainer: {
    backgroundColor: "#8c1aff", // Background color for the bottom section
    height: WindowHeight * 0.53,
    marginTop: -30, // Overlap effect
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  button: {
    backgroundColor: "#fff",
    height: 55,
    width: WindowWidth * 0.45,
    elevation: 10,
    alignSelf: "center",
    shadowColor: "gray",
    marginTop: 80,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowRadius: 15,
    shadowOpacity: 0.5,
    borderRadius: 12,
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "outfitmedium",
    color: "#32127a",
  },
  headtext: {
    fontSize: 30,
    fontFamily: "outfitbold",
    textAlign: "center",
    color: "white",
    marginTop: 20,
  },
});
