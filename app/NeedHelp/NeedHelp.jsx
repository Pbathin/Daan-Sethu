import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { router, useNavigation } from 'expo-router';
import { WindowWidth } from '../../GlobalCSS';

export default function NeedHelp() {

  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Need Help?',
      headerShown: true,
      headerStyle: {
        backgroundColor: '#8c6fff',
      },
      headerTitleStyle: {
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'outfit',
      },
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subcont}>
        
        {/* How it Works Section */}
        <Text style={styles.Header}>How it Works</Text>
        <Text style={styles.contents}>
          If you need assistance with financial matters such as paying hospital bills, 
          building homes, buying medicine, or handling emergencies, you can submit a request for help.
          <Text style={styles.highlight}> Each request will be carefully verified</Text> by the DaanSethu administrator to ensure authenticity.
        </Text>
        <Text style={styles.contents}>
          <Text style={styles.highlight}>Genuine requests</Text> may receive the full or partial amount needed, depending on the discretion of DaanSethu. This process ensures support reaches those who truly need it.
        </Text>

        {/* Who can Apply Section */}
        <Text style={styles.Header}>Who can Apply?</Text>
        <Text style={styles.contents}>
          - Individuals facing financial difficulties are eligible to apply. {'\n'}
          - Assistance can be requested for medical bills, home construction, essential medicines, or emergencies. {'\n'}
          - Applications are open to anyone in genuine need of support. {'\n'}
          - <Text style={styles.highlight}>Each request will be reviewed</Text> to ensure authenticity and valid requests will be supported.
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={() => router.push("/NeedHelp/ApplyForHelp")}
        style={styles.btn}
      >
        <Text style={styles.btnTxt}>Submit a Request</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9', // Softer background color
  },
  subcont: {
    padding: 15,
  },
  Header: {
    fontFamily: 'outfitbold',
    fontSize: 20,
    color: '#4b4b4b',
    marginVertical: 12,
    textAlign: 'center',
  },
  contents: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#636363',
    textAlign: 'justify',
    marginHorizontal: 10,
    lineHeight: 24,
  },
  highlight: {
    fontFamily: 'outfitmedium',
    color: '#8c6fff',
  },
  btn: {
    padding: 12,
    backgroundColor: '#8c6fff',
    borderRadius: 8,
    marginTop: 30,
    width: WindowWidth * 0.6,
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 3, // Add shadow for a raised button effect
  },
  btnTxt: {
    fontFamily: "outfitmedium",
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  }
});
