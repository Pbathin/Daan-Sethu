// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect} from 'react'
// import { useNavigation } from 'expo-router'

// export default function Volunteers() {
//     const navigation = useNavigation();
//     useEffect(() => {
//         navigation.setOptions({
//             headerTitle: 'Volunteers',
//             headerShown: true,
//             headerStyle: {
//                 backgroundColor: '#8c1aff',
//             },
//             headerTitleStyle: {   
//               fontSize: 18,          
//               color: '#ffffff',      
//               fontFamily: 'outfit', 
//           },
//         })
//     }, [])
//   return (
//     <View>
//       <Text style={{
//         fontFamily:'outfitbold',
//         fontSize:20,
//         textAlign:'center',
//         marginTop:200
//       }}>Exciting updates are just </Text>
//       <Text style={{
//         fontFamily:'outfitbold',
//         fontSize:20,
//         textAlign:'center',
//         marginTop:3
//       }}>around the corner...! </Text>
//     </View>
//   )
// }

import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../../configs/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation, router } from 'expo-router';

export default function VolunteersPage() {
    const navigation = useNavigation();
    const [verifiedVolunteers, setVerifiedVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Volunteers',
            headerShown: true,
            headerStyle: {
                backgroundColor: '#8c1aff',
            },
            headerTitleStyle: {
                fontSize: 18,
                color: '#ffffff',
                fontFamily: 'outfit',
            },
        });

        const fetchVerifiedVolunteers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'VerifiedVolunteers'));
                const volunteersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setVerifiedVolunteers(volunteersData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching verified volunteers: ", error);
                setLoading(false);
            }
        };

        fetchVerifiedVolunteers();
    }, []);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {loading ? (
                <ActivityIndicator size="large" color="#8c6fff" />
            ) : (
                <FlatList
                    data={verifiedVolunteers}
                    renderItem={({ item }) => (
                        <View style={styles.volunteerItem}>
                            <Text style={styles.volunteerText}>Name: {item.name}</Text>
                            <Text style={styles.volunteerText}>Contact: {item.contact}</Text>
                            <Text style={styles.volunteerText}>Interest: {item.areaOfInterest}</Text>
                            <Text style={styles.volunteerText}>Availability: {item.availability}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}

            {/* "+" button to navigate to Apply for Volunteers page */}
            <TouchableOpacity
                onPress={() => router.push("/Volunteers/ApplyForVolunteers")}
                style={styles.fab}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    volunteerItem: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#8c6fff',
    },
    volunteerText: {
        fontSize: 16,
        fontFamily: 'outfit',
        color: '#333',
    },
    fab: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      backgroundColor: '#8c6fff',
      width: 55, 
      height: 55, 
      borderRadius: 99, 
      elevation: 5,
      justifyContent: 'center', 
      alignItems: 'center', 
  },
    fabText: {
        fontSize: 24,
        color: '#fff',
    },
});
