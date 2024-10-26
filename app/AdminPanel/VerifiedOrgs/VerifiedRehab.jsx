import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native'; // Added Alert import
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import { WindowWidth } from '../../../GlobalCSS';
import { useNavigation } from "expo-router";

export default function VerifiedRehab() {
    const [VerifiedRehaba, setVerifiedRehaba] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Verified Rehabilitation Center",
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
        const GetVerifiedRehaba = async () => {
            setLoading(true); 
            const q = query(collection(db, 'verifiedOrgList'));
            const querySnapshot = await getDocs(q);
            const filteredOrgs = querySnapshot.docs
                .map(doc => ({ ...doc.data(), id: doc.id }))
                .filter(org => org.orgType === "Rehabilitation Center");

            setVerifiedRehaba(filteredOrgs);
            setLoading(false); 
        };

        GetVerifiedRehaba();
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
            setVerifiedRehaba(VerifiedRehaba.filter((item) => item.id !== org.id));
            alert("Rehabilitation Center deleted.");
        } catch (error) {
            console.error("Error deleting Rehabilitation Center: ", error);
            alert("Failed to delete the Rehabilitation Center. Please try again.");
        }
    };

    const renderImages = (images) => {
        return (
            <FlatList
                data={images}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(imageUrl, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item }}
                        style={styles.image}
                    />
                )}
            />
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (  
                <ActivityIndicator size="large" color="#8c6fff" style={styles.loader} />
            ) : (
                VerifiedRehaba.length === 0 ? (
                    <Text style={styles.noVerifiedText}>No verified rehabilitation centers available</Text>
                ) : (
                    <FlatList
                        data={VerifiedRehaba}
                        vertical={true}
                        showsVerticalScrollIndicator={false}
                        style={{ paddingLeft: 10, marginTop: 10 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View key={index} style={styles.block}>
                                {/* Multiple Images */}
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {renderImages(item.imageUrls)} 
                                </ScrollView>

                                {/* Organization Name */}
                                <Text style={styles.orgName}> {item.orgName}</Text>

                                {/* Organization Details */}
                                <View style={styles.detailsContainer}>
                                    <View style={styles.column}>
                                        <Text style={styles.text}> ID: {item.orgId}</Text>
                                        <Text style={styles.text}> Type: {item.orgType}</Text>
                                        <Text style={styles.text}> Strength: {item.noOfStrength}</Text>
                                        <Text style={styles.text}> Contact: {item.contact}</Text>
                                    </View>
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
                                        onPress={() => confirmDelete(item)} 
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
        elevation: 3,  
    },
    image: {
        width: WindowWidth * 0.75, // Adjust width for horizontal scrolling
        height: 200,
        borderRadius: 10,
        marginRight: 10,
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

