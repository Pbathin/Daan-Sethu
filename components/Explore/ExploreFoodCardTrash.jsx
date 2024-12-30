import { Text, View, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { WindowWidth, WindowHeight } from '../../GlobalCSS';
import { Ionicons } from '@expo/vector-icons';
import { deleteDoc, doc, collection, getDocs } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import { router } from 'expo-router';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function ExploreItemCardTrash({ item }) {
    const [itemDetails, setItemDetails] = useState([]);
    
   

useEffect(() => {
    // Fetch data from all collections
    fetchAllItems();
}, []);

const fetchAllItems = async () => {
    const collections = ['FoodList', 'ClothesList', 'BooksList', 'HouseholdItems', 'GadgetList', 'ItemList'];
    let allItems = [];

    for (let collectionName of collections) {
        // Query to order items by creation time, descending
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, orderBy('createdAt', 'desc')); // 'createdAt' should be a timestamp field in your documents
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const itemData = doc.data();
            allItems.push({ id: doc.id, ...itemData, category: collectionName });
        });
    }

    // Optionally sort items across collections by 'createdAt' field
    allItems.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());

    setItemDetails(allItems);
};


    const onDelete = () => {
        Alert.alert('Do you want to delete', 'Do you really want to Delete this item?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => deleteItem(),
            },
        ]);
    };

    const deleteItem = async () => {
        console.log('Delete Item');
        await deleteDoc(doc(db, item.category, item?.id)); // Delete from the correct collection
        // router.back();
        ToastAndroid.show('Item Deleted!', ToastAndroid.LONG);
    };

    return (
        <View>
            <View
                style={{
                    marginLeft: 10,
                    padding: 10,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    width: WindowWidth * 0.9,
                    height: 'auto',
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
                            <Text
                                style={{
                                    fontFamily: 'outfit',
                                    fontSize: 13,
                                    color: 'gray',
                                    textAlign: 'justify',
                                    paddingBottom: 5,
                                }}
                            >
                                Food Type: {item.foodType}
                            </Text>

                            <Text
                                style={{
                                    fontFamily: 'outfit',
                                    fontSize: 13,
                                    color: 'gray',
                                    textAlign: 'justify',
                                    paddingBottom: 5,
                                    marginTop: 1,
                                }}
                            >
                                Prepared Time: {item.preparedTime}
                            </Text>

                            <Text
                                style={{
                                    fontFamily: 'outfit',
                                    fontSize: 13,
                                    color: 'gray',
                                    textAlign: 'justify',
                                    paddingBottom: 5,
                                    marginLeft: 170,
                                    marginTop: -22,
                                }}
                            >
                                Expiry Time: {item.expiryTime}
                            </Text>
                        </>
                    )}

                    {item.category === 'ClothesList' && (
                        <>
                            <Text
                                style={{
                                    fontFamily: 'outfit',
                                    fontSize: 13,
                                    color: 'gray',
                                    textAlign: 'justify',
                                    paddingBottom: 5,
                                }}
                            >
                                Clothing Type: {item.clothingType}
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
                                Size: {item.size}
                            </Text>
                        </>
                    )}

                    {item.category === 'BooksList' && (
                        <>
                            <Text
                                style={{
                                    fontFamily: 'outfit',
                                    fontSize: 13,
                                    color: 'gray',
                                    textAlign: 'justify',
                                    paddingBottom: 5,
                                }}
                            >
                                Author: {item.author}
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
                                Genre: {item.genre}
                            </Text>
                        </>
                    )}

                    <Text
                        style={{
                            fontFamily: 'outfit',
                            fontSize: 13,
                            color: 'gray',
                            textAlign: 'justify',
                            paddingBottom: 5,
                        }}
                    >
                        Address: {item.address}
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
                        City: {item.city}
                    </Text>

                    <Text
                        style={{
                            fontFamily: 'outfit',
                            fontSize: 13,
                            color: 'gray',
                            textAlign: 'justify',
                            paddingBottom: 5,
                            marginLeft: 170,
                            marginTop: -22,
                        }}
                    >
                        PINCODE: {item.pinCode}
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
                        Landmark: {item.landmark}
                    </Text>

                    <Text
                        style={{
                            fontFamily: 'outfit',
                            fontSize: 13,
                            color: 'gray',
                            textAlign: 'justify',
                            paddingBottom: 5,
                            marginLeft: 170,
                            marginTop: -22,
                        }}
                    >
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
                    onPress={() => onDelete()}
                >
                    <Ionicons
                        name="trash"
                        size={20}
                        color="#fff"
                        style={{
                            marginLeft: -120,
                        }}
                    />
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
        </View>
    );
}
