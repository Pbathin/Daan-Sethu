import { StyleSheet, View, } from 'react-native';
import Details from '../../components/contactUs/Details';
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react';


export default function ContactUs() {

  const navigation = useNavigation();

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
