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
import {
    setDoc,
    doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "./../../configs/FirebaseConfig";
import { WindowWidth } from "../../GlobalCSS";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { serverTimestamp } from 'firebase/firestore';

export default function AddOrganization() {

    const navigation = useNavigation();
    const { user } = useUser();
    const [orgId, setOrgId] = useState();
    const [orgName, setOrgName] = useState();
    const [orgType, setOrgType] = useState();
    const [contact, setContact] = useState();
    const [email, setEmail] = useState();
    const [noOfStrength, setNoOfStrength] = useState();
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [landmark, setLandmark] = useState();
    const [city, setCity] = useState();
    const [pinCode, setPinCode] = useState();
    const [upiId, setUpiId] = useState();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);  // Array to store multiple images
    

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Add Organization",
            headerShown: true,
            headerStyle: {
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


    const onAddOrg = async () => {
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

        pendingOrgList(imageUrls);  // Pass the array of image URLs to the function
        setLoading(false);
    };

    const pendingOrgList = async (imageUrls) => {
        await setDoc(doc(db, "pendingOrgList", Date.now().toString()), {
            orgId: orgId,
            orgName: orgName,
            orgType: orgType,
            contact: contact,
            email: email,
            noOfStrength: noOfStrength,
            description: description,
            address: address,
            landmark: landmark,
            city: city,
            pinCode: pinCode,
            upiId: upiId,
            username: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
            imageUrls: imageUrls,  // Store array of image URLs
            createdAt: serverTimestamp(),
        });

        ToastAndroid.show("Org Waiting for verfication...", ToastAndroid.LONG);
        router.back();
    };

    return (
        <ScrollView style={styles.cont}>
            <Text style={styles.descTxt}>
                Fill all the details in order to add your Organization
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
                    placeholder="Organization Id"
                    onChangeText={(v) => setOrgId(v)}
                    style={styles.txtIn}
                />
                <TextInput
                    placeholder="Name of Organization"
                    onChangeText={(v) => setOrgName(v)}
                    style={styles.txtIn}
                />

                <View >
                    <RNPickerSelect
                        onValueChange={orgType => setOrgType(orgType)}
                        items={[
                            { label: 'Orphanage', value: 'Orphanage' },
                            { label: 'Old Age Home', value: 'Old Age Home' },
                            { label: 'Rehabilitation Center', value: 'Rehabilitation Center' }
                        ]}
                        placeholder={{
                            label: 'Organization type',
                            value: null,
                            color: '#9EA0A4',
                        }}
                        style={{
                            inputIOS: {
                                fontSize: 17,
                                fontFamily: "outfit",
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: "#8c6fff",
                                borderRadius: 4,
                                color: "#000",
                                backgroundColor: "#fff",
                                marginTop: 5
                            },
                            inputAndroid: {
                                fontSize: 17,
                                fontFamily: "outfit",
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: "#8c6fff",
                                borderRadius: 4,
                                color: "#000",
                                backgroundColor: "#fff",
                                marginTop: 10
                            },
                            placeholder: {
                                color: 'gray',
                                fontFamily: 'outfit',
                                fontSize: 17,
                            },
                            viewContainer: {
                                fontFamily: 'outfit',
                            },
                            inputIOSContainer: {
                                fontFamily: 'outfit',
                            },
                            inputAndroidContainer: {
                                fontFamily: 'outfit',
                            },
                            itemStyle: {
                                fontFamily: 'outfit',  // Font family for the dropdown items
                                fontSize: 17,
                            },
                        }}
                        useNativeAndroidPickerStyle={false} // Use custom styling
                    />
                </View>

                <TextInput
                    placeholder="Contact No"
                    onChangeText={(v) => setContact(v)}
                    style={styles.txtIn}
                />
                <TextInput
                    placeholder="Email"
                    onChangeText={(v) => setEmail(v)}
                    style={styles.txtIn}
                />
                <TextInput
                    placeholder="No of strength"
                    onChangeText={(v) => setNoOfStrength(v)}
                    style={styles.txtIn}
                />
                <TextInput
                    placeholder="Description"
                    onChangeText={(v) => setDescription(v)}
                    multiline
                    numberOfLines={3}
                    style={styles.txtIn}
                />
                <TextInput
                    placeholder="Address"
                    onChangeText={(v) => setAddress(v)}
                    multiline
                    numberOfLines={3}
                    style={styles.txtIn}
                />
                <TextInput
                    placeholder="Landmark"
                    onChangeText={(v) => setLandmark(v)}
                    style={styles.txtIn}
                />
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <TextInput
                        placeholder="City"
                        onChangeText={(v) => setCity(v)}
                        style={styles.txtIn1}
                    />
                    <TextInput
                        placeholder="Pin Code"
                        onChangeText={(v) => setPinCode(v)}
                        style={styles.txtIn2}
                    />
                </View>
                <TextInput
                    placeholder="UPI Id"
                    onChangeText={(v) => setUpiId(v)}
                    style={styles.txtIn}
                />
                <TouchableOpacity disabled={loading} style={styles.btn} onPress={onAddOrg}>
                    {loading ? (
                        <ActivityIndicator size={"large"} color={"#fff"} />
                    ) : (
                        <Text style={styles.btnTxt}>Add Organization</Text>
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
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 17,
        fontFamily: "outfit",
        marginTop: 10,
        backgroundColor: "#fff",
        borderColor: "#8c6fff",
        width: WindowWidth * 0.45,
        marginRight: 10,
    },
    txtIn2: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 17,
        fontFamily: "outfit",
        marginTop: 10,
        backgroundColor: "#fff",
        borderColor: "#8c6fff",
        width: WindowWidth * 0.46,
    },
    pickerContainer: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 17,
        fontFamily: "outfit",
        marginTop: 10,
        backgroundColor: "#fff",
        borderColor: "#8c6fff",
    },

});
