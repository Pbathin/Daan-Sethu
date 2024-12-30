import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import PopGadgetCard from './PopGadgetCard';

export default function PopGadgets() {
    const [gadgetsList, setGadgetsList] = useState([]);

    useEffect(() => {
        fetchGadgets();
    }, []);

    const fetchGadgets = async () => {
        setGadgetsList([]);
        const q = query(collection(db, 'GadgetList'), limit(10));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setGadgetsList(prev => [...prev, doc.data()]);
        });
    };

    return (
        <View>
            <FlatList
                data={gadgetsList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <PopGadgetCard
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
