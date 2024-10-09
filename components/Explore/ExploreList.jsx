import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ExploreFoodCard from './ExploreFoodCard';
import { WindowWidth, WindowHeight } from '../../GlobalCSS';
import { useNavigation } from 'expo-router'

export default function ExploreList() {
    const navigation = useNavigation();
    const [foodList, setFoodList] = useState([]);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Food Share',
            headerShown: true,
            headerStyle: {
                backgroundColor: '#8c6fff',
            },
            headerTitleStyle: {
                fontSize: 18,
                color: '#ffffff',
                fontFamily: 'outfit',
            },
            headerTitleAlign: 'center',
        }),
            GetFoodList();

    }, []);
    const GetFoodList = async () => {
        setFoodList([]);
        const q = query(collection(db, 'FoodList'), orderBy('preparedTime', 'desc'));
        const querySnapshot = await getDocs(q);
        // const foodList = [];
        querySnapshot.forEach((doc) => {
            setFoodList((prev) => [...prev, doc.data()]);
        })
    }


    return (
        <View>
            <View style={styles.sub}>
                <Text style={styles.headerText}>Explore Your  Foods here...!</Text>
            </View>
            <FlatList
                data={foodList}
                vertical={true}
                showHorizontalScrollIndicator={false}

                style={{
                    maxHeight: WindowHeight - 50,
                    display: 'flex',
                    flexDirection: 'column',

                }}
                renderItem={({ item, index }) => (
                    <ExploreFoodCard
                        foods={item}
                        key={index}
                    />
                )}
            />
            <View
                style={{
                    marginTop: 50,
                }}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        // marginTop: 30,
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


