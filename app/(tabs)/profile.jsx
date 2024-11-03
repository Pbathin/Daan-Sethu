import {  View } from 'react-native'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react';

export default function Profile() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
        headerTitle: 'Profile',
        headerShown: true,
        headerStyle: {
            backgroundColor: '#8c1aff',//#8c6fff
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
    <View style={{padding:20, paddingTop:-20}}>
      <UserIntro/>
      <MenuList/>
    </View>
  )
}