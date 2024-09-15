import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig'; 

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    const GetSliderList = async () => {
      const q = query(collection(db, 'Slider'));
      const querySnapshot = await getDocs(q);
      const sliders = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        sliders.push(doc.data());
      });
      setSliderList(sliders);
    };

    GetSliderList();
  }, []);

  return (
    <View>
      {/* <Text style={styles.text}>#Special for you </Text> */}
      <FlatList
        data={sliderList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{paddingLeft:10, marginTop:10}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: 280,
                height: 150,
                borderRadius:15,
                marginRight:10
              }}
            />
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
