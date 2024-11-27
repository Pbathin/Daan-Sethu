import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput, Linking, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import { WindowWidth, WindowHeight } from '../../GlobalCSS';
import { useNavigation } from 'expo-router'

export default function OldAgeHomes() {
  const [verifiedOrgList, setVerifiedOrgList] = useState([]);
  const [filteredOrgList, setFilteredOrgList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Old Age Homes',
      headerShown: true,
      headerStyle: {
        backgroundColor: '#8c6fff',
      },
      headerTitleStyle: {
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'outfit',
      },
    });
  }, []);

  useEffect(() => {
    const GetVerifiedOrgList = async () => {
      const q = query(collection(db, 'verifiedOrgList'));
      const querySnapshot = await getDocs(q);
      const orgs = [];
      querySnapshot.forEach((doc) => {
        orgs.push(doc.data());
      });

      // Filter for Old Age Homes only
      const filteredOrgs = orgs.filter(org => org.orgType === "Old Age Home");
      setVerifiedOrgList(filteredOrgs);
      setFilteredOrgList(filteredOrgs);  // Initialize the filtered list
    };

    GetVerifiedOrgList();
  }, []);

  // Handle the search functionality
  const handleSearch = (text) => {
    setSearchQuery(text);

    const filteredData = verifiedOrgList.filter((item) =>
      item.orgName.toLowerCase().includes(text.toLowerCase()) ||
      item.orgId.toLowerCase().includes(text.toLowerCase()) ||
      item.address.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredOrgList(filteredData);
  };

  const handleDonate = (upiId, orgName) => {
    if (!upiId) {
      Alert.alert("Error", "No UPI ID provided for this organization.");
      return;
    }

    // UPI URL to navigate
    const upiUrl = `upi://pay?pa=${upiId}&pn=${orgName}&cu=INR&tn=Donation`;

    // Open UPI app
    Linking.openURL(upiUrl).catch(() => {
      Alert.alert("Error", "No UPI app found or there was an issue opening the app.");
    });
  };

  // Function to handle phone calls
  const handleContact = (contactNumber) => {
    const phoneNumber = `tel:${contactNumber}`;
    Linking.openURL(phoneNumber).catch(() => {
      Alert.alert("Error", "There was an issue making the call.");
    });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Search Input */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name, ID, or location"
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)}
      />

      {/* FlatList to render the organizations */}
      <FlatList
        data={filteredOrgList}
        vertical={true}
        showHorizontalScrollIndicator={false}
        style={{ paddingLeft: 10, marginTop: 10, }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.block}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: WindowWidth * 0.7,
                height: 180,
                borderRadius: 15,
                margin: 10,
                alignSelf: 'center'
              }}
            />
            <Text style={styles.txt1}> {item.orgName}</Text>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 10,
              flexWrap: 'wrap'
            }}>
              <View style={styles.sub_block}>
                <Text style={styles.text}> ID: {item.orgId}</Text>
                <Text style={styles.text}> Type: {item.orgType}</Text>
                <Text style={styles.text}> Strength: {item.noOfStrength}</Text>
              </View>
              <View style={styles.sub_block}>
                <Text style={styles.text}> Address: {item.address}</Text>
                <Text style={styles.text}> Landmark: {item.landmark}</Text>
                <Text style={styles.text}> PIN Code: {item.pinCode}</Text>
              </View>
              <Text style={styles.text}> Description: {item.description}</Text>
            </View>

            {/* Container for Contact and Donate buttons */}
            <View style={styles.btnContainer}>

            {/* Donate Button */}
            <TouchableOpacity
                style={styles.btn}
                onPress={() => handleDonate(item.upiId, item.orgName)}  // Pass UPI ID and org name
              >
                <Text style={styles.btnTxt}>Donate</Text>
              </TouchableOpacity>

              {/* Contact Button */}
              <TouchableOpacity
                style={styles.btn}  // Same style as the Donate button
                onPress={() => handleContact(item.contact)}  // Call the contact number
              >
                <Text style={styles.btnTxt}>Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontFamily: 'outfit',
    fontSize: 14,
    marginBottom: 10,
  },
  block: {
    maxHeight: WindowHeight - 50,
    display: 'flex',
    flexDirection: 'column',
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#fffd',
    marginBottom: 15
  },
  btnContainer: {
    flexDirection: 'row',  
    justifyContent: 'space-evenly',  
    marginTop: 10,
  },
  btn: {
    padding: 8,
    backgroundColor: "#8c6fff",
    borderRadius: 4,
    width: WindowWidth * 0.4,  
    alignSelf: 'center',
    marginBottom: 15
  },
  btnTxt: {
    fontFamily: "outfitmedium",
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
  },
  sub_block: {
    flexDirection: 'column',
    flexBasis: "50%",
    flexWrap: 'wrap'
  },
  text: {
    fontFamily: "outfit",
    fontSize: 14,
    padding: 3,
    flexWrap: 'nowrap'
  },
    txt1: {
    fontFamily: "outfitmedium",
    fontSize: 14,
    textAlign: 'center'
  },
});
