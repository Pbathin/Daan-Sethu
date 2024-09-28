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
    getDocs,
    query,
    collection,
    document,
    data,
    setDoc,
    doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "./../../configs/FirebaseConfig";
import { WindowWidth, WindowHeight } from "../../GlobalCSS";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import { Picker } from '@react-native-picker/picker'

export default function AddOrganization() {

    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const { user } = useUser();
    const [orgId, setOrgId] = useState();
    const [orgName, setOrgName] = useState();
    const [orgType, setOrgType] = useState();
    const [contact, setContact] = useState();
    const [noOfStrength, setNoOfStrength] = useState();
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [landmark, setLandmark] = useState();
    const [city, setCity] = useState();
    const [pinCode, setPinCode] = useState();
    const [upiId, setUpiId] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Add Organization",
            headerShown: true,
            headerStyle: {
                backgroundColor: "#8c6fff",
            },
            headerTitleStyle: {
                fontSize: 18,
                color: '#ffffff',
                fontFamily: 'outfit',
            },
        });
        // GetCategoryList();
    }, []);

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        setImage(result?.assets[0].uri);
        console.log(result);
    };

    const onAddOrg = async () => {
        setLoading(true);
        const fileName = Date.now().toString() + ".jpg";
        const resp = await fetch(image);
        const blob = await resp.blob();

        const imageRef = ref(storage, "DaanSethu/" + fileName);

        uploadBytes(imageRef, blob)
            .then((snapshot) => {
                console.log("File Uploaded..");
            })
            .then((resp) => {
                getDownloadURL(imageRef).then(async (downloadUrl) => {
                    console.log(downloadUrl);
                    saveOrgList(downloadUrl);
                });
            });
        setLoading(false);
    };

    const saveOrgList = async (imageUrl) => {
        await setDoc(doc(db, "orgList", Date.now().toString()), {
            orgId: orgId,
            orgName: orgName,
            orgType: orgType,
            contact: contact,
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
            imageUrl: imageUrl,
        });
        setLoading(false);
        ToastAndroid.show("New org added...", ToastAndroid.LONG);
    };

    return (
        <ScrollView
            style={styles.cont}
        >
            {/* <Text
                style={styles.headTxt}
            >
                Add Organization
            </Text> */}
            <Text
                style={styles.descTxt}
            >
                Fill all the details in order to add your Organization
            </Text>
            <TouchableOpacity
                style={styles.imgBtn}
                onPress={() => onImagePick()}
            >
                {!image ? (
                    <Image
                        source={require("../../assets/images/cam_icon.png")}
                        style={styles.imgPicker}
                    />
                ) : (
                    <Image
                        source={{ uri: image }}
                        style={styles.img}
                    />
                )}
            </TouchableOpacity>
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
                <View style={styles.txtIn}>
                    <Picker
                        selectedValue={orgType}
                        onValueChange={orgType => setOrgType(orgType)}>
                        <Picker.Item label="Select from below" value=" " />
                        <Picker.Item label="Orphanage" value="Orphanage" />
                        <Picker.Item label="Old Age Home" value="Old Age Home" />
                    </Picker>
                </View>
                <TextInput
                    placeholder="Contact No"
                    onChangeText={(v) => setContact(v)}
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
                    placeholder="Addrees"
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
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
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
                <TouchableOpacity
                    disabled={loading}
                    style={styles.btn}
                    onPress={() => onAddOrg()}
                >
                    {loading ? (
                        <ActivityIndicator size={"large"} color={"#fff"} />
                    ) : (
                        <Text
                            style={styles.btnTxt}
                        >
                            Add Organization
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
            <View
                style={{
                    paddingBottom: 50,
                }}
            />
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
        width: 200,
        height: 150,
        borderRadius: 15,
        borderColor: "#8c6fff",
        borderWidth: 1.2,
        alignSelf: "center",
    },
    imgBtn: {
        marginTop: 20,
    },
    imgPicker: {
        width: 150,
        height: 100,
        borderRadius: 15,
        borderColor: "#8c6fff",
        borderWidth: 1.2,
        alignSelf: "center",
    },
    headTxt: {
        fontFamily: "outfitbold",
        fontSize: 25,
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
});
