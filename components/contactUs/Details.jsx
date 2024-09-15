import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Image, SafeAreaView } from 'react-native';
import { Ionicons, Entypo } from 'react-native-vector-icons';

const peopleData = [
    {
        id: '1',
        name: 'Athin P B',
        contact: '+91 7899897271',
        email: 'athin04pb@gmail.com',
        image: require('../../assets/images/athin1.jpg'),
    },
    {
        id: '2',
        name: 'B Nagendra Nayak',
        contact: '+91 6238270875',
        email: 'nayaknagendra@gmail.com',
        image: require('../../assets/images/Nagendra.jpg'),
    },
    {
        id: '3',
        name: 'Darpan',
        contact: '+91 8310448230',
        email: 'darpanbillava09@gmail.com',
        image: require('../../assets/images/Darpan.jpg'),
    },
    {
        id: '4',
        name: 'Likith M Shet',
        contact: '+91 9380318091',
        email: 'u827727@gmail.com',
        image: require('../../assets/images/Likith.jpg'),
    },
];

const Details = () => {
    const renderItem = ({ item }) => {
        const handleCall = () => {
            Linking.openURL(`tel:${item.contact}`);
        };

        const handleEmail = () => {
            Linking.openURL(`mailto:${item.email}`);
        };

        return (
            <SafeAreaView style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <View style={styles.card}>
                    <Image source={item.image} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.contactContainer}>
                            
                            <TouchableOpacity onPress={handleCall} style={styles.iconButton}>
                                <Ionicons name="call" size={15} color="#000" />
                                <Text style={styles.contact}>: {item.contact}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoContainer}>
                            <TouchableOpacity onPress={handleEmail} style={styles.iconButton}>
                                <Entypo name="mail" size={15} color="#000" />
                                <Text style={styles.email}>: {item.email}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    };

    return (
        <FlatList
            data={peopleData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#8c1aff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        paddingTop:20,
        paddingBottom:20
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 8,
        marginRight: 16,
    },
    infoContainer: {
       display:'flex',
       marginLeft:-5
    },
    name: {
        fontSize: 18,
        fontFamily:'outfitbold',
        marginBottom:10
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginLeft:-5,
    },
    contact: {
        fontFamily:'outfitmedium',
        paddingBottom:10,
        marginLeft:20,
        marginTop:-18,
        fontSize:15
    },
    email: {
        fontFamily:'outfitmedium',
        paddingBottom:10,
        marginLeft:20,
        marginTop:-18,
        fontSize:15
    },
    iconButton: {
        marginHorizontal: 5,
    },
});

export default Details;


