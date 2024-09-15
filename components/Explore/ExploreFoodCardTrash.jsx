import { Text, View, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { WindowWidth, WindowHeight } from '../../GlobalCSS'
import {Ionicons} from '@expo/vector-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { router } from 'expo-router';
import { db } from './../../configs/FirebaseConfig'

export default function ExploreFoodCardTrash({ foods }) {
    
        const onDelete = () => {
            Alert.alert('Do you want to delete','Do you really want to Delete this Food?',[
                {
                    text:'Cancel',
                    style:'cancel', 
                },
                {
                    text:'Delete',
                    style:'destructive',
                    onPress:()=>deleteFood()
                }
            ])
        }

        const deleteFood=async()=>{
            console.log("Delete Food");
            await deleteDoc(doc(db,'FoodList',foods?.id));
            router.back();
            ToastAndroid.show('Food Deleted!',ToastAndroid.LONG)
        }
    
    return (
        <View>
            <View style={{
                marginLeft: 10,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 15,
                width: WindowWidth * 0.9,
                height: 'auto',
                marginBottom: 20
            }}>
                <Image source={{ uri: foods?.imageUrl }}
                    style={{
                        width: WindowWidth * 0.8,
                        height: WindowHeight * 0.25,
                        borderRadius: 15,
                        marginBottom: 5,
                        marginLeft: 10
                    }}
                />
                <View>
                    <Text style={{
                        fontFamily: 'outfitbold',
                        fontSize: 17,
                        textAlign: 'center',
                        paddingBottom: 3
                    }}>{foods.foodName}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'center',
                        paddingBottom: 5
                    }}>{foods.description}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'justify',
                        paddingBottom: 5
                    }}>Food Type: {foods.foodType}</Text>

                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'justify',
                        paddingBottom: 5,
                        marginTop: 1
                    }}>Address:  {foods.address}</Text>

                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'justify',
                        paddingBottom: 5
                    }}>Prepared Time:  {foods.preparedTime}</Text>

                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'justify',
                        paddingBottom: 5,
                        marginLeft: 170,
                        marginTop: -22
                    }}>Experies Time:  {foods.experiesTime}</Text>

                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'justify',
                        paddingBottom: 5
                    }}>City:  {foods.city}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'justify',
                        paddingBottom: 5,
                        marginLeft: 170,
                        marginTop: -22
                    }}>PINCODE:  {foods.pinCode}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'justify',
                        paddingBottom: 5
                    }}>Landmark:  {foods.landmark}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'justify',
                        paddingBottom: 5,
                        marginLeft: 170,
                        marginTop: -22
                    }}>Contact No:  {foods.contact}</Text>


                </View>
                <TouchableOpacity style={{
                    padding: 10,
                    backgroundColor: "#8c6fff",
                    borderRadius: 5,
                    marginTop: 20,
                    marginBottom: 10,
                    width: WindowWidth * 0.6,
                    alignItems: 'center',
                    alignSelf: 'center'

                }}
                onPress={()=>onDelete()}
                >
                <Ionicons name="trash" size={20} color="#fff" 
                style={{
                    marginLeft:-120,

                
                }}/>
                    <Text style={{
                        fontFamily: 'outfitmedium',
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 15,
                        marginTop:-20
                    }}>Delete Food</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
