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

export default function PopularFoodCard({ foods }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const handleCall = () => {
    Linking.openURL(`tel:${foods.contact}`);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => setImageModalVisible(true)}>
            <Image source={{ uri: foods?.imageUrl }} style={styles.image} />
          </TouchableOpacity>
          <View>
            <Text style={styles.foodName}>{foods.foodName}</Text>
            <Text style={styles.info}>Experies Time: {foods.experiesTime}</Text>
            <Text style={styles.info}>City: {foods.city}</Text>
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
          <TouchableOpacity onPress={() => setImageModalVisible(true)}>
            <Image source={{ uri: foods?.imageUrl }} style={styles.image1} />
          </TouchableOpacity>
          <View style={styles.subcont}>
            <Text style={styles.foodName}>{foods.foodName}</Text>
            <Text style={styles.description}>{foods.description}</Text>
            <Text style={styles.info}>Prepared Time: {foods.preparedTime}  Experies Time: {foods.experiesTime} </Text>
            <Text style={styles.info}>Address: {foods.address}</Text>
            <Text style={styles.info}>City: {foods.city}  Pin code: {foods.pinCode}</Text>
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

      {/* Fullscreen Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.imageModalContainer}>
          <TouchableOpacity
            style={styles.closeImageModal}
            onPress={() => setImageModalVisible(false)}
          >
            <Text style={styles.closeTxt}>X</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: foods?.imageUrl }}
            style={styles.fullscreenImage}
          />
        </View>
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
    width: 220,
    height: 160,
    borderRadius: 15,
    marginBottom: 2,
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
    fontSize: 15,
    color: "gray",
    textAlign: "center",
    paddingBottom: 5,
  },
  info: {
    fontFamily: "outfit",
    fontSize: 15,
    color: "gray",
    textAlign: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  orderBtn: {
    width: WindowWidth * 0.35,
    height: WindowHeight * 0.05,
    backgroundColor: "#8c1aff",
    borderRadius: 5,
    marginHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  orderTxt: {
    fontFamily: "outfitmedium",
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  closeBtn: {
    width: WindowWidth * 0.35,
    height: WindowHeight * 0.05,
    backgroundColor: "#8c1aff",
    borderRadius: 5,
    marginHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  closeTxt: {
    color: "#fff",
    fontFamily: "outfitmedium",
    textAlign: "center",
    fontSize: 16,
  },
  imageModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  closeImageModal: {
    position: "absolute",
    top: 100,
    right: 20,
    borderRadius: 5,
    padding: 10,
  },
});
