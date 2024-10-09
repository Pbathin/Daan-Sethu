// //Sample Testing code 
// // Present error is, TypeError: Cannot read property 'dismiss' of undefined
// //This error is located at: in RNDateTimePickerAndroid (created by DonateFood), js engine: hermes


// import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, ToastAndroid, ActivityIndicator, Platform, Button } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useNavigation } from 'expo-router'
// import * as ImagePicker from 'expo-image-picker';
// import { db, storage } from '../../configs/FirebaseConfig'
// import { setDoc, doc } from 'firebase/firestore';
// import { WindowWidth } from '../../GlobalCSS';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { useUser } from '@clerk/clerk-expo'
// import { Picker } from '@react-native-picker/picker'
// import DateTimePicker from '@react-native-community/datetimepicker';

// export default function DonateFoodEx() {
//     const navigation = useNavigation();
//     const [image, setImage] = useState(null);
//     const { user } = useUser();
//     const [foodName, setFoodName] = useState('');
//     const [foodType, setFoodType] = useState('');
//     const [preparedTime, setPreparedTime] = useState(null);
//     const [experiesTime, setExperiesTime] = useState(null);
//     const [contact, setContact] = useState('');
//     const [description, setDescription] = useState('');
//     const [address, setAddress] = useState('');
//     const [landmark, setLandmark] = useState('');
//     const [city, setCity] = useState('');
//     const [pinCode, setPinCode] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const [showPreparedTimePicker, setShowPreparedTimePicker] = useState(false);
//     const [showExperiesTimePicker, setShowExperiesTimePicker] = useState(false);

//     useEffect(() => {
//         navigation.setOptions({
//             headerTitle: 'Donate Food',
//             headerShown: true,
//             headerStyle: {
//                 backgroundColor: '#8c6fff',
//             },
//             headerTitleStyle: {
//                 fontSize: 18,
//                 color: '#ffffff',
//                 fontFamily: 'outfit',
//             },
//         });
//     }, []);

//     const validateForm = () => {
//         if (!foodName || !foodType || !preparedTime || !experiesTime || !contact || !address || !city || !pinCode || !image) {
//             setError('Please fill all the fields and upload an image');
//             return false;
//         }
//         return true;
//     }

//     const onImagePick = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             setImage(result.assets[0].uri);
//         }
//     }

//     const onDonateFood = async () => {
//         if (!validateForm()) {
//             return;
//         }
//         setLoading(true);
//         setError(null);

//         try {
//             const fileName = Date.now().toString() + ".jpg";
//             const resp = await fetch(image);
//             const blob = await resp.blob();

//             const imageRef = ref(storage, 'DaanSethu/' + fileName);
//             await uploadBytes(imageRef, blob);
//             const downloadUrl = await getDownloadURL(imageRef);

//             await saveFoodList(downloadUrl);
//             ToastAndroid.show('New food added...', ToastAndroid.LONG);
//             navigation.goBack(); // Navigate back after success
//         } catch (err) {
//             setError('Failed to upload. Please try again.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     }

//     const saveFoodList = async (imageUrl) => {
//         try {
//             await setDoc(doc(db, 'FoodList', Date.now().toString()), {
//                 foodName: foodName,
//                 foodType: foodType,
//                 preparedTime: preparedTime.getTime(),  // Storing as timestamp
//                 experiesTime: experiesTime.getTime(),  // Storing as timestamp
//                 contact: contact,
//                 description: description,
//                 address: address,
//                 landmark: landmark,
//                 city: city,
//                 pinCode: pinCode,
//                 username: user?.fullName,
//                 userEmail: user?.primaryEmailAddress?.emailAddress,
//                 userImage: user?.imageUrl,
//                 imageUrl: imageUrl,
//             });
//         } catch (err) {
//             throw new Error('Error saving food details');
//         }
//     }

//     const onChangePreparedTime = (event, selectedDate) => {
//         if (event.type === 'set') {
//             const currentDate = selectedDate || preparedTime;
//             setPreparedTime(currentDate);
//         }
//         setShowPreparedTimePicker(false);
//     };
    
//     const onChangeExperiesTime = (event, selectedDate) => {
//         if (event.type === 'set') {
//             const currentDate = selectedDate || experiesTime;
//             setExperiesTime(currentDate);
//         }
//         setShowExperiesTimePicker(false);
//     };
    

//     return (
//         <ScrollView style={{ padding: 10 }}>
//             <Text style={{ fontFamily: 'outfit', color: "gray" }}>Fill all the details in order to Donate Food</Text>

//             {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}

