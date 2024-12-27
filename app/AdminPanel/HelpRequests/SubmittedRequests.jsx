import { StyleSheet, Text, View, FlatList, Image,  ActivityIndicator, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import { WindowWidth } from '../../../GlobalCSS';
import { useNavigation } from "expo-router";

export default function SubmittedRequests() {
    const [SubmittedRequests, setSubmittedRequests] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state for the initial data load
    const [refreshing, setRefreshing] = useState(false);  // Refresh state for pull-to-refresh
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Submitted Requests",
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

    const GetSubmittedRequests = async () => {
        setLoading(true);  // Start loading
        const q = query(collection(db, 'HelpRequest'));
        const querySnapshot = await getDocs(q);
        const filteredOrgs = querySnapshot.docs
            .map(doc => ({ ...doc.data()}));

        setSubmittedRequests(filteredOrgs);
        setLoading(false);  // End loading
        setRefreshing(false);  // Stop refreshing
    };

    useEffect(() => {
        GetSubmittedRequests();
    }, []);

    // Pull-to-refresh handler
    const onRefresh = async () => {
        setRefreshing(true);
        await GetSubmittedRequests();  // Reload data
    };


    return (
        <View style={styles.container}>
            {loading ? (  // Show loading indicator
                <ActivityIndicator size="large" color="#8c6fff" style={styles.loader} />
            ) : (
                SubmittedRequests.length === 0 ? (
                    // Show this message when there's no data to fetch
                    <Text style={styles.noPendingText}>No requests are found.</Text>
                ) : (
                    <FlatList
                        data={SubmittedRequests}
                        vertical={true}
                        showHorizontalScrollIndicator={false}
                        style={{ paddingLeft: 10, marginTop: 10 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View key={index} style={styles.block}>
                                {/* Organization Image(s) */}
                                {Array.isArray(item.imageUrls) ? (
                                    <FlatList
                                        data={item.imageUrls}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(image, index) => index.toString()}
                                        renderItem={({ item: imageUrl }) => (
                                            <Image
                                                source={{ uri: imageUrl }}
                                                style={styles.image}
                                            />
                                        )}
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
                                        <Text style={styles.text}> Name: {item.Name}</Text>
                                        <Text style={styles.text}> Contact: {item.contact}</Text>
                                        <Text style={styles.text}> Amount Req: {item.amountReq}</Text>
                                        <Text style={styles.text}> Address: {item.address}</Text>
                                    </View>

                                    {/* Second Column */}
                                    <View style={styles.column}>
                                     
                                        <Text style={styles.text}> Landmark: {item.landmark}</Text>
                                        <Text style={styles.text}> PIN Code: {item.pinCode}</Text>
                                        <Text style={styles.text}> UPI Id: {item.upiId}</Text>
                                    </View>
                                </View>

                                {/* Description */}
                                <Text style={styles.description}> Description: {item.description}</Text>
                          
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}  // Attach the onRefresh function
                                colors={["#8c6fff"]}  // Customize refresh indicator color
                            />
                        }
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
        marginHorizontal: 5,
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
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
