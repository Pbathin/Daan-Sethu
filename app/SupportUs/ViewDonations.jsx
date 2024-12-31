import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ToastAndroid, ActivityIndicator, Image, ScrollView, RefreshControl } from "react-native";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useNavigation } from "expo-router";

export default function ViewDonations() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); 
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Submitted Proofs",
      headerShown: true,
      headerStyle: {
        backgroundColor: "#8c1aff",
      },
      headerTitleStyle: {
        fontSize: 18,
        color: "#ffffff",
        fontFamily: "outfit",
      },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const submissionsQuery = query(
          collection(db, "ADDonations"),
          orderBy("createdAt", "desc")
        );
        
        const querySnapshot = await getDocs(submissionsQuery);
        const submissionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubmissions(submissionsData);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        ToastAndroid.show("Error fetching submissions.", ToastAndroid.LONG);
      } finally {
        setLoading(false);
        setRefreshing(false); 
      }
    };

    fetchSubmissions();
  }, []);

  
  const onRefresh = async () => {
    setRefreshing(true); 
    await fetchSubmissions(); 
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Image display section */}
      {item.imageUrls && item.imageUrls.length > 0 && (
        <View style={styles.imageContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item.imageUrls.map((url, index) => (
              <Image
                key={index}
                source={{ uri: url }}
                style={styles.image}
              />
            ))}
          </ScrollView>
        </View>
      )}

      <Text style={styles.beneficiaryName}>Name: {item.beneficiaryName}</Text>
      <Text>Amount donated: {item.amountDonated}</Text>
      <Text>Date of donation: {item.date}</Text>
      <Text>Descriptions: {item.description}</Text>
      <Text>Need of money: {item.needOfMoney}</Text>
      <Text>City: {item.city}</Text>
      <Text>Pincode: {item.pinCode}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#8c6fff" />
      ) : (
        <FlatList
          data={submissions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No submissions found.</Text>}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} 
              colors={["#8c6fff"]} 
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#8c6fff",
    alignItems: "center", 
  },
  beneficiaryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8c6fff",
    marginTop: 10,
  },
  imageContainer: {
    width: "100%", 
    alignItems: "center", 
    marginBottom: 10,
  },
  image: {
    width: 150, 
    height: 150, 
    borderRadius: 5,
    marginBottom: 10, 
  },
});
