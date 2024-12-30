import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import PopHouseholdItemCard from './PopHouseholdItemCard';

export default function PopHouseholdItems() {
    const [householdItemsList, setHouseholdItemsList] = useState([]);

    useEffect(() => {
        fetchHouseholdItems();
    }, []);

    const fetchHouseholdItems = async () => {
        setHouseholdItemsList([]);
        const q = query(collection(db, 'HouseholdItems'), limit(10));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setHouseholdItemsList(prev => [...prev, doc.data()]);
        });
    };

    return (
        <View>
            <FlatList
                data={householdItemsList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <PopHouseholdItemCard
                        item={item}
                        key={index}
                    />
                )}
            />
            <View style={{ marginBottom: 20 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        marginTop: 10,
        fontSize: 20,
        fontFamily: 'outfitbold',
    },
    sub: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subheadtxt: {
        marginTop: 20,
        fontFamily: 'outfitmedium',
        color: '#B9BDD8',
    },
});
