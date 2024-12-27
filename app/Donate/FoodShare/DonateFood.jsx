import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../../../configs/FirebaseConfig'
import { setDoc, doc } from 'firebase/firestore';
import { WindowWidth } from '../../../GlobalCSS';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo'
import { Picker } from '@react-native-picker/picker'

export default function DonateFood() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const { user } = useUser();
    const [foodName, setFoodName] = useState();
    const [foodType, setFoodType] = useState();
    const [preparedTime, setPreparedTime] = useState();
    const [experiesTime, setExperiesTime] = useState();
    const [contact, setContact] = useState();
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [landmark, setLandmark] = useState();
    const [city, setCity] = useState();
    const [pinCode, setPinCode] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Donate Food',
            headerShown: true,
            headerStyle: {
                backgroundColor: '#8c1aff',
            },
            headerTitleStyle: {
                fontSize: 18,
                color: '#ffffff',
                fontFamily: 'outfit',
            },
        })
    }, [])

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        setImage(result?.assets[0].uri);
        console.log(result);
    }

    const onDonateFood = async () => {
        setLoading(true);
        const fileName = Date.now().toString() + ".jpg";
        const resp = await fetch(image);
        const blob = await resp.blob();

        const imageRef = ref(storage, 'DaanSethu/' + fileName);

        uploadBytes(imageRef, blob).then((snapshot) => {
            console.log("File Uploaded..");
        }).then(resp => {
            getDownloadURL(imageRef).then(async (downloadUrl) => {
                console.log(downloadUrl);
                saveFoodList(downloadUrl)
            })
        })
        setLoading(false);
    }

    const saveFoodList = async (imageUrl) => {
        await setDoc(doc(db, 'FoodList', Date.now().toString()), {
            foodName: foodName,
            foodType: foodType,
            preparedTime: preparedTime,
            experiesTime: experiesTime,
            contact: contact,
            description: description,
            address: address,
            landmark: landmark,
            city: city,
            pinCode: pinCode,
            username: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
            imageUrl: imageUrl,
        })
        setLoading(false);
        ToastAndroid.show('New food added...', ToastAndroid.LONG)
    }
    return (
        <ScrollView style={{
            padding: 10,
        }}>
            <Text style={{
                fontFamily: 'outfit',
                color: "gray"
            }}>Fill all the details in order to Donate Foods</Text>
            <TouchableOpacity style={{
                marginTop: 20,
            }}
                onPress={() => onImagePick()}
            >
                {!image ? <Image source={require('../../../assets/images/cam_icon.png')}
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 15,
                        borderColor: '#8c6fff',
                        borderWidth: 1.2,
                        alignSelf: 'center'

                    }}
                /> :
                    <Image source={{ uri: image }}
                        style={{
                            width: 200,
                            height: 150,
                            borderRadius: 15,
                            borderColor: '#8c6fff',
                            borderWidth: 1.2,
                            alignSelf: 'center'
                        }}
                    />
                }
            </TouchableOpacity>
            <View>
                <TextInput placeholder='Food Name'
                    onChangeText={(v) => setFoodName(v)}
                    style={styles.TxtIp}
                />
                <View style={styles.TxtIp}>
                    <Picker
                        selectedValue={foodType}
                        onValueChange={foodType => setFoodType(foodType)}>
                        <Picker.Item label="Select from below" value=" " />
                        <Picker.Item label="Veg" value="Veg" />
                        <Picker.Item label="Non-veg" value="Non-veg" />
                    </Picker>
                </View>
                <TextInput placeholder='Prepared Time'
                    onChangeText={(v) => setPreparedTime(v)}
                    style={styles.TxtIp}
                />
                <TextInput placeholder='Experies Time'
                    onChangeText={(v) => setExperiesTime(v)}
                    style={styles.TxtIp}
                />
                <TextInput placeholder='Contact No'
                    onChangeText={(v) => setContact(v)}
                    style={styles.TxtIp}
                />
                <TextInput placeholder='Description'
                    onChangeText={(v) => setDescription(v)}
                    multiline
                    numberOfLines={3}
                    style={styles.TxtIp}
                />
                <TextInput placeholder='Addrees'
                    onChangeText={(v) => setAddress(v)}
                    multiline
                    numberOfLines={3}
                    style={styles.TxtIp}
                />
                <TextInput placeholder='Landmark'
                    onChangeText={(v) => setLandmark(v)}
                    style={styles.TxtIp}
                />
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',

                }}>
                    <TextInput placeholder='City'
                        onChangeText={(v) => setCity(v)}
                        style={{
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 5,
                            fontSize: 17,
                            fontFamily: 'outfit',
                            marginTop: 10,
                            backgroundColor: '#fff',
                            borderColor: '#8c6fff',
                            width: WindowWidth * 0.45,
                            marginRight: 10
                        }}
                    />
                    <TextInput placeholder='Pin Code'
                        onChangeText={(v) => setPinCode(v)}
                        style={{
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 5,
                            fontSize: 17,
                            fontFamily: 'outfit',
                            marginTop: 10,
                            backgroundColor: '#fff',
                            borderColor: '#8c6fff',
                            width: WindowWidth * 0.46
                        }}
                    />
                </View>
                <TouchableOpacity
                    disabled={loading}
                    style={styles.btn}
                    onPress={() => onDonateFood()}>
                    {loading ?
                        <ActivityIndicator size={'large'} color={'#fff'} /> :
                        <Text style={styles.btnTxt}>Donate Food</Text>}
                </TouchableOpacity>
            </View>
            <View style={{
                paddingBottom: 50
            }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    TxtIp: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 17,
        fontFamily: 'outfit',
        marginTop: 10,
        backgroundColor: '#fff',
        borderColor: '#8c6fff'
    },
    btn :{
        padding: 15,
        backgroundColor: "#8c6fff",
        borderRadius: 5,
        marginTop: 20
    },
    btnTxt: {
        fontFamily: 'outfitmedium',
        textAlign: 'center',
        color: '#fff',
        fontSize: 15
    }
})