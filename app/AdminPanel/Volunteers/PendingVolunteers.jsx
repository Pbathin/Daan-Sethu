import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import { WindowWidth } from '../../../GlobalCSS';
import { useNavigation } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

export default function PendingVolunteers() {
    const [PendingVolunteers, setPendingVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Verification Pending Volunteers",
            headerShown: true,
            headerStyle: {
                backgroundColor: "#8c1aff",
            },
            headerTitleStyle: {
                fontSize: 18,
                color: '#ffffff',
                fontFamily: 'outfit',
            },
        });
    }, []);

    useEffect(() => {
        const GetPendingVolunteers = async () => {
            setLoading(true);
            const q = query(collection(db, 'PendingVolunteers'));
            const querySnapshot = await getDocs(q);
            const volunteers = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            console.log('Fetched Volunteers:', volunteers); // Debugging: Log the fetched volunteers
            setPendingVolunteers(volunteers);
            setLoading(false);
        };

        GetPendingVolunteers();
    }, []);

    const verifyVolunteer = async (volunteer) => {
        try {
            await setDoc(doc(db, 'VerifiedVolunteers', volunteer.id), volunteer);
            await deleteDoc(doc(db, 'PendingVolunteers', volunteer.id));
            setPendingVolunteers(PendingVolunteers.filter((item) => item.id !== volunteer.id));
            alert("Volunteer verified.");
        } catch (error) {
            console.error("Error verifying volunteer: ", error);
            alert("Failed to verify the volunteer. Please try again.");
        }
    };

    const removeVolunteer = async (volunteer) => {
        try {
            await deleteDoc(doc(db, 'PendingVolunteers', volunteer.id));
            setPendingVolunteers(PendingVolunteers.filter((item) => item.id !== volunteer.id));
            alert("Volunteer removed.");
        } catch (error) {
            console.error("Error removing volunteer: ", error);
            alert("Failed to remove the volunteer. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#8c6fff" style={styles.loader} />
            ) : (
                PendingVolunteers.length === 0 ? (
                    <Text style={styles.noPendingText}>No pending volunteer verifications</Text>
                ) : (
                    <FlatList
                        data={PendingVolunteers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.block}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                                <Text style={styles.name}>Name: {item.name}</Text>
                                <Text style={styles.text}>Email: {item.email}</Text>
                                <Text style={styles.text}>Phone: {item.contact}</Text>
                                <Text style={styles.text}>Gov Id: {item.govId}</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.btn}
                                        onPress={() => verifyVolunteer(item)}
                                    >
                                        <Text style={styles.btnTxt}>Verify</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.btn, { backgroundColor: '#ff4d4d' }]}
                                        onPress={() => removeVolunteer(item)}
                                    >
                                        <Text style={styles.btnTxt}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    block: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
    },
    image: {
        width: '60%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
        alignSelf:'center'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        marginVertical: 3,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    btn: {
        padding: 10,
        backgroundColor: '#8c6fff',
        borderRadius: 5,
        width: WindowWidth * 0.4,
        alignItems: 'center',
    },
    btnTxt: {
        color: '#fff',
        fontSize: 16,
    },
    noPendingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'gray',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
