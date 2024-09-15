import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig'; 

export default function FoodList() {
    const [FoodList, setFoodList] = useState([]);
  
    useEffect(() => {
      const GetSFoodList = async () => {
        const q = query(collection(db, 'FoodList'));
        const querySnapshot = await getDocs(q);
        const FoodLists = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          FoodLists.push(doc.data());
        });
        setFoodList(FoodLists);
      };
  
      GetSFoodList();
    }, []);
  
    return (
      <View>
        <FlatList
          data={FoodList}
          horizontal={true}
          style={{paddingLeft:10, marginTop:10}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View key={index}>
              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  width: 320,
                  height: 180,
                  borderRadius:15,
                  marginRight:15
                }}
              />
              <Text>{}</Text>
            </View>
          )}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
  text:{
    fontFamily:"outfitbold",
    fontSize:20,
    padding:10
  }
  
  });