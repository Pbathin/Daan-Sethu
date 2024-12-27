import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import { WindowWidth } from '../../../GlobalCSS';
import { useNavigation } from "expo-router";

export default function PendingRehaba() {
    const [PendingRehaba, setPendingRehaba] = useState([]);
    const [loading, setLoading] = useState(true);  // Add loading state
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Pending Rehabilitation Center",
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
        const GetPendingRehaba = async () => {
            setLoading(true);  // Start loading
            const q = query(collection(db, 'pendingOrgList'));
            const querySnapshot = await getDocs(q);
            const filteredOrgs = querySnapshot.docs
                .map(doc => ({ ...doc.data(), id: doc.id }))
                .filter(org => org.orgType === "Rehabilitation Center");  // Filter for Rehabilitation Center only

            setPendingRehaba(filteredOrgs);
            setLoading(false);  // End loading
        };

        GetPendingRehaba();
    }, []);

    const verifyOrganization = async (org) => {
        try {
            await setDoc(doc(db, 'verifiedOrgList', org.id), org);
            await deleteDoc(doc(db, 'pendingOrgList', org.id));
            setPendingRehaba(PendingRehaba.filter((item) => item.id !== org.id));
            alert("Organization verified.");
        } catch (error) {
            console.error("Error verifying organization: ", error);
            alert("Failed to verify the organization. Please try again.");
        }
    };

    const rejectOrganization = async (org) => {
        try {
            await deleteDoc(doc(db, 'pendingOrgList', org.id));
            setPendingRehaba(PendingRehaba.filter((item) => item.id !== org.id));
            alert("Organization rejected.");
        } catch (error) {
            console.error("Error rejecting organization: ", error);
            alert("Failed to reject the organization. Please try again.");
        }
    };
    // const confirmApproval = (org) => {
    //     Alert.alert(
    //         "Confirm Approval",
    //         "Are you sure you want to approve this Rehabilitation Center ?",
    //         [
    //             { text: "Cancel", style: "cancel" },
    //             { text: "Approve", onPress: () => verifyOrganization(org) }
    //         ]
    //     );
    // };

    // // Confirmation for rejecting the organization
    // const confirmRejection = (org) => {
    //     Alert.alert(
    //         "Confirm Rejection",
    //         "Are you sure you want to reject this Rehabilitation Center ?",
    //         [
    //             { text: "Cancel", style: "cancel" },
    //             { text: "Reject", onPress: () => rejectOrganization(org), style: 'destructive' }
    //         ]
    //     );
    // };

    return (
        <View style={styles.container}>
            {loading ? (  // Show loading indicator
                <ActivityIndicator size="large" color="#8c6fff" style={styles.loader} />
            ) : (
                PendingRehaba.length === 0 ? (
                    // Show this when the list is empty
                    <Text style={styles.noPendingText}>No pending verifications of Rehabilitation Center</Text>
                ) : (
                    <FlatList
                        data={PendingRehaba}
                        vertical={true}
                        showHorizontalScrollIndicator={false}
                        style={{ paddingLeft: 10, marginTop: 10 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            // console.log('Item data:', item); // Debugging the item data

                            return (
                                <View key={index} style={styles.block}>
                                    {/* Multiple Images */}
                                    {Array.isArray(item.imageUrls) ? (
                                        <FlatList
                                            data={item.imageUrls} // Corrected to imageUrls
                                            horizontal={true}  // Display images horizontally
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(image, index) => index.toString()}
                                            renderItem={({ item: imageUrl }) => (
                                                <Image
                                                    source={{ uri: imageUrl }}
                                                    style={styles.image}
                                                />
                                            )}
                                        />
                                    ) : typeof item.imageUrls === 'string' ? (
                                        <Image
                                            source={{ uri: item.imageUrls }}
                                            style={styles.image}
                                        />
                                    ) : (
                                        <Text>No images available</Text>
                                    )}

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
                                        {/* Verify Button */}
                                        <TouchableOpacity
                                            style={styles.btn}
                                            onPress={() => verifyOrganization(item)}
                                        >
                                            <Text style={styles.btnTxt}>Verify</Text>
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
                            );
                        }}
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
        marginHorizontal: 5,  // To provide some space between images if multiple
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
    noPendingText: {
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
