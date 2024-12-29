import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, ToastAndroid, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../configs/FirebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { Picker } from '@react-native-picker/picker';
import { Platform } from 'react-native';

export default function ApplyForVolunteers() {
    const navigation = useNavigation();
    const { user } = useUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [availability, setAvailability] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [govId, setGovId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Volunteers',
            headerShown: true,
            headerStyle: {
                backgroundColor: '#8c1aff',
            },
            headerTitleStyle: {
                fontSize: 18,
                color: '#ffffff',
                fontFamily: 'outfit',
            },
        });
    }, [navigation]); // Add dependency array to avoid infinite re-renders.

    const pickImage = async () => {
        // Request permission on Android
        if (Platform.OS === 'android') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                ToastAndroid.show('Permission to access media library is required!', ToastAndroid.LONG);
                return;
            }
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        // console.log('Image Picker Result:', result); // Log the entire result object
    
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const imageUri = result.assets[0].uri; // Access the URI from the first asset
            // console.log('Image URI:', imageUri);  // Log the URI to check
            setImage(imageUri);
        } else {
            ToastAndroid.show('No image selected or an error occurred.', ToastAndroid.LONG);
        }
    };
    
    

    const onSubmitVolunteerForm = async () => {
        if (!name || !contact || !areaOfInterest || !availability || !location || !govId || !image) {
            ToastAndroid.show('Please fill all fields', ToastAndroid.LONG);
            return;
        }

        setLoading(true);
        try {
            await setDoc(doc(db, 'PendingVolunteers', Date.now().toString()), {
                name: name,
                contact: contact,
                email:email,
                areaOfInterest: areaOfInterest,
                availability: availability,
                location: location,
                image: image,
                govId: govId,
                username: user?.fullName,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userImage: user?.imageUrl,
            });
            ToastAndroid.show('Your volunteering application has been submitted and is pending verification.', ToastAndroid.LONG);
            setLoading(false);
            navigation.goBack();
        } catch (error) {
            ToastAndroid.show('Error submitting your application. Please try again.', ToastAndroid.LONG);
            setLoading(false);
        }
    };

    return (
        <ScrollView style={{ padding: 10 }}>
            <Text style={{ fontFamily: 'outfit', color: "gray" }}>
                Fill out the details to apply as a volunteer.
            </Text>

            <TouchableOpacity onPress={pickImage}>
                <Text style={styles.btnTxt1}>Pick an Image</Text>
            </TouchableOpacity>

            {image ? (
                <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
                <Text>No image selected</Text>
            )}

            <TextInput
                placeholder="Your Name"
                value={name}
                onChangeText={setName}
                style={styles.TxtIp}
            />
            <TextInput
                placeholder="Contact Number"
                value={contact}
                onChangeText={setContact}
                style={styles.TxtIp}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.TxtIp}
            />

            <Picker
                selectedValue={areaOfInterest}
                onValueChange={(itemValue) => setAreaOfInterest(itemValue)}
                style={styles.TxtIp}
            >
                <Picker.Item label="Food Distribution" value="food" />
                <Picker.Item label="Elderly Care" value="elderly_care" />
                <Picker.Item label="Education" value="education" />
                <Picker.Item label="Health Care" value="health_care" />
            </Picker>

            <TextInput
                placeholder="Availability (Morning, Afternoon, Evening)"
                value={availability}
                onChangeText={setAvailability}
                style={styles.TxtIp}
            />
            <TextInput
                placeholder="Location (e.g., City, State)"
                value={location}
                onChangeText={setLocation}
                style={styles.TxtIp}
            />

            <TextInput
                placeholder="Government ID (Aadhar or Other)"
                value={govId}
                onChangeText={setGovId}
                style={styles.TxtIp}
            />

            <TouchableOpacity
                disabled={loading}
                style={styles.btn}
                onPress={onSubmitVolunteerForm}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <Text style={styles.btnTxt}>Submit Application</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
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
        borderColor: '#8c6fff',
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
    btnTxt1: {
        fontFamily: 'outfitmedium',
        textAlign: 'center',
        color: '#000',
        fontSize: 15,
        padding: 20,
    },
    imagePreview: {
        width: '40%',  // Or use a specific width like 300
        height: 130,    // Set a fixed height
        borderRadius: 5,
        margin:5,
        alignSelf:'center'
    },
});
