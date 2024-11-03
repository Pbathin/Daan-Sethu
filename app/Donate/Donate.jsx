import { StyleSheet, Text, View } from 'react-native'
import DonateCateg from '../../components/Donate/DonateCateg'
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';

export default function Donate() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Donate',
            headerShown: true,
            headerStyle: {
                backgroundColor: '#8c1aff',
            },
            headerTitleStyle: {
                fontSize: 22,
                color: '#ffffff',
                fontFamily: 'outfitbold',
            },
            headerTitleAlign: 'center',
        });
    }, []);
  return (
    <View style={styles.cont}>
      <DonateCateg/>
    </View>
  )
}

const styles = StyleSheet.create({
    cont:{
        display:'flex',
        flex:1
    }
})