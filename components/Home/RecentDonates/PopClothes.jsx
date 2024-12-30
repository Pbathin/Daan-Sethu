import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import PopClothCard from './PopClothCard';


export default function PopClothes() {

    const [clothesList, setClothesList] = useState([]);
    useEffect(() => {
        GetClothesList();
    }, []);
    const GetClothesList = async () => {
        setClothesList([]);
        const q = query(collection(db, 'ClothesList'), limit(10));
        const querySnapshot = await getDocs(q);
        const clothesList = [];
        querySnapshot.forEach((doc) => {
            setClothesList(prev=>[...prev,doc.data()]);
            // clothesList.push(doc.data());
        })
    }


    return (
        <View>
            {/* <View style={styles.sub}>
                <Text style={styles.headerText}>Recent Donates</Text>
                <Text style={styles.subheadtxt}>View All</Text>
            </View> */}
            <FlatList
                data={clothesList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <PopClothCard
                        clothes={item}
                        key={index}
                    />
                )}
            />
            <View style={{
                marginBottom:20
            }}/>
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
