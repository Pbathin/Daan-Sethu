import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import PopOtherItemCard from './PopOtherItemCard'; // Assuming this is a similar card component for other items

export default function PopOtherItems() {
    const [otherItemsList, setOtherItemsList] = useState([]);

    useEffect(() => {
        fetchOtherItems();
    }, []);

    const fetchOtherItems = async () => {
        setOtherItemsList([]);
        const q = query(collection(db, 'ItemList'), limit(10));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setOtherItemsList(prev => [...prev, doc.data()]);
        });
    };

    return (
        <View>
            <FlatList
                data={otherItemsList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <PopOtherItemCard
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
