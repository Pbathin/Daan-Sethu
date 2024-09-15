import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import {Ionicons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen name= 'home' 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color})=><Ionicons name="home"
        size={24} color='#8c6fff'/>
      }}
      />
      <Tabs.Screen name= 'explore'
      options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({color})=><Ionicons name="search"
        size={24}  color='#8c6fff'/>
      }}
      />
      <Tabs.Screen name= 'contactUs'
      options={{
        tabBarLabel: 'Contact Us',
        tabBarIcon: ({color})=><AntDesign name="customerservice"
        size={24}  color='#8c6fff'/>
      }}
      />
      <Tabs.Screen name= 'profile'
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