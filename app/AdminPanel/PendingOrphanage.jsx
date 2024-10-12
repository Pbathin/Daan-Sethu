import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { WindowWidth, WindowHeight } from '../../GlobalCSS';
import { useNavigation } from "expo-router";

export default function PendingOrphanage() {
    const [PendingOrphanage, setPendingOrphanage] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Pending Orphanage",
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
        const GetPendingOrphanage = async () => {
            const q = query(collection(db, 'pendingOrgList'));
            const querySnapshot = await getDocs(q);
            const filteredOrgs = querySnapshot.docs
                .map(doc => ({ ...doc.data(), id: doc.id }))
                .filter(org => org.orgType === "Orphanage");

            setPendingOrphanage(filteredOrgs);
        };

        GetPendingOrphanage();
    }, []);

    const verifyOrganization = async (org) => {
        try {
            await setDoc(doc(db, 'verifiedOrgList', org.id), org);
            await deleteDoc(doc(db, 'pendingOrgList', org.id));
            setPendingOrphanage(PendingOrphanage.filter((item) => item.id !== org.id));
            alert("Organization verified.");
        } catch (error) {
            console.error("Error verifying organization: ", error);
            alert("Failed to verify the organization. Please try again.");
        }
    };

    const rejectOrganization = async (org) => {
        try {
            await deleteDoc(doc(db, 'pendingOrgList', org.id));
            setPendingOrphanage(PendingOrphanage.filter((item) => item.id !== org.id));
            alert("Organization rejected.");
        } catch (error) {
            console.error("Error rejecting organization: ", error);
            alert("Failed to reject the organization. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            {PendingOrphanage.length === 0 ? (
                // Show this message when there's no data to fetch
                <Text style={styles.noPendingText}>No pending verifications of orphanage.</Text>
            ) : (
                <FlatList
                    data={PendingOrphanage}
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

                            {/* Buttons */}
                            <View style={styles.buttonContainer}>
                                {/* Approve Button */}
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={() => verifyOrganization(item)}
                                >
                                    <Text style={styles.btnTxt}>Approve</Text>
                                </TouchableOpacity>

                                {/* Reject Button */}
                                <TouchableOpacity
                                    style={[styles.btn, { backgroundColor: '#ff4d4d' }]}
                                    onPress={() => rejectOrganization(item)}
                                >
                                    <Text style={styles.btnTxt}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    noPendingText: {
        fontFamily: 'outfitbold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#555',
    },
    block: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 15,
        marginHorizontal: 10,
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
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    btn: {
        padding: 10,
        backgroundColor: '#8c6fff',
        borderRadius: 5,
        width: WindowWidth * 0.4,
        alignItems: 'center',
    },
    btnTxt: {
        fontFamily: 'outfitmedium',
        color: '#fff',
        fontSize: 16,
    },
});
