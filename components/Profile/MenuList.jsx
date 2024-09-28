import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Share } from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'

export default function MenuList() {

    const menuList = [
        {
            id: 1,
            name: 'Donate Food',
            icon: require('../../assets/images/add.png'),
            path: '/FoodShare/DonateFood'
        },
        {
            id: 2,
            name: 'Donated Foods',
            icon: require('../../assets/images/my_donation.png'),
            path: '/FoodShare/DonatedFood'
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('../../assets/images/share.png'),
            path: 'share'
        },
        {
            id: 4,
            name: 'Add Organization',
            icon: require('../../assets/images/Add Organization.png'),
            path: 'Organizations/AddOrganization'
        },
        {
            id: 6,
            name: 'Rate Us',
            icon: require('../../assets/images/RateUs.png'),
            path: ''
        },
        {
            id: 5,
            name: 'Logout',
            icon: require('../../assets/images/logout.png'),
            path: 'logout'
        },
    ]
    const { signOut } = useAuth();
    const router = useRouter();
    const onMenuClick = (item) => {
        if (item.path == 'logout') {
            signOut();
            return;
        }
        if (item.path == 'share') {
            Share.share({
                message: 'Download the Daan Sethu App, Download URL:'
            })
            return;
        }
        router.push(item.path)
    }

    return (
        <View style={{
            marginTop: 30,
        }}>
            <FlatList
                data={menuList}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => onMenuClick(item)}
                        style={styles.btn}>
                        <Image source={item.icon}
                            style={styles.img} />
                        <Text style={styles.txt}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <Text style={styles.btmTxt}>Developed by DaanSethu.org @ 2024</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    btmTxt: {
        fontSize: 12,
        fontFamily: 'outfitmedium',
        textAlign: 'center',
        marginTop: 70,
        color: "gray"
    },
    btn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        flex: 1,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        margin: 5,
        marginTop: 10,
        backgroundColor: '#fff',
        borderColor: '#8c6fff'
    },
    img: {
        width: 50,
        height: 50,
    },
    txt:{
        fontFamily: 'outfitmedium',
        fontSize: 16,
        flex: 1,
        paddingLeft: 2    
    }
})