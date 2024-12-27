import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { WindowHeight, WindowWidth } from '../../GlobalCSS';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';

export default function AboutUs() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'About Us',
      headerShown: true,
      headerStyle: {
        backgroundColor: '#8c1aff', //#8c6fff
      },
      headerTitleStyle: {
        fontSize: 22,
        color: '#ffffff',
        fontFamily: 'outfitbold',
      },
      headerTitleAlign: 'center',
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Introduction Section */}
      <View style={styles.textSection}>
        <Text style={styles.heads}>Introduction</Text>
        <Text style={styles.description}>
          DaanSethu is a mobile application designed to bridge the gap between those in need and those willing to help. 
          It enables users to connect with organizations like old age homes, orphanages, and NGOs, offering an easy way to donate, volunteer, or extend support. 
          With a simple and intuitive interface, DaanSethu fosters a sense of community and encourages acts of kindness, making it effortless to contribute to meaningful causes.
        </Text>
      </View>

      {/* Motivation Section */}
      <View style={styles.textSection}>
        <Text style={styles.heads}>Our Motivation</Text>
        <Text style={styles.description}>
          The idea for DaanSethu was born out of a desire to make a meaningful impact in the lives of those who need it most. 
          We witnessed communities coming together to help others, yet also saw how difficult it was to connect donors with the right organizations. 
          This inspired us to create a platform that simplifies this process, making it easier for people to contribute to causes they care about. 
          DaanSethu is not just an app; it is our way of encouraging compassion, building connections, and ensuring that help reaches those who truly need it.
        </Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Let's build a better world together ❤️</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  textSection: {
    padding: 20,
    marginTop: 8,
  },
  heads: {
    fontFamily: 'outfitbold',
    fontSize: 24,
    color: '#8C1AFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: 'black',
    lineHeight: 24,
    textAlign: 'justify',
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: '#8C1AFF',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'outfitbold',
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
});
