import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import PopBookCard from './PopBookCard';

export default function PopBooks() {
    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
        GetBooksList();
    }, []);

    const GetBooksList = async () => {
        setBooksList([]);
        const q = query(collection(db, 'BookList'), limit(10)); 
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setBooksList((prev) => [...prev, doc.data()]);
        });
    };

    return (
        <View>
            <FlatList
                data={booksList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <PopBookCard
                        book={item} // Update prop name to 'book'
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
