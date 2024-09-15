import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/contactUs/Header'
import Details from '../../components/contactUs/Details'

export default function contactUs() {
  return (
    <View>
      <Header/>
      <Details/>
    </View>
  )
}

const styles = StyleSheet.create({})