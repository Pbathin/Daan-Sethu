import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import React from 'react';
import { WindowHeight, WindowWidth } from "../../GlobalCSS";

export default function DonateCateg() {
    

    const router = useRouter();

    const donationOptions = [
        {
            id: 1,
            name: 'Food',
            icon: require("../../assets/images/Need Help.png"),
            path: "/Donate/FoodShare/DonateFood",
        },
        {
            id: 2,
            name: 'Clothes',
            icon: require("../../assets/images/Food donate.png"),
            path: "/Donate/Clothes/DonateClothes",
        },
        {
            id: 3,
            name: 'Books',
            icon: require("../../assets/images/orphanages.png"),
            path: "/Donate/Books/DonateBooks",
        },
        {
            id: 4,
            name: 'Household Items',
            icon: require("../../assets/images/oldagehome.png"),
            path: "/Donate/Household/DonateHousehold",
        },
        {
            id: 5,
            name: 'Gadgets',
            icon: require("../../assets/images/rehabilitation.png"),
            path: "/Donate/Gadgets/DonateGadgets",
        },
        {
            id: 6,
            name: 'Other Items',
            icon: require("../../assets/images/Volunteers.png"),
            path: "/Donate/OtherItems/DonateOtherItems",
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => router.push(item.path)} style={styles.itemContainer}>
            <View style={styles.icon}>
                <Image source={item.icon} style={styles.image} />
            </View>
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={donationOptions}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2} 
                contentContainerStyle={styles.sub_block}
                key="twoColumns"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    sub_block: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginLeft:WindowWidth*0.05,
        marginRight:WindowWidth*0.05,
        marginTop:50
    },
    itemContainer: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#DDD6E5',
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        marginRight:15,
        marginTop:30,
        marginLeft:15
    },
    image: {
        width:WindowWidth*0.165,
        height: WindowHeight*0.08,
        marginBottom: 5,
        marginTop:10
    },
    icon: {
        alignItems: 'center',
    },
    text: {
        fontFamily: "outfitmedium",
        fontSize: 17,
        textAlign: "center",
        paddingTop:10
    },
});
