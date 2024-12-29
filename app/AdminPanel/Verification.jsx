import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function PendingVerifications() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.HeadTxt}>Pending Verifications</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/PendingOrgs/PendingOrphanage')}
      >
        <Text style={styles.txt}>Orphanages List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/PendingOrgs/PendingOldAgeHome')}
      >
        <Text style={styles.txt}>Old Age Home List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/PendingOrgs/PendingRehaba')}
      >
        <Text style={styles.txt}>Rehabilitation Center List</Text>
      </TouchableOpacity>

      <Text style={styles.HeadTxt}>Verified Organizations</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/VerifiedOrgs/VerifiedOrphanage')}
      >
        <Text style={styles.txt}>Orphanages List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/VerifiedOrgs/VerifiedOldAgeHome')}
      >
        <Text style={styles.txt}>Old Age Home List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/VerifiedOrgs/VerifiedRehab')}
      >
        <Text style={styles.txt}>Rehabilitation Center List</Text>
      </TouchableOpacity>

      <Text style={styles.HeadTxt}>Help Requests</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/HelpRequests/SubmittedRequests')}
      >
        <Text style={styles.txt}>Submitted Requests</Text>
      </TouchableOpacity>
      <Text style={styles.HeadTxt}>Volunteers</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/Volunteers/PendingVolunteers')}
      >
        <Text style={styles.txt}>Verification Pending</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push('/AdminPanel/Volunteers/VerifiedVolunteers')}
      >
        <Text style={styles.txt}>Verified</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#f0f0f0', 
    marginBottom:60
  },
  HeadTxt: {
    fontFamily: 'outfitbold',
    fontSize: 18,  
    marginVertical: 10,
    color: '#444',
    textAlign: 'center',
    letterSpacing: 0.8,
  },
  btn: {
    backgroundColor: '#8c6fff', 
    borderRadius: 8, 
    marginBottom: 12,
    elevation: 4,  
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  txt: {
    fontFamily: 'outfitmedium',
    fontSize: 16, 
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,  
  },
});
