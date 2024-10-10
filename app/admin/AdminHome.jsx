import { SafeAreaView, StyleSheet, FlatList, View } from "react-native";
import React from "react";
import { WindowHeight } from "../../GlobalCSS";
import Header from "../../components/Home/Header";
import PendingOrgs from "../../components/AdminPanel/PendingOrgs";

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
            <PendingOrgs />
          </View>
        )}
      />
    </SafeAreaView>
    // <View>
    // <Header/>
    //   <PendingOrgs/>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  home: {
    fontSize: 35,
    fontFamily: "outfitbold",
    color: "green",
  },
});
