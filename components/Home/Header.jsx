import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Feather } from '@expo/vector-icons';
import {WindowWidth} from '../../GlobalCSS'
import { useRouter } from "expo-router";

export default function Header() {
    const { user } = useUser();
    const router = useRouter();
    return (
        <View >
            <View style={styles.container1}>
                <View style={styles.Subcontainer1}>
                <TouchableOpacity
                onPress={() => router.push("/(tabs)/profile")}
                >
                <Image style={styles.headerimg} source={{ uri: user?.imageUrl }} />
                </TouchableOpacity>
                    <View >
                        <Text style={styles.text1}>Welcome,</Text>
                        <Text style={styles.text1}>{user?.fullName}</Text>
                        <View style={styles.sub3}>
                        <TouchableOpacity
                         onPress={() => router.push("/AboutUs/AboutUs")}
                        >
                            <Text style={styles.appname}> DaanSethu</Text>
                        </TouchableOpacity>
                            
                        </View>
                    </View>
                </View>
                {/* <View style={styles.search}>
                    <Feather name="search" size={24} color="black" style={{ paddingTop:5}} />
                    <TextInput placeholder=' search'
                    style={{
                        fontFamily:'outfit',
                        paddingBottom:13,
                        fontSize:15,
                        paddingTop:10,
                    }} />
                </View> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container1: {
        display:"flex",
        width:WindowWidth,
        paddingTop: 40,
        backgroundColor: "#8c1aff",
        paddingBottom: 12,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
    },
    Subcontainer1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 10,

    },
    headerimg: {
        width: 45,
        height: 45,
        borderRadius: 99,
        marginLeft:10,
    },
    text1: {
        fontSize:16,
        fontFamily: "outfitmedium",
        color: "#fff"
    },
    appname: {
        fontSize:25,
        fontFamily: "outfitbold",
        color: "#fff",
        marginLeft:WindowWidth-200,
        marginTop:-35,
     },
     sub3:{
         display: 'flex',
        flexDirection: 'row',
        marginRight:0,
        gap: 10,
     },
    search:{
        display: 'flex', 
        flexDirection: 'row',
        paddingLeft:10,
        backgroundColor:'#fff',
        marginTop:15,
        borderRadius:8,
        height:40,
        width: WindowWidth*0.95,
        marginLeft:8
    }
})