import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import {Ionicons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';

export default function AdminLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen name= 'AdminHome' 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color})=><Ionicons name="home"
        size={24} color='#8c6fff'/>
      }}
      />
      <Tabs.Screen name= 'AdminProfile'
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color})=><Ionicons name="person"
        size={24}  color='#8c6fff'/>
      }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({}) 