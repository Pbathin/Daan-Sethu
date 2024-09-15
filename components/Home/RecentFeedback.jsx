import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import {WindowWidth, WindowHeight} from '../../GlobalCSS'
import DisplayCard from '../../app/Feedback/DisplayCard';

export default function RecentFeedback() {
  const [customerFeedback, setCustomerFeedback] = useState([]);
    useEffect(() => {
        GetCustomerFeedback();
    }, []);
    const GetCustomerFeedback = async () => {
        setCustomerFeedback([]);
        const q = query(collection(db, 'CustomerFeedback') ,limit(20));
        const querySnapshot = await getDocs(q);
        const customerFeedback = [];
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            setCustomerFeedback(prev=>[...prev,doc.data()]);
        })
    }
   

    return (
        <View>
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


