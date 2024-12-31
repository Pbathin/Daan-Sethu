import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import { db } from '../../../configs/FirebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';

export default function DonationsForm() {
  const [images, setImages] = useState([]);
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [needOfMoney, setNeedOfMoney] = useState("");
  const [amountDonated, setAmountDonated] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Submit Proofs",
      headerShown: true,
      headerStyle: {
        backgroundColor: "#8c1aff",
      },
      headerTitleStyle: {
        fontSize: 18,
        color: "#ffffff",
        fontFamily: "outfit",
      },
    });
  }, [navigation]);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const onSubmit = async () => {
    if (
      !beneficiaryName ||
      !needOfMoney ||
      !amountDonated ||
      !description ||
      !city ||
      !pinCode
    ) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "ADDonations"), {
        beneficiaryName,
        needOfMoney,
        amountDonated,
        description,
        city,
        pinCode,
        images,
        createdAt: serverTimestamp(),
      });

      setLoading(false);
      ToastAndroid.show(
        "Donation details submitted successfully!",
        ToastAndroid.LONG
      );
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(
        "Failed to submit donation details. Please try again.",
        ToastAndroid.LONG
      );
      console.error("Error adding document: ", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Donation Details</Text>

      <TouchableOpacity style={styles.imgBtn} onPress={onImagePick}>
        <Text style={styles.imgPickerText}>Select Images</Text>
      </TouchableOpacity>

      <ScrollView horizontal style={styles.imagePreviewContainer}>
        {images.map((imageUri, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.img} />
            <TouchableOpacity
              onPress={() => setImages(images.filter((_, i) => i !== index))}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TextInput
        placeholder="Name of Beneficiary"
        value={beneficiaryName}
        onChangeText={setBeneficiaryName}
        style={styles.input}
      />
      <TextInput
        placeholder="Need of Money"
        value={needOfMoney}
        onChangeText={setNeedOfMoney}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount Donated"
        value={amountDonated}
        onChangeText={setAmountDonated}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Date of Donation"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <TextInput
        placeholder="Pin Code"
        value={pinCode}
        onChangeText={setPinCode}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.submitBtn}
        onPress={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.submitText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imgBtn: {
    marginVertical: 2,
    alignItems: "center",
    padding: 10,
    // backgroundColor: "#8c6fff",
    borderRadius: 5,
  },
  imgPickerText: {
    color: "#8c6fff",
    fontSize: 16,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#8c6fff",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#8c6fff",
  },
  submitBtn: {
    padding: 15,
    backgroundColor: "#8c6fff",
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 2,
    right: 8,
    // backgroundColor: "red",
    borderRadius: 99,
    padding: 5,
    zIndex: 1,
    width:20
  },
  deleteButtonText: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
  },
});
