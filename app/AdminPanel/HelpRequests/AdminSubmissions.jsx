import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ToastAndroid, ActivityIndicator, Image, ScrollView, RefreshControl } from "react-native";
import { db } from "../../../configs/FirebaseConfig";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useNavigation } from "expo-router";

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
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
        // Query to order by 'createdAt' field in descending order
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
        setRefreshing(false); // Stop refreshing when data is fetched
      }
    };

    fetchSubmissions();
  }, []);

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing
    await fetchSubmissions(); // Re-fetch data
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ADDonations", id));
      setSubmissions(submissions.filter((submission) => submission.id !== id));
      ToastAndroid.show("Submission removed successfully.", ToastAndroid.LONG);
    } catch (error) {
      console.error("Error deleting submission:", error);
      ToastAndroid.show("Error removing submission.", ToastAndroid.LONG);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.beneficiaryName}>Name: {item.beneficiaryName}</Text>
      <Text>Amount donated: {item.amountDonated}</Text>
      <Text>Date of donation: {item.date}</Text>
      <Text>Descriptions: {item.description}</Text>
      <Text>Need of money: {item.needOfMoney}</Text>
      <Text>City: {item.city}</Text>
      <Text>Pincode: {item.pinCode}</Text>

      {/* Image display section */}
      {item.imageUrls && item.imageUrls.length > 0 && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageTitle}>Images:</Text>
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

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>Remove</Text>
      </TouchableOpacity>
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
              onRefresh={onRefresh} // Trigger the refresh
              colors={["#8c6fff"]} // Set the refresh control color
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
  },
  beneficiaryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8c6fff",
  },
  deleteBtn: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
  },
  imageContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
});