//             <TouchableOpacity style={{ marginTop: 20 }} onPress={() => onImagePick()}>
//                 {!image ? (
//                     <Image source={require('../../assets/images/cam_icon.png')}
//                         style={{
//                             width: 150,
//                             height: 100,
//                             borderRadius: 15,
//                             borderColor: '#8c6fff',
//                             borderWidth: 1.2,
//                             alignSelf: 'center'
//                         }}
//                     />
//                 ) : (
//                     <Image source={{ uri: image }}
//                         style={{
//                             width: 200,
//                             height: 150,
//                             borderRadius: 15,
//                             borderColor: '#8c6fff',
//                             borderWidth: 1.2,
//                             alignSelf: 'center'
//                         }}
//                     />
//                 )}
//             </TouchableOpacity>

//             <TextInput placeholder='Food Name' value={foodName} onChangeText={setFoodName}
//                 style={styles.input} />
//             <Picker selectedValue={foodType} onValueChange={setFoodType}>
//                 <Picker.Item label="Select Food Type" value="" />
//                 <Picker.Item label="Veg" value="Veg" />
//                 <Picker.Item label="Non-Veg" value="Non-Veg" />
//             </Picker>

//             {/* Prepared Time Picker */}
//             <View>
//                 <Button title="Set Prepared Time" onPress={() => setShowPreparedTimePicker(true)} />
//                 {preparedTime && (
//                     <Text>Prepared Time: {preparedTime.toLocaleString()}</Text>
//                 )}
//                 {showPreparedTimePicker && (
//                     <DateTimePicker
//                         value={preparedTime ? new Date(preparedTime) : new Date()}
//                         mode="datetime"
//                         display="default"
//                         onChange={onChangePreparedTime}
//                     />
//                 )}
//             </View>

//             {/* Expiry Time Picker */}
//             <View>
//                 <Button title="Set Expiry Time" onPress={() => setShowExperiesTimePicker(true)} />
//                 {experiesTime && (
//                     <Text>Expiry Time: {experiesTime.toLocaleString()}</Text>
//                 )}
//                 {showExperiesTimePicker && (
//                     <DateTimePicker
//                         value={experiesTime ? new Date(experiesTime) : new Date()}
//                         mode="datetime"
//                         display="default"
//                         onChange={onChangeExperiesTime}
//                     />
//                 )}
//             </View>

//             <TextInput placeholder='Contact No' value={contact} onChangeText={setContact} style={styles.input} />
//             <TextInput placeholder='Description' value={description} onChangeText={setDescription} multiline style={styles.input} />
//             <TextInput placeholder='Address' value={address} onChangeText={setAddress} multiline style={styles.input} />
//             <TextInput placeholder='Landmark' value={landmark} onChangeText={setLandmark} style={styles.input} />

//             <View style={{ flexDirection: 'row' }}>
//                 <TextInput placeholder='City' value={city} onChangeText={setCity} style={[styles.input, styles.halfInput]} />
//                 <TextInput placeholder='Pin Code' value={pinCode} onChangeText={setPinCode} style={[styles.input, styles.halfInput]} />
//             </View>

//             <TouchableOpacity disabled={loading} style={styles.button} onPress={onDonateFood}>
//                 {loading ? <ActivityIndicator size={'large'} color={'#fff'} /> : <Text style={styles.buttonText}>Donate Food</Text>}
//             </TouchableOpacity>

//             <View style={{ paddingBottom: 50 }} />
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     input: {
//         padding: 10,
//         borderWidth: 1,
//         borderRadius: 5,
//         fontSize: 17,
//         fontFamily: 'outfit',
//         marginTop: 10,
//         backgroundColor: '#fff',
//         borderColor: '#8c6fff'
//     },
//     halfInput: {
//         width: WindowWidth * 0.45,
//         marginRight: 10
//     },
//     button: {
//         padding: 15,
//         backgroundColor: "#8c6fff",
//         borderRadius: 5,
//         marginTop: 20
//     },
//     buttonText: {
//         fontFamily: 'outfitmedium',
//         textAlign: 'center',
//         color: '#fff',
//         fontSize: 15
//     }
// });


//-----------------------------------------------------------------------------------
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../../configs/FirebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { WindowWidth } from '../../GlobalCSS';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';

export default function DonateFood() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const { user } = useUser();
    const [foodName, setFoodName] = useState('');
    const [foodType, setFoodType] = useState('');
    const [preparedTime, setPreparedTime] = useState('');
    const [experiesTime, setExperiesTime] = useState('');
    const [contact, setContact] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Donate Food',
            headerShown: true,
            headerStyle: {
                backgroundColor: '#8c6fff',
            },
            headerTitleStyle: {
                fontSize: 18,
                color: '#ffffff',
                fontFamily: 'outfit',
            },
        });
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                ToastAndroid.show('Permission to access location was denied', ToastAndroid.LONG);
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
        })();
    }, [navigation]);

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onDonateFood = async () => {
        if (!image || !foodName || !foodType || !preparedTime || !experiesTime || !contact || !description || !address || !landmark || !city || !pinCode) {
            return ToastAndroid.show('Please fill in all fields', ToastAndroid.LONG);
        }

        setLoading(true);
        const fileName = `${Date.now()}.jpg`;
        const resp = await fetch(image);
        const blob = await resp.blob();
        const imageRef = ref(storage, `DaanSethu/${fileName}`);

        try {
            await uploadBytes(imageRef, blob);
            const downloadUrl = await getDownloadURL(imageRef);
            await saveFoodList(downloadUrl);
        } catch (error) {
            console.error("Upload failed", error);
            ToastAndroid.show('Upload failed, please try again', ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };

    const saveFoodList = async (imageUrl) => {
        const timestamp = new Date().toISOString(); // Get current timestamp
        
        try {
            await setDoc(doc(db, 'FoodList', Date.now().toString()), {
                foodName,
                foodType,
                preparedTime,
                experiesTime,
                contact,
                description,
                address,
                landmark,
                city,
                pinCode,
                latitude,  // Save latitude
                longitude, // Save longitude
                username: user?.fullName,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userImage: user?.imageUrl,
                imageUrl,
                timestamp, // Save the timestamp
            });
            ToastAndroid.show('New food added...', ToastAndroid.LONG);
            navigation.goBack(); // Go back to the previous screen after successful donation
        } catch (error) {
            console.error("Error saving food list", error);
            ToastAndroid.show('Failed to add food, please try again', ToastAndroid.LONG);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.instructionText}>
                Fill all the details in order to Donate Foods
            </Text>
            <TouchableOpacity style={styles.imagePicker} onPress={onImagePick}>
                {!image ? (
                    <Image source={require('../../assets/images/cam_icon.png')} style={styles.image} />
                ) : (
                    <Image source={{ uri: image }} style={styles.image} />
                )}
            </TouchableOpacity>
            <View>
                <TextInput placeholder='Food Name' onChangeText={setFoodName} style={styles.TxtIp} />
                <View style={styles.TxtIp}>
                    <Picker selectedValue={foodType} onValueChange={setFoodType}>
                        <Picker.Item label="Select from below" value="" />
                        <Picker.Item label="Veg" value="Veg" />
                        <Picker.Item label="Non-veg" value="Non-veg" />
                    </Picker>
                </View>
                <TextInput placeholder='Prepared Time' onChangeText={setPreparedTime} style={styles.TxtIp} />
                <TextInput placeholder='Experies Time' onChangeText={setExperiesTime} style={styles.TxtIp} />
                <TextInput placeholder='Contact No' onChangeText={setContact} style={styles.TxtIp} />
                <TextInput placeholder='Description' onChangeText={setDescription} multiline numberOfLines={3} style={styles.TxtIp} />
                <TextInput placeholder='Address' onChangeText={setAddress} multiline numberOfLines={3} style={styles.TxtIp} />
                <TextInput placeholder='Landmark' onChangeText={setLandmark} style={styles.TxtIp} />
                <View style={styles.cityPinContainer}>
                    <TextInput placeholder='City' onChangeText={setCity} style={styles.cityPinInput} />
                    <TextInput placeholder='Pin Code' onChangeText={setPinCode} style={styles.cityPinInput} />
                </View>
                <TouchableOpacity disabled={loading} style={styles.btn} onPress={onDonateFood}>
                    {loading ? <ActivityIndicator size='large' color='#fff' /> : <Text style={styles.btnTxt}>Donate Food</Text>}
                </TouchableOpacity>
            </View>
            <View style={styles.bottomSpacing} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    instructionText: {
        fontFamily: 'outfit',
        color: "gray",
    },
    imagePicker: {
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 150,
        borderRadius: 15,
        borderColor: '#8c6fff',
        borderWidth: 1.2,
        alignSelf: 'center',
    },
    TxtIp: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 17,
        fontFamily: 'outfit',
        marginTop: 10,
        backgroundColor: '#fff',
        borderColor: '#8c6fff',
    },
    cityPinContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    cityPinInput: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 17,
        fontFamily: 'outfit',
        marginTop: 10,
        backgroundColor: '#fff',
        borderColor: '#8c6fff',
        width: WindowWidth * 0.45,
        marginRight: 10,
    },
    btn: {
        padding: 15,
        backgroundColor: "#8c6fff",
        borderRadius: 5,
        marginTop: 20,
    },
    btnTxt: {
        fontFamily: 'outfitmedium',
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
    },
    bottomSpacing: {
        paddingBottom: 50,
    },
});