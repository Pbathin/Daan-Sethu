import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { WindowWidth, WindowHeight } from '../../GlobalCSS'


export default function DisplayCard({ feedback }) {

    return (
        <View>
            <View style={{
                marginLeft: 15,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 15,
                width: WindowWidth * 0.93,
                height: 'auto',
                marginBottom: 20
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Image source={{ uri: feedback?.userImage }}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 99,
                            marginBottom: 4,
                            marginLeft: 1
                        }}
                    />
                    <Text style={{
                        fontFamily: 'outfitbold',
                        fontSize: 17,
                        textAlign: 'center',
                        paddingBottom: 1,
                        marginLeft: 4,
                        marginTop: 4
                    }}>{feedback.username}</Text>

                </View>
                <View>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        color: 'gray',
                        textAlign:'justify',
                        paddingBottom: 5,
                        marginLeft:40
                    }}>{feedback.description}</Text>
                </View>
            </View>
        </View>
    )
}
