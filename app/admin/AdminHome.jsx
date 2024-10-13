import { SafeAreaView, StyleSheet, FlatList, View } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import PendingVerifications from '../AdminPanel/Verification';

export default function AdminHome() {
  const data = [];
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={null}
        ListHeaderComponent={() => (
          <View>
            <PendingVerifications/>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1eef2",
  },
  home: {
    fontSize: 35,
    fontFamily: "outfitbold",
    color: "green",
  },
});
