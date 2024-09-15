import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function PopularFoodCard({ foods }) {
    return (
        <TouchableOpacity>
            <View style={{
                marginLeft: 15,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 15,
                width: 230,
                height: 'auto',
            }}>
                <Image source={{ uri: foods?.imageUrl }}
                    style={{
                        width: 210,
                        height: 140,
                        borderRadius: 15,
                        marginBottom: 5
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
                        textAlign: 'justify',
                        paddingBottom: 5
                    }}>{foods.description}</Text>
                    
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 13,
                        color: 'gray',
                        textAlign: 'justify',
                        paddingBottom: 5
                    }}>Address:  {foods.address}</Text>
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
                        paddingBottom: 5
                    }}>Landmark:  {foods.landmark}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
