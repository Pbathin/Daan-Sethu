import { View, Text, FlatList, ActivityIndicator, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import ExploreItemCardTrash from '../../../components/Explore/ExploreFoodCardTrash';
import { useNavigation } from 'expo-router';

const DonatedItems = () => {
    const { user } = useUser();
    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Donated Items',
            headerStyle: {
                backgroundColor: '#8c1aff',
            },
            headerTitleStyle: {
                fontSize: 18,
                color: '#ffffff',
                fontFamily: 'outfit',
            },
        });
        if (user) GetUserDonatedItems();
    }, [user]);

    const GetUserDonatedItems = async () => {
        setLoading(true);
        setItemList([]);
        try {
            const collections = ['FoodList', 'ClothesList', 'BooksList']; // Add other collections here
            let allItems = [];

            for (let collectionName of collections) {
                const q = query(collection(db, collectionName), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    allItems.push({ id: doc.id, ...doc.data(), category: collectionName });
                });
            }

            setItemList(allItems);
        } catch (error) {
            ToastAndroid.show('Error fetching donated items.', ToastAndroid.LONG);
        }
        setLoading(false);
    };

    return (
        <View style={{ marginTop: 5, paddingLeft: 10 }}>
            {loading ? (
                <ActivityIndicator size="large" color="#8c1aff" />
            ) : (
                <FlatList
                    data={itemList}
                    onRefresh={GetUserDonatedItems}
                    refreshing={loading}
                    renderItem={({ item, index }) => (
                        <ExploreItemCardTrash
                            item={item} // Pass item as a prop to the card
                            key={index}
                        />
                    )}
                />
            )}
        </View>
    );
};

export default DonatedItems;
