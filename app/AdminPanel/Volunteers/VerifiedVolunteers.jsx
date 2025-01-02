import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import { WindowWidth } from '../../../GlobalCSS';
import { useNavigation } from 'expo-router';

export default function VerifiedVolunteers() {
    const [VerifiedVolunteers, setVerifiedVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Verified Volunteers",
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
        const GetVerifiedVolunteers = async () => {
            setLoading(true);
            const q = query(collection(db, 'VerifiedVolunteers'));
            const querySnapshot = await getDocs(q);
            const volunteers = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setVerifiedVolunteers(volunteers);
            setLoading(false);
        };

        GetVerifiedVolunteers();
    }, []);

    const removeVolunteer = async (volunteer) => {
        Alert.alert(
            "Delete Confirmation",
            `Are you sure you want to remove ${volunteer.name}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'VerifiedVolunteers', volunteer.id));
                            setVerifiedVolunteers(VerifiedVolunteers.filter((item) => item.id !== volunteer.id));
                            alert("Volunteer removed.");
                        } catch (error) {
                            console.error("Error removing volunteer: ", error);
                            alert("Failed to remove the volunteer. Please try again.");
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#8c6fff" style={styles.loader} />
            ) : (
                VerifiedVolunteers.length === 0 ? (
                    <Text style={styles.noVerifiedText}>No verified volunteers available</Text>
                ) : (
                    <FlatList
                        data={VerifiedVolunteers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.block}>
                                {/* <Image
                                    source={{ uri: item.image }}
                                    style={styles.image}
                                    resizeMode="cover"
                                /> */}
                                <Text style={styles.name}>Name: {item.name}</Text>
                                <Text style={styles.text}>Email: {item.email}</Text>
                                <Text style={styles.text}>Phone: {item.contact}</Text>
                                <Text style={styles.text}>Gov Id: {item.govId}</Text>
                                <Text style={styles.text}>Availability: {item.availability}</Text>
                                <Text style={styles.text}>Intrest: {item.areaOfInterest}</Text>
                                <TouchableOpacity
                                    style={[styles.btn, { backgroundColor: '#ff4d4d' }]}
                                    onPress={() => removeVolunteer(item)}
                                >
                                    <Text style={styles.btnTxt}>Remove</Text>
                                </TouchableOpacity>
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
        alignItems: 'center',
    },
    image: {
        width: 125, // Fixed width
        height: 125, // Fixed height
        borderRadius: 99,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        marginVertical: 3,
    },
    btn: {
        padding: 10,
        backgroundColor: '#8c6fff',
        borderRadius: 5,
        width: WindowWidth * 0.4,
        alignItems: 'center',
        marginTop: 10,
    },
    btnTxt: {
        color: '#fff',
        fontSize: 16,
    },
    noVerifiedText: {
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
