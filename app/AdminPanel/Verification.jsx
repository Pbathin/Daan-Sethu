import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function PendingVerifications() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {/* Pending Verifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Pending Verifications</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/AdminPanel/PendingOrgs/PendingOrphanage')}
        >
          <Ionicons name="school" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Orphanages List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/AdminPanel/PendingOrgs/PendingOldAgeHome')}
        >
          <Ionicons name="bed" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Old Age Home List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/AdminPanel/PendingOrgs/PendingRehaba')}
        >
          <Ionicons name="medkit" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Rehabilitation Center List</Text>
        </TouchableOpacity>
      </View>

      {/* Verified Organizations Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Verified Organizations</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/AdminPanel/VerifiedOrgs/VerifiedOrphanage')}
        >
          <Ionicons name="school" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Orphanages List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/AdminPanel/VerifiedOrgs/VerifiedOldAgeHome')}
        >
          <Ionicons name="bed" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Old Age Home List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/AdminPanel/VerifiedOrgs/VerifiedRehab')}
        >
          <Ionicons name="medkit" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Rehabilitation Center List</Text>
        </TouchableOpacity>
      </View>

      {/* Help Requests Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Help Requests</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/AdminPanel/HelpRequests/SubmittedRequests')}
        >
          <Ionicons name="document-text" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Submitted Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/AdminPanel/HelpRequests/DontaionsForm ')}
        >
          <Ionicons name="document-text" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Submit Proofs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/AdminPanel/HelpRequests/AdminSubmissions ')}
        >
          <Ionicons name="document-text" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Submitted Proofs</Text>
        </TouchableOpacity>
      </View>

      {/* Volunteers Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Volunteers</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/AdminPanel/Volunteers/PendingVolunteers')}
        >
          <Ionicons name="hourglass" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Verification Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/AdminPanel/Volunteers/VerifiedVolunteers')}
        >
          <Ionicons name="checkmark-circle" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Verified</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f7f7f7',
    paddingBottom:50
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    fontFamily: 'outfitbold',
    fontSize: 20,
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  button: {
    backgroundColor: '#8c6fff',
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    transition: 'all 0.3s ease',
  },
  buttonText: {
    fontFamily: 'outfitmedium',
    fontSize: 16,
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginLeft: 15,
  },
  icon: {
    marginLeft: 10,
  },
});
