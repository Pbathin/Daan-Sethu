import { StyleSheet, FlatList, View, RefreshControl } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Home/Header";
import PendingVerifications from "../AdminPanel/Verification";

export default function AdminHome() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]); 

  const onRefresh = async () => {
    setRefreshing(true);
    
    try {
      const updatedData = [];
      setData(updatedData);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={null}
        ListHeaderComponent={() => (
          <View>
            <PendingVerifications />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
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
