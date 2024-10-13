import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import { WindowWidth } from '../../../GlobalCSS';
import { useNavigation } from "expo-router";

export default function VerifiedOldAgeHome() {
    const [VerifiedOldAgeHome, setVerifiedOldAgeHome] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Verified Old Age Homes",
            headerShown: true,
            headerStyle: {
                backgroundColor: "#8c6fff",
            },
            headerTitleStyle: {
                fontSize: 18,
                color: '#ffffff',
                fontFamily: 'outfit',
            },
        });
    }, []);

    useEffect(() => {
        const GetVerifiedOldAgeHome = async () => {
            setLoading(true); // Start loading
            const q = query(collection(db, 'verifiedOrgList'));
            const querySnapshot = await getDocs(q);
            const filteredOrgs = querySnapshot.docs
                .map(doc => ({ ...doc.data(), id: doc.id }))
                .filter(org => org.orgType === "Old Age Home"); // Filter for Old Age Homes only

            setVerifiedOldAgeHome(filteredOrgs);
            setLoading(false); // End loading
        };

        GetVerifiedOldAgeHome();
    }, []);

    const confirmDelete = (org) => {
        Alert.alert(
            "Delete Confirmation",
            `Are you sure you want to delete ${org.orgName}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", 
                    onPress: () => deleteOrganization(org)
                }
            ]
        );
    };

    const deleteOrganization = async (org) => {
        try {
            await deleteDoc(doc(db, 'verifiedOrgList', org.id));
            setVerifiedOldAgeHome(VerifiedOldAgeHome.filter((item) => item.id !== org.id));
            alert("Old Age Home deleted.");
        } catch (error) {
            console.error("Error deleting Old Age Home: ", error);
            alert("Failed to delete the Old Age Home. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (  // Show loading animation while data is being fetched
                <ActivityIndicator size="large" color="#8c6fff" style={styles.loader} />
            ) : (
                VerifiedOldAgeHome.length === 0 ? (
                    <Text style={styles.noVerifiedText}>No verified old age homes available</Text>
                ) : (
                    <FlatList
                        data={VerifiedOldAgeHome}
                        vertical={true}
                        showHorizontalScrollIndicator={false}
                        style={{ paddingLeft: 10, marginTop: 10 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View key={index} style={styles.block}>
                                {/* Organization Image */}
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={styles.image}
                                />

                                {/* Organization Name */}
                                <Text style={styles.orgName}> {item.orgName}</Text>

                                {/* Organization Details */}
                                <View style={styles.detailsContainer}>
                                    {/* First Column */}
                                    <View style={styles.column}>
                                        <Text style={styles.text}> ID: {item.orgId}</Text>
                                        <Text style={styles.text}> Type: {item.orgType}</Text>
                                        <Text style={styles.text}> Strength: {item.noOfStrength}</Text>
                                        <Text style={styles.text}> Contact: {item.contact}</Text>
                                    </View>

                                    {/* Second Column */}
                                    <View style={styles.column}>
                                        <Text style={styles.text}> Address: {item.address}</Text>
                                        <Text style={styles.text}> Landmark: {item.landmark}</Text>
                                        <Text style={styles.text}> PIN Code: {item.pinCode}</Text>
                                        <Text style={styles.text}> UPI Id: {item.upiId}</Text>
                                    </View>
                                </View>

                                {/* Description */}
                                <Text style={styles.description}> Description: {item.description}</Text>

                                {/* Delete Button */}
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.btn, { backgroundColor: '#ff4d4d' }]}
                                        onPress={() => confirmDelete(item)} // Call confirmDelete function
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
        marginHorizontal: 5,
        elevation: 3,  // For shadow effect
    },
    image: {
        width: WindowWidth * 0.9,
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
    },
    orgName: {
        fontFamily: 'outfitbold',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
    },
    text: {
        fontFamily: 'outfit',
        fontSize: 14,
        marginVertical: 3,
    },
    description: {
        fontFamily: 'outfit',
        fontSize: 14,
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    btn: {
        padding: 10,
        backgroundColor: '#ff4d4d',
        borderRadius: 5,
        width: WindowWidth * 0.4,
        alignItems: 'center',
    },
    btnTxt: {
        fontFamily: 'outfitmedium',
        color: '#fff',
        fontSize: 16,
    },
    noVerifiedText: {
        fontFamily: 'outfit',
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
