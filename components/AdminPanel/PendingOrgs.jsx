import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import { WindowWidth, WindowHeight } from '../../GlobalCSS';

export default function PendingOrgs() {
    const [PendingOrgs, setPendingOrgs] = useState([]);

    useEffect(() => {
        const GetSPendingOrgs = async () => {
            const q = query(collection(db, 'pendingOrgList'));
            const querySnapshot = await getDocs(q);
            const PendingOrgs = [];
            querySnapshot.forEach((doc) => {
                //   console.log(doc.data());
                PendingOrgs.push(doc.data());
            });
            setPendingOrgs(PendingOrgs);
        };

        GetSPendingOrgs();
    }, []);

    return (
        <View>
            <FlatList
                data={PendingOrgs}
                vertical={true}
                showHorizontalScrollIndicator={false}
                style={{ paddingLeft: 10, marginTop: 10 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View key={index}
                        style={styles.block}
                    >
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={{
                                width: WindowWidth * 0.7,
                                height: 180,
                                borderRadius: 15,
                                margin: 10,
                                alignSelf:'center'
                            }}
                        />
                        <Text style={styles.txt1}> {item.orgName}</Text>
                        <View style={{
                            display:'flex',
                            flexDirection:'row',
                            marginTop:10,
                            flexWrap:'wrap'
                        }}>
                        <View style={styles.sub_block}>
                        <Text style={styles.text}> ID: {item.orgId}</Text>
                        <Text style={styles.text}> Type: {item.orgType}</Text>
                        <Text style={styles.text}> Strength: {item.noOfStrength}</Text>
                        <Text style={styles.text}> Contact: {item.contact}</Text>
                        </View>
                        <View>
                        <Text style={styles.text}> Address: {item.address}</Text>
                        <Text style={styles.text}> Landmark: {item.landmark}</Text>
                        <Text style={styles.text}> PIN Code: {item.pinCode}</Text>
                        <Text style={styles.text}> UPI Id: {item.upiId}</Text>
                        </View>
                        <Text style={styles.text}> Description: {item.description}</Text>
                        </View>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnTxt}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        maxHeight: WindowHeight - 50,
        display: 'flex',
        flexDirection: 'column',
        marginRight:10,
        borderRadius:5,
        backgroundColor:'#fffd'
    },
    btn: {
        padding:8,
        backgroundColor: "#8c6fff",
        borderRadius: 4,
        marginTop: 5,
        width:WindowWidth*0.5,
        alignSelf:'center',
        marginBottom:10
    },
    btnTxt: {
        fontFamily: "outfitmedium",
        textAlign: "center",
        color: "#fff",
        fontSize: 15,
    },
    sub_block:{
        flexDirection: 'column',
        // flexShrink:0,
        flexBasis:"50%",
    },
    text: {
        fontFamily: "outfit",
        fontSize:14,
        padding: 3
    },
    txt1:{
        fontFamily: "outfitmedium",
        fontSize:14,
        textAlign:'center'
    }

});