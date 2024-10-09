import { Text, View } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'

export default function Profile() {
  return (
    <View style={{
      padding:20,

    }}>
      <Text style={{
        fontFamily:'outfitbold',
        fontSize:35,
        marginTop:10
        
      }}>Profile</Text>
      <UserIntro/>
      <MenuList/>
    </View>
  )
}