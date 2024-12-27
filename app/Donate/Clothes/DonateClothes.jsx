import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect} from 'react'
import { useNavigation } from 'expo-router'

export default function DonateClothes() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Donate Clothes',
            headerShown: true,
            headerStyle: {
                backgroundColor: '#8c1aff',
            },
            headerTitleStyle: {
              fontSize: 18,
              color: '#ffffff',
              fontFamily: 'outfit',
          },
        })
    }, [])
  return (
    <View>
      <Text style={{
        fontFamily:'outfitbold',
        fontSize:20,
        textAlign:'center',
        marginTop:200
      }}>Exciting updates are just </Text>
      <Text style={{
        fontFamily:'outfitbold',
        fontSize:20,
        textAlign:'center',
        marginTop:3
      }}>around the corner...! </Text>
    </View>
  )
}
