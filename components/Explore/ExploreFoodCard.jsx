import { StyleSheet, Text, View, Image, TouchableOpacity,Linking } from 'react-native'
import React from 'react'
import { WindowWidth, WindowHeight } from '../../GlobalCSS'

export default function ExploreFoodCard({ foods }) {
    
        const handleCall = () => {
            Linking.openURL(`tel:${foods.contact}`);
        };
    
    return (
        <View>
            <View style={{
                marginLeft: 15,
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
                    width: WindowWidth * 0.8,
                    alignItems: 'center',
                    alignSelf: 'center'

                }}
                onPress={handleCall}>
                    <Text style={{
                        fontFamily: 'outfitmedium',
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 15
                    }}>Place your order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
