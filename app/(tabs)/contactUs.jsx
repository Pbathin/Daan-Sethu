import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Details from '../../components/contactUs/Details';
import { useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react';
import { WindowHeight, WindowWidth } from '../../GlobalCSS';


export default function ContactUs() {

  const navigation = useNavigation();
  const router =useRouter();

  useEffect(() => {
    navigation.setOptions({
        headerTitle: 'Contact Us',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#8C1AFF',//#8c6fff
        },
        headerTitleStyle: {
            fontSize: 22,
            fontSize: 22,
            color: '#ffffff',
            fontFamily: 'outfitbold',
        },
        headerTitleAlign: 'center',
    })
}, []);
  return (
    <View style={styles.container}>
    <View>
            <TouchableOpacity
              onPress={() => router.push("/AboutUs/AboutUs")}
              style={{
                height:WindowHeight*0.02,
                width:WindowWidth*0.5
              }}
        >
                <Text     style={{
                fontFamily :'outfitmedium',
                color:"gray",
                fontSize:13,
                marginTop:5,
                marginBottom:-10
            }}>Learn more about us</Text>
            </TouchableOpacity>
        </View>
      <Details />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
});
