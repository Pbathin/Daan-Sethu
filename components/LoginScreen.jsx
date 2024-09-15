import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { WindowWidth, WindowHeight } from './../GlobalCSS'
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
    <SafeAreaView>
      <ScrollView >
        <View style={styles.container}>
          <View>
            <Image style={styles.image}
              source={require('./../assets/images/login1.png')}
            />
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.headtext}>Delighting Lives with<Text style={{ color: "yellow" }}> Every Act of Giving</Text> ...! </Text>
            <TouchableOpacity style={styles.button} onPress={onPress} >
              <Text style={styles.btnText}>Let's Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: WindowWidth * 1,
    height: WindowHeight * 0.6,
    marginTop: 30,
    marginLeft: 20,
    marginBottom:10
  },
  subContainer: {
    backgroundColor: "#8c1aff",
    height: WindowHeight*0.53,
    marginTop:-30,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
    },
  button: {
    backgroundColor: "#fff",
    height: 55,
    width: WindowWidth * 0.45,
    elevation: 10,
    alignSelf: "center",
    shadowColor: "gray",
    marginTop: 150,
    alignContent:'center',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowRadius: 15,
    shadowOpacity: 50,
    margin: 10,
    paddingBottom: 20,
    borderRadius:12,
  },
  btnText: {
    textAlign: "center",
    paddingTop: 10,
    fontSize: 20,
    fontFamily: "outfitmedium",
    color:"#32127a"
  },
  headtext: {
    fontSize: 30,
    fontFamily: "outfitbold",
    textAlign: "center",
    justifyItems: "center",
    color: "white",
    marginTop: 30,
  }
})