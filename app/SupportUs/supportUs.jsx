import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native";
import { WindowWidth, WindowHeight } from "../../GlobalCSS";
import { useNavigation } from "expo-router";


const upiID = "daansethu@oksbi";
const contactNumber = "+917899897271"; 
export default function SupportUs() {
  const [showQRModal, setShowQRModal] = useState(false); // State to control QR modal visibility

  const handleUPIPayment = () => {
    const upiUrl = `upi://pay?pa=${upiID}&pn=DaanSethu&cu=INR`;

    Linking.openURL(upiUrl).catch(() => {
      Alert.alert(
        "UPI App not found",
        "Please install a UPI payment app to proceed."
      );
    });
  };

  const handleCall = () => {
    const phoneUrl = `tel:${contactNumber}`;
    Linking.openURL(phoneUrl).catch(() => {
      Alert.alert(
        "Unable to make the call",
        "Please check your phone's calling functionality."
      );
    });
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Support Us",
      headerShown: true,
      headerStyle: {
        backgroundColor: "#8c6fff",
      },
      headerTitleStyle: {
        fontSize: 18,
        color: "#ffffff",
        fontFamily: "outfit",
      },
    });
  }, []);

  const toggleQRModal = () => {
    setShowQRModal(!showQRModal);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Support DaanSethu</Text>

          <Text style={styles.description}>
            Your support helps us continue our mission of connecting the less
            fortunate with those who can offer help. You can contribute by
            donating using UPI or bank transfer. Optionally, you can also donate
            via the QR code.
          </Text>

          {/* Account Information Section (Styled as Card) */}
          <View style={styles.accountCard}>
            <Text style={styles.accountHeading}>Bank Transfer Details</Text>
            <Text style={styles.accountInfo}>
              <Text style={styles.label}>Acc Name:</Text> DaanSethu
              Charitable Trust{"\n"}
              <Text style={styles.label}>Account Number:</Text> 1234567890{"\n"}
              <Text style={styles.label}>Bank Name:</Text> State Bank of India
              {"\n"}
              <Text style={styles.label}>IFSC Code:</Text> SBIN0012345
            </Text>
          </View>

          {/* Show QR Code Button */}
          <TouchableOpacity
            onPress={toggleQRModal}
          >
            <Text style={styles.btnText1}>Show QR Code</Text>
          </TouchableOpacity>

          {/* Buttons Section (Side by Side) */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.upiButton}
              onPress={handleUPIPayment}
            >
              <Text style={styles.btnText}>Donate via UPI</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
              <Text style={styles.btnText}>Contact Us</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.note}>
            Note: Ensure that the UPI ID and bank details are correct before
            proceeding with any payments.
          </Text>
        </View>
      </ScrollView>

      {/* QR Code Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showQRModal}
        onRequestClose={toggleQRModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Scan QR Code to Donate</Text>
            <Image
              style={styles.qrImage}
              source={require("../../assets/images/QR code.png")} // Use the actual QR image here
            />

            <Pressable  onPress={toggleQRModal}>
              <Text style={styles.closeButtonText}>❌</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
    fontFamily:"outfitbold"
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    fontFamily:"outfit"
  },
  qrToggleButton: {
    backgroundColor: "#8c6fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginTop: 20,
    width: WindowWidth * 0.5,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    width: "100%",
  },
  upiButton: {
    backgroundColor: "#8c6fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: WindowWidth * 0.42,
    alignItems: "center",
  },
  contactButton: {
    backgroundColor: "#8c6fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: WindowWidth * 0.42,
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily:"outfit"
  },
  btnText1: {
    fontSize: 16,
    color: "#8C6FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily:"outfit"
  },
  accountCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    width: "100%",
    marginBottom: 40,
    marginBottom: 40,
  },
  accountHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
    fontFamily:"outfit"
  },
  accountInfo: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    textAlign: "center",
    fontFamily:"outfit"
  },
  label: {
    fontWeight: "bold",
    fontFamily:"outfit"
  },
  note: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    fontFamily:"outfit"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: WindowWidth * 0.8,
    height: WindowHeight * 0.5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    fontFamily:"outfit"
  },
  qrImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    marginBottom: 30,
  },
  closeButton: {
    backgroundColor: "#8c6fff",
    borderRadius: 99,
    width: 30,
    height: 30,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop:4,
    marginLeft:-1
  },
});
