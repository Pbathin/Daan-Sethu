import { ScrollView, StyleSheet, Text, View,  } from 'react-native'
import React from 'react'
import {WindowHeight} from '../../GlobalCSS'
import Header from '../../components/Home/Header';
import PendingOrgs from '../../components/AdminPanel/PendingOrgs';

export default function AdminHome() {
  return (
    <ScrollView
    style={styles.block}>
      <Header/>
      <PendingOrgs/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  block:{
    display:'flex'
  },
  txt:{
    fontFamily:'outfitmedium',
    fontSize:25,
    color:"purple",
    textAlign:'center',
    justifyContent:'center',
    marginTop:WindowHeight*0.3
  },
  txt1:{
    fontFamily:'outfitmedium',
    fontSize:25,
    color:"purple",
    textAlign:'center',
    justifyContent:'center',
    marginTop:10
  }
})