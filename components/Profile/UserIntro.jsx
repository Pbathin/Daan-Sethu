import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useUser} from '@clerk/clerk-expo'

export default function UserIntro() {
  const {user}=useUser();
  return (
    <View style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:30,
    }}>
      <Image source={{uri:user?.imageUrl}}
        style={{
          width:100,
          height:100,
          borderRadius:99,
        }}
      />
      <Text style={{
        fontSize:20,
        fontFamily:"outfitbold",
        paddingTop:10,
      }}>{user.fullName}</Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:16,
        marginBottom:10
      }}>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})