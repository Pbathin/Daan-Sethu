import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { deleteDoc, doc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';

const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

export default function ExploreItemCardTrash({ item }) {
    const [itemDetails, setItemDetails] = useState([]);

    useEffect(() => {
        fetchAllItems();
    }, []);

    const fetchAllItems = async () => {
        try {
            const collections = ['FoodList', 'ClothesList', 'BooksList', 'HouseholdItems', 'GadgetList', 'ItemList'];
            let allItems = [];

            // Fetch all collections concurrently
            const promises = collections.map(async (collectionName) => {
                const collectionRef = collection(db, collectionName);
                const q = query(collectionRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    const itemData = doc.data();
                    allItems.push({ id: doc.id, ...itemData, category: collectionName });
                });
            });

            await Promise.all(promises);

            // Sort items by 'createdAt'
            allItems.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());

            setItemDetails(allItems);
        } catch (error) {
            console.error('Error fetching items:', error);
            ToastAndroid.show('Failed to fetch items.', ToastAndroid.LONG);
        }
    };

    const onDelete = () => {
        Alert.alert('Delete Item', 'Do you really want to delete this item?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: deleteItem,
            },
        ]);
    };

    const deleteItem = async () => {
        try {
            if (!item?.id || !item?.category) {
                throw new Error('Invalid item details.');
            }

            await deleteDoc(doc(db, item.category, item.id));
            ToastAndroid.show('Item Deleted!', ToastAndroid.LONG);

            // Refresh the list after deletion
            fetchAllItems();
        } catch (error) {
            console.error('Error deleting item:', error);
            ToastAndroid.show('Failed to delete item.', ToastAndroid.LONG);
        }
    };

    return (
        <View
            style={{
                marginLeft: 10,
                padding: 10,
                backgroundColor: '#fff',
                borderRadius: 15,
                width: WindowWidth * 0.9,
                marginBottom: 20,
            }}
        >
            <Image
                source={{ uri: item?.imageUrl }}
                style={{
                    width: WindowWidth * 0.8,
                    height: WindowHeight * 0.25,
                    borderRadius: 15,
                    marginBottom: 5,
                    marginLeft: 10,
                }}
            />
            <View>
                <Text
                    style={{
                        fontFamily: 'outfitbold',
                        fontSize: 17,
                        textAlign: 'center',
                        paddingBottom: 3,
                    }}
                >
                    {item.name}
                </Text>
                <Text
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'center',
                        paddingBottom: 5,
                    }}
                >
                    {item.description}
                </Text>
                <Text
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'justify',
                        paddingBottom: 5,
                    }}
                >
                    Category: {item.category}
                </Text>

                {item.category === 'FoodList' && (
                    <>
                        <Text style={styles.detailText}>Food Type: {item.foodType}</Text>
                        <Text style={styles.detailText}>Prepared Time: {item.preparedTime}</Text>
                        <Text style={[styles.detailText, { marginLeft: 170, marginTop: -22 }]}>
                            Expiry Time: {item.expiryTime}
                        </Text>
                    </>
                )}

                {item.category === 'ClothesList' && (
                    <>
                        <Text style={styles.detailText}>Clothing Type: {item.clothingType}</Text>
                        <Text style={styles.detailText}>Size: {item.size}</Text>
                    </>
                )}

                {item.category === 'BooksList' && (
                    <>
                        <Text style={styles.detailText}>Author: {item.author}</Text>
                        <Text style={styles.detailText}>Genre: {item.genre}</Text>
                    </>
                )}

                <Text style={styles.detailText}>Address: {item.address}</Text>
                <Text style={styles.detailText}>City: {item.city}</Text>
                <Text style={[styles.detailText, { marginLeft: 170, marginTop: -22 }]}>
                    PINCODE: {item.pinCode}
                </Text>
                <Text style={styles.detailText}>Landmark: {item.landmark}</Text>
                <Text style={[styles.detailText, { marginLeft: 170, marginTop: -22 }]}>
                    Contact No: {item.contact}
                </Text>
            </View>
            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: '#8c6fff',
                    borderRadius: 5,
                    marginTop: 20,
                    marginBottom: 10,
                    width: WindowWidth * 0.6,
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                onPress={onDelete}
            >
                <Ionicons name="trash" size={20} color="#fff" style={{ marginLeft: -120 }} />
                <Text
                    style={{
                        fontFamily: 'outfitmedium',
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 15,
                        marginTop: -20,
                    }}
                >
                    Delete Item
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    detailText: {
        fontFamily: 'outfit',
        fontSize: 13,
        color: 'gray',
        textAlign: 'justify',
        paddingBottom: 5,
    },
};
