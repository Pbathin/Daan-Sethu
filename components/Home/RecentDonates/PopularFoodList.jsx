import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../../configs/FirebaseConfig';
import PopularFoodCard from './PopularFoodCard';


export default function PopularFoodList() {

    const [foodList, setFoodList] = useState([]);
    useEffect(() => {
        GetFoodList();
    }, []);
    const GetFoodList = async () => {
        setFoodList([]);
        const q = query(collection(db, 'FoodList'), limit(10));
        const querySnapshot = await getDocs(q);
        const foodList = [];
        querySnapshot.forEach((doc) => {
            setFoodList(prev=>[...prev,doc.data()]);
            // foodList.push(doc.data());
        })
    }


    return (
        <View>
            <View style={styles.sub}>
                <Text style={styles.headerText}>Recent Donates</Text>
                <Text style={styles.subheadtxt}>View All</Text>
            </View>
            <FlatList
                data={foodList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <PopularFoodCard
                        foods={item}
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
