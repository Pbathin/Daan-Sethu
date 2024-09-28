import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import {WindowWidth, WindowHeight} from '../../GlobalCSS'
import DisplayCard from './DisplayCard';
import CustFeedback from './CustFeedback';

export default function DisplayFeedback() {
  const [customerFeedback, setCustomerFeedback] = useState([]);
    useEffect(() => {
        GetCustomerFeedback();
    }, []);
    const GetCustomerFeedback = async () => {
        setCustomerFeedback([]);
        const q = query(collection(db, 'CustomerFeedback'));
        const querySnapshot = await getDocs(q);
        const customerFeedback = [];
        querySnapshot.forEach((doc) => {
            setCustomerFeedback(prev=>[...prev,doc.data()]);
        })
    }
   

    return (
        <View>
        <CustFeedback/>
            <View style={styles.sub}>
                <Text style={styles.headerText}>Shared feedbacks</Text>
            </View>
            <FlatList
                data={customerFeedback}
                vertical={true}
                showHorizontalScrollIndicator={false}
                
                style={{
                    maxHeight:WindowHeight-50,
                    display:'flex',
                    flexDirection:'column',
                    
                }}
                renderItem={({ item, index }) => (
                    <DisplayCard
                        feedback={item}
                        key={index}
                    />
                )}
            />
            <View 
            style={{
                marginTop:30,
            }}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        marginTop: 10,
        fontSize: 19,
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


