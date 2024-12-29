import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    Linking,
    Modal,
    Pressable,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { db } from "../../configs/FirebaseConfig";
  import { collection, getDocs } from "firebase/firestore";
  import { useNavigation, router } from "expo-router";
  import { Picker } from "@react-native-picker/picker";
  
  export default function VolunteersPage() {
    const navigation = useNavigation();
    const [verifiedVolunteers, setVerifiedVolunteers] = useState([]);
    const [filteredVolunteers, setFilteredVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortCriteria, setSortCriteria] = useState("availability");
    const [sortSubcategory, setSortSubcategory] = useState("Morning");
    const [modalVisible, setModalVisible] = useState(false);
  
    useEffect(() => {
      navigation.setOptions({
        headerTitle: "Volunteers",
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
  
      const fetchVerifiedVolunteers = async () => {
        try {
          const querySnapshot = await getDocs(
            collection(db, "VerifiedVolunteers")
          );
          const volunteersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setVerifiedVolunteers(volunteersData);
          setFilteredVolunteers(volunteersData); // Initially, show all volunteers
          setLoading(false);
        } catch (error) {
          console.error("Error fetching verified volunteers: ", error);
          setLoading(false);
        }
      };
  
      fetchVerifiedVolunteers();
    }, []);
  
    // Handle call and email actions
    const handleCall = (contact) => {
      Linking.openURL(`tel:${contact}`);
    };
  
    const handleEmail = (email) => {
      Linking.openURL(`mailto:${email}`);
    };
  
    // Get current time and determine the time of day (Morning, Afternoon, Evening)
    const getCurrentTimeOfDay = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 6 && currentHour < 12) {
        return "Morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        return "Afternoon";
      } else {
        return "Evening";
      }
    };
  
    // Apply filter and sorting logic
    const handleFilterAndSort = () => {
      let filteredData = verifiedVolunteers;
  
      // Step 1: Filter based on search query
      if (searchQuery) {
        filteredData = filteredData.filter(
          (volunteer) =>
            volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            volunteer.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      // Step 2: Sort based on availability priority (current time priority)
      const currentTimeOfDay = getCurrentTimeOfDay();
  
      // First, prioritize volunteers whose availability matches the current time
      const sortedData = filteredData.sort((a, b) => {
        if (a.availability === currentTimeOfDay && b.availability !== currentTimeOfDay) {
          return -1; // "a" comes before "b"
        } else if (a.availability !== currentTimeOfDay && b.availability === currentTimeOfDay) {
          return 1; // "b" comes before "a"
        }
        return 0; // No change in order
      });
  
      // Step 3: Apply additional sorting criteria (if needed)
      if (sortCriteria === "availability") {
        const availabilityOrder = ["Morning", "Afternoon", "Evening"];
        sortedData.sort((a, b) =>
          availabilityOrder.indexOf(a.availability) - availabilityOrder.indexOf(b.availability)
        );
      } else if (sortCriteria === "interest") {
        const interestOrder = ["Food Distribution", "Elderly care", "Education", "Health care"];
        sortedData.sort((a, b) =>
          interestOrder.indexOf(a.areaOfInterest) - interestOrder.indexOf(b.areaOfInterest)
        );
      }
  
      // Step 4: Apply subcategory filter if applicable
      if (sortCriteria === "availability") {
        filteredData = sortedData.filter((volunteer) =>
          volunteer.availability === sortSubcategory
        );
      } else if (sortCriteria === "interest") {
        filteredData = sortedData.filter((volunteer) =>
          volunteer.areaOfInterest === sortSubcategory
        );
      }
  
      // Set the final filtered and sorted data
      setFilteredVolunteers(filteredData);
    };
  
    // Reapply filter and sort when search query, sort criteria, or subcategory changes
    useEffect(() => {
      handleFilterAndSort();
    }, [searchQuery, sortCriteria, sortSubcategory]);
  
    return (
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search by name or place"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {/* Three Dots Button */}
          <TouchableOpacity
            style={styles.threeDotsButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.threeDotsText}>...</Text>
          </TouchableOpacity>
        </View>
  
        {/* Sort Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sort Volunteers</Text>
  
              {/* Sort by Availability or Interest */}
              <Picker
                selectedValue={sortCriteria}
                style={styles.picker}
                onValueChange={(itemValue) => setSortCriteria(itemValue)}
              >
                <Picker.Item label="Sort by Availability" value="availability" />
                <Picker.Item label="Sort by Interest" value="interest" />
              </Picker>
  
              {/* Subcategory for sorting */}
              {sortCriteria === "availability" ? (
                <Picker
                  selectedValue={sortSubcategory}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSortSubcategory(itemValue)}
                >
                  <Picker.Item label="Morning" value="Morning" />
                  <Picker.Item label="Afternoon" value="Afternoon" />
                  <Picker.Item label="Evening" value="Evening" />
                </Picker>
              ) : (
                <Picker
                  selectedValue={sortSubcategory}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSortSubcategory(itemValue)}
                >
                  <Picker.Item label="Food Distribution" value="Food Distribution" />
                  <Picker.Item label="Elderly care" value="Elderly care" />
                  <Picker.Item label="Education" value="Education" />
                  <Picker.Item label="Health care" value="Health care" />
                </Picker>
              )}
  
              {/* Close Modal Button */}
              <Pressable
                style={styles.closeButton}
                onPress={() => {
                  handleFilterAndSort();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.closeButtonText}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
  
        {loading ? (
          <ActivityIndicator size="large" color="#8c6fff" style={styles.loader} />
        ) : (
          filteredVolunteers.length === 0 ? (
            <Text style={styles.noVerifiedText}>No verified volunteers available</Text>
          ) : (
            <FlatList
              data={filteredVolunteers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.volunteerItem}>
                  <View style={styles.textContainer}>
                    <Text style={styles.volunteerText}>Name: {item.name}</Text>
                    <Text style={styles.volunteerText}>Contact: {item.contact}</Text>
                    <Text style={styles.volunteerText}>Email: {item.email}</Text>
                    <Text style={styles.volunteerText}>Interest: {item.areaOfInterest}</Text>
                    <Text style={styles.volunteerText}>Availability: {item.availability}</Text>
                  </View>
  
                  {/* Buttons for Call and Email */}
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleCall(item.contact)}
                    >
                      <Text style={styles.buttonText}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleEmail(item.email)}
                    >
                      <Text style={styles.buttonText}>Email</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )
        )}
  
        {/* "+" button to navigate to Apply for Volunteers page */}
        <TouchableOpacity
          onPress={() => router.push("/Volunteers/ApplyForVolunteers")}
          style={styles.fab}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    searchBar: {
      height: 40,
      borderColor: "#8c6fff",
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      fontSize: 16,
      color: "#333",
      flex: 1,
    },
    threeDotsButton: {
      marginLeft: 10,
      padding: 10,
      fontSize:30,
      marginTop:-15
    },
    threeDotsText: {
      fontSize: 24,
      color: "#8c6fff",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      width: 300,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    picker: {
      height: 50,
      width: "100%",
      marginBottom: 10,
    },
    closeButton: {
      backgroundColor: "#8c6fff",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    closeButtonText: {
      color: "#fff",
      fontSize: 16,
    },
    loader: {
      marginTop: 20,
    },
    noVerifiedText: {
      textAlign: "center",
      fontSize: 16,
      color: "#8c6fff",
    },
    volunteerItem: {
      marginBottom: 15,
      padding: 10,
      backgroundColor: "#f9f9f9",
      borderRadius: 5,
      flexDirection: 'row', // Added to align text and buttons horizontally
      justifyContent: 'space-between',
    },
    textContainer: {
      marginBottom: 10,
      flex: 1, // Ensures the text container takes up remaining space
    },
    volunteerText: {
      fontSize: 14,
      marginBottom: 5,
    },
    buttonsContainer: {
      flexDirection: 'column', // Align buttons vertically
      justifyContent: 'space-between', // Ensure equal spacing
      alignItems: 'flex-end', // Align buttons to the right
      width: 60, // Fixed width for both buttons
    },
    button: {
      backgroundColor: "#8c6fff",
      paddingVertical: 10, // Adjust vertical padding for uniformity
      borderRadius: 5,
      width: '100%', // Ensure buttons take full width within their container
      marginBottom: 10, // Add spacing between buttons
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
    },
    fab: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: "#8c6fff",
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    fabText: {
      color: "#fff",
      fontSize: 30,
      
    },
  });
  