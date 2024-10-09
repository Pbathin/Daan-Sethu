import Profile from '../(tabs)/profile';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminProfile() {
  return (
    <SafeAreaView>
      <Profile/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})