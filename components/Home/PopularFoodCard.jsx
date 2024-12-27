// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
// import React from 'react'

// export default function PopularFoodCard({ foods }) {
//     return (
//         <TouchableOpacity>
//             <View style={{
//                 marginLeft: 15,
//                 padding: 10,
//                 backgroundColor: "#fff",
//                 borderRadius: 15,
//                 width: 230,
//                 height: 'auto',
//             }}>
//                 <Image source={{ uri: foods?.imageUrl }}
//                     style={{
//                         width: 210,
//                         height: 140,
//                         borderRadius: 15,
//                         marginBottom: 5
//                     }}
//                 />
//                 <View>
//                     <Text style={{
//                         fontFamily: 'outfitbold',
//                         fontSize: 17,
//                         textAlign: 'center',
//                         paddingBottom: 3
//                     }}>{foods.foodName}</Text>
//                     <Text style={{
//                         fontFamily: 'outfit',
//                         fontSize: 13,
//                         color: 'gray',
//                         textAlign: 'justify',
//                         paddingBottom: 5
//                     }}>{foods.description}</Text>

//                     <Text style={{
//                         fontFamily: 'outfit',
//                         fontSize: 13,
//                         color: 'gray',
//                         textAlign: 'justify',
//                         paddingBottom: 5
//                     }}>Address:  {foods.address}</Text>
//                     <Text style={{
//                         fontFamily: 'outfit',
//                         fontSize: 13,
//                         color: 'gray',
//                         textAlign: 'justify',
//                         paddingBottom: 5
//                     }}>City:  {foods.city}</Text>
//                     <Text style={{
//                         fontFamily: 'outfit',
//                         fontSize: 13,
//                         color: 'gray',
//                         textAlign: 'justify',
//                         paddingBottom: 5
//                     }}>Landmark:  {foods.landmark}</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     )
// }

//--------------------------------------------------------------------------------------------

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {WindowWidth, WindowHeight} from "./../../GlobalCSS";

export default function PopularFoodCard({ foods }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.card}>
          <Image source={{ uri: foods?.imageUrl }} style={styles.image} />
          <View>
            <Text style={styles.foodName}>{foods.foodName}</Text>
            <Text style={styles.description}>{foods.description}</Text>
            <Text style={styles.info}>Address: {foods.address}</Text>
            <Text style={styles.info}>City: {foods.city}</Text>
            <Text style={styles.info}>Landmark: {foods.landmark}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Image source={{ uri: foods?.imageUrl }} style={styles.image1} />
          <View style={styles.subcont}>
            <Text style={styles.foodName}>{foods.foodName}</Text>
            <Text style={styles.description}>{foods.description}</Text>
            <Text style={styles.info}>Address: {foods.address}</Text>
            <Text style={styles.info}>City: {foods.city}</Text>
            <Text style={styles.info}>Landmark: {foods.landmark}</Text>
          </View>
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 12.91723, // Latitude for Mangaluru, Karnataka, India
            longitude: 74.85603, // Longitude for Mangaluru, Karnataka, India
            latitudeDelta: 0.0922, // Zoom level
            longitudeDelta: 0.0421, // Zoom level
          }}
        >
          <Marker
            coordinate={{ latitude: 12.91723, longitude: 74.85603 }}
            title="Default Location"
            description="This is the default marker"
          />
          
        </MapView>
        <TouchableOpacity
            style={styles.btn}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.txt}>Close</Text>
          </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 230,
    height: "auto",
  },
  image: {
    width: 210,
    height: 140,
    borderRadius: 15,
    marginBottom: 5,
  },
  image1: {
    width: 250,
    height: 190,
    borderRadius: 15,
    marginBottom: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  foodName: {
    fontFamily: "outfitbold",
    fontSize: 17,
    textAlign: "center",
    paddingBottom: 3,
  },
  description: {
    fontFamily: "outfit",
    fontSize: 13,
    color: "gray",
    textAlign: "justify",
    paddingBottom: 5,
  },
  info: {
    fontFamily: "outfit",
    fontSize: 13,
    color: "gray",
    textAlign: "justify",
    paddingBottom: 5,
  },
  modalContainer: {
    flex: 1,
    marginTop:25,
  },
  map: {
    flex: 1,
    
  },
  subcont: {
    padding: 25,
  },
  btn: {
    height: WindowHeight*0.039,
    width: WindowWidth*0.3,
    backgroundColor: "#8c1aff",
    alignSelf: "center",
    margin:10,
    borderRadius:5,
    paddingTop:3
  },
  txt: {
    color: "#fff",
    fontFamily: "outfitmedium",
    textAlign: "center",
    fontSize: 18,
  },
});
