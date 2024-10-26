import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { WindowWidth } from '../../GlobalCSS'
import { useRouter } from 'expo-router'


export default function PendingVerifications() {
  const router = useRouter();
  return (
    <View style={styles.bolck}>
      <Text style={styles.HeadTxt}>Pending Verifications</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/PendingOrgs/PendingOrphanage')}
      >
        <Text style={styles.txt}> Orphanages List </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/PendingOrgs/PendingOldAgeHome')}
      >
        <Text style={styles.txt}> Old Age Home List </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/PendingOrgs/PendingRehaba')}
      >
        <Text style={styles.txt}> Rehabilitation Center List</Text>
      </TouchableOpacity>
      <Text style={styles.HeadTxt}>Verified Orgs</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/VerifiedOrgs/VerifiedOrphanage')}
      >
        <Text style={styles.txt}> Orphanages List </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/VerifiedOrgs/VerifiedOldAgeHome')}
      >
        <Text style={styles.txt}> Old Age Home List </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/VerifiedOrgs/VerifiedRehab')}
      >
        <Text style={styles.txt}> Rehabilitation Center List </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bolck: {
    display: 'flex',
    marginBottom: 10,
    borderRadius: 5,
    marginLeft: 5
  },
  btn: {
    padding: 2,
    backgroundColor: '#8c6fff',
    borderRadius: 4,
    marginTop: 2,
    width: WindowWidth * 0.95,
    alignSelf: 'center',
    marginBottom: 8,
  },
  HeadTxt: {
    fontFamily: 'outfitbold',
    fontSize: 20,
    marginBottom: 10,
    margin: 5
  },
  txt: {
    fontFamily: 'outfitmedium',
    fontSize: 17,
    marginBottom: 10,
    margin: 5,
    textAlign: 'center',
    color: '#fff'
  }
})