import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    TextInput, ScrollView, ToastAndroid, ActivityIndicator
  } from "react-native";
  import { setDoc, doc } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
  import { useNavigation, router } from "expo-router";
  import * as ImagePicker from "expo-image-picker";       
  import { db, storage } from "../../configs/FirebaseConfig";
  import { WindowWidth } from "../../GlobalCSS";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import { useUser } from "@clerk/clerk-expo";
  import { MaterialIcons } from '@expo/vector-icons';  
  import { serverTimestamp } from 'firebase/firestore';
  
  export default function ApplyForHelp() {
    const navigation = useNavigation();
    const { user } = useUser();
    const [Name, setName] = useState();
    const [contact, setContact] = useState();
    const [email, setEmail] = useState();
    const [amountReq, setAmountReq] = useState();
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [landmark, setLandmark] = useState();
    const [city, setCity] = useState();
    const [pinCode, setPinCode] = useState();
    const [upiId, setUpiId] = useState();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);  // Array to store multiple images
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);  // Custom checkbox state
  
    useEffect(() => {
      navigation.setOptions({
        headerTitle: "Submit a Request",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#8c1aff",
          backgroundColor: "#8c1aff",
        },
        headerTitleStyle: {
          fontSize: 18,
          color: '#ffffff',
          fontFamily: 'outfit',
        },
      });
    }, []);
  
    const onImagePick = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,  // Allow multiple image selection
        quality: 1,  // Keep image quality high
      });
  
      if (!result.canceled) {
        setImages(result.assets.map(asset => asset.uri));  // Store the URIs of selected images
      }
    };
  
    const onSubmitReq = async () => {
      if (!disclaimerAccepted) {
        ToastAndroid.show("Please accept the disclaimer to proceed", ToastAndroid.LONG);
        return;
      }
  
      setLoading(true);
  
      // Upload each image and get its URL
      const imageUrls = await Promise.all(images.map(async (imageUri, index) => {
        const fileName = Date.now().toString() + `_${index}.jpg`;
        const resp = await fetch(imageUri);
        const blob = await resp.blob();
  
        const imageRef = ref(storage, "DaanSethu/" + fileName);
  
        await uploadBytes(imageRef, blob);
        const downloadUrl = await getDownloadURL(imageRef);
        return downloadUrl;
      }));
  
      HelpRequest(imageUrls);  // Pass the array of image URLs to the function
      setLoading(false);
    };
  
    const HelpRequest = async (imageUrls) => {
      await setDoc(doc(db, "HelpRequest", Date.now().toString()), {
        Name,
        contact,
        email,
        amountReq,
        description,
        address,
        landmark,
        city,
        pinCode,
        upiId,
        username: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        imageUrls,  
        createdAt: serverTimestamp(),
      });
  
      ToastAndroid.show("Request has been submitted", ToastAndroid.LONG);
      router.back();
    };
  
    return (
      <ScrollView style={styles.cont}>
        <Text style={styles.descTxt}>
          Fill all the details and supporting documents in order to submit a request
        </Text>
  
        {/* Image Picker */}
        <TouchableOpacity style={styles.imgBtn} onPress={onImagePick}>
          <Text style={styles.imgPickerText}>Select Images</Text>
        </TouchableOpacity>
  
        {/* Display selected images */}
        <ScrollView horizontal style={styles.imagePreviewContainer}>
          {images.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.img} />
          ))}
        </ScrollView>
  
        <View>
          <TextInput
            placeholder="Full Name"
            onChangeText={setName}
            style={styles.txtIn}
          />
          <TextInput
            placeholder="Contact No"
            onChangeText={setContact}
            style={styles.txtIn}
          />
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            style={styles.txtIn}
          />
          <TextInput
            placeholder="Amount Required"
            onChangeText={setAmountReq}
            style={styles.txtIn}
          />
          <TextInput
            placeholder="Describe why you are requesting for help"
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={styles.txtIn}
          />
          <TextInput
            placeholder="Address"
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
            style={styles.txtIn}
          />
          <TextInput
            placeholder="Landmark"
            onChangeText={setLandmark}
            style={styles.txtIn}
          />
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TextInput
              placeholder="City"
              onChangeText={setCity}
              style={styles.txtIn1}
            />
            <TextInput
              placeholder="Pin Code"
              onChangeText={setPinCode}
              style={styles.txtIn2}
            />
          </View>
          <TextInput
            placeholder="UPI Id"
            onChangeText={setUpiId}
            style={styles.txtIn}
          />
  
          {/* Custom Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => setDisclaimerAccepted(!disclaimerAccepted)}
              style={styles.checkbox}
            >
              {disclaimerAccepted ? (
                <MaterialIcons name="check-box" size={24} color="#8c6fff" />
              ) : (
                <MaterialIcons name="check-box-outline-blank" size={24} color="#8c6fff" />
              )}
            </TouchableOpacity>
            <Text style={styles.disclaimerText}>
              I hereby declare that the information provided is accurate to the best of my knowledge.
            </Text>
          </View>
  
          <TouchableOpacity disabled={loading} style={[styles.btn, { opacity: disclaimerAccepted ? 1 : 0.5 }]} onPress={onSubmitReq}>
            {loading ? (
              <ActivityIndicator size={"large"} color={"#fff"} />
            ) : (
              <Text style={styles.btnTxt}>Submit Request</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ paddingBottom: 50 }} />
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    btn: {
      padding: 15,
      backgroundColor: "#8c6fff",
      borderRadius: 5,
      marginTop: 20,
      width: WindowWidth * 0.6,
      alignSelf: 'center',
    },
    btnTxt: {
      fontFamily: "outfitmedium",
      textAlign: "center",
      color: "#fff",
      fontSize: 15,
    },
    cont: {
      padding: 10,
    },
    descTxt: {
      fontFamily: "outfit",
      color: "gray",
      textAlign: 'justify'
    },
    img: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginHorizontal: 5,
      borderColor: "#8c6fff",
      borderWidth: 1.2,
    },
    imgBtn: {
      marginTop: 20,
      alignItems: 'center',
    },
    imgPickerText: {
      fontFamily: "outfitmedium",
      color: "#8c6fff",
      fontSize: 16,
    },
    imagePreviewContainer: {
      marginTop: 10,
      flexDirection: 'row',
    },
    txtIn: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      fontSize: 17,
      fontFamily: "outfit",
      marginTop: 10,
      backgroundColor: "#fff",
      borderColor: "#8c6fff",
    },
    txtIn1: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      fontSize: 17,
      fontFamily: "outfit",
      marginTop: 10,
      marginRight: 5,
      backgroundColor: "#fff",
      borderColor: "#8c6fff",
    },
    txtIn2: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      fontSize: 17,
      fontFamily: "outfit",
      marginTop: 10,
      marginLeft: 5,
      backgroundColor: "#fff",
      borderColor: "#8c6fff",
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    checkbox: {
      marginRight: 10,
    },
    disclaimerText: {
      fontFamily: "outfit",
      fontSize: 15,
      color: "gray",
      marginRight:6,
      textAlign:"center"   
     },
  });
  