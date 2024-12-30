import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Linking
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { WindowWidth, WindowHeight } from "../../../GlobalCSS";

export default function PopGadgetCard({ item }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false); // State for full-screen image modal

  const handleCall = () => {
    Linking.openURL(`tel:${item.contact}`);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.card}>
          <Image source={{ uri: item?.imageUrl }} style={styles.image} />
          <View>
            <Text style={styles.gadgetName}> {item.gadgetName}</Text>
            <Text style={styles.description}> Brand: {item.brand}</Text>
            <Text style={styles.description}> Condition: {item.condition}</Text>
            <Text style={styles.info}> City: {item.city}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Main Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setImageModalVisible(true)}>
            <Image source={{ uri: item?.imageUrl }} style={styles.image1} />
          </TouchableOpacity>
          <View style={styles.subcont}>
            <Text style={styles.gadgetName}> {item.gadgetName}</Text>
            <Text style={styles.description}> {item.description}</Text>
            <Text style={styles.description}> Brand: {item.brand},        Model: {item.model}</Text>
            <Text style={styles.description}> Condition: {item.condition},        Quantity: {item.quantity}</Text>
            <Text style={styles.info}> Address: {item.address}</Text>
            <Text style={styles.info}> City: {item.city},        Pincode: {item.pinCode}</Text>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.orderBtn} onPress={handleCall}>
            <Text style={styles.orderTxt}>Place your order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeTxt}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Full-Screen Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.fullScreenModal}
          onPress={() => setImageModalVisible(false)}
        >
          <Image source={{ uri: item?.imageUrl }} style={styles.fullScreenImage} />
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
    marginBottom: 2,
    alignSelf: "center",
    marginTop: 20,
  },
  fullScreenModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  fullScreenImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  gadgetName: {
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
    fontSize: 15,
    color: "gray",
    textAlign: "justify",
    paddingBottom: 5,
  },
  modalContainer: {
    flex: 1.3,
    marginTop: 25,
  },
  map: {
    flex: 1,
  },
  subcont: {
    padding: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginVertical: 10, 
  },
  orderBtn: {
    width: WindowWidth * 0.35, 
    height: WindowHeight * 0.05, 
    backgroundColor: "#8c1aff",
    borderRadius: 5,
    marginHorizontal: 25, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderTxt: {
    fontFamily: 'outfitmedium',
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  closeBtn: {
    width: WindowWidth * 0.35, 
    height: WindowHeight * 0.05,
    backgroundColor: "#8c1aff",
    borderRadius: 5,
    marginHorizontal: 25, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeTxt: {
    color: "#fff",
    fontFamily: "outfitmedium",
    textAlign: "center",
    fontSize: 16,
  },
});
