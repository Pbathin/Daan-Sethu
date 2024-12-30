import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { db, storage } from './../../configs/FirebaseConfig'
import { setDoc, doc } from 'firebase/firestore';
import { WindowWidth, WindowHeight } from '../../GlobalCSS';
import { useUser } from '@clerk/clerk-expo'
import { serverTimestamp } from 'firebase/firestore';

export default function CustFeedback() {
    const navigation = useNavigation();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Customer Feedback',
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

    const saveCustFeedback = async () => {
        await setDoc(doc(db, 'CustomerFeedback', Date.now().toString()), {
            description: description,
            username: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
            createdAt: serverTimestamp(),
        })
        setLoading(false);
        ToastAndroid.show('Successfully submitted...', ToastAndroid.LONG)
    }
    return (
        <ScrollView style={{
            padding: 10,
        }}>
            <Text style={{
                fontFamily: 'outfitbold',
                fontSize: 19,
            }}>Drop your Feedback</Text>
            <View>
                <TextInput placeholder='Write your feedback here...!'
                    onChangeText={(v) => setDescription(v)}
                    multiline
                    numberOfLines={3}
                    style={styles.textinput}
                />
                <TouchableOpacity
                    disabled={loading}
                    style={{
                        padding: 15,
                        backgroundColor: "#8c6fff",
                        borderRadius: 5,
                        marginTop: 20,
                        width:WindowWidth*0.4,
                        alignSelf:'center'

                    }}
                    onPress={() => saveCustFeedback()}>
                    {loading ?
                        <ActivityIndicator size={'large'} color={'#fff'} /> :
                        <Text
                            style={{
                                fontFamily: 'outfitmedium',
                                textAlign: 'center',
                                color: '#fff',
                                fontSize: 15
                            }}>Submit</Text>}
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cityIp: {
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
    },
    pincode: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 17,
        fontFamily: 'outfit',
        marginTop: 10,
        backgroundColor: '#fff',
        borderColor: '#8c6fff',
        width: WindowWidth * 0.46
    },
    textinput: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 17,
        fontFamily: 'outfit',
        marginTop: 10,
        backgroundColor: '#fff',
        borderColor: '#8c6fff'
    }
})