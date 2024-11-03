import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect} from 'react'
import { useNavigation } from 'expo-router'

export default function DonateOtherItems() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Donate Other Items',
            headerShown: true,
            headerStyle: {
                backgroundColor: '#8c6fff',
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
