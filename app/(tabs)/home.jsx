import React from 'react';
import { StyleSheet, View, FlatList, StatusBar } from 'react-native';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import PopularFoodList from '../../components/Home/PopularFoodList';
import RecentFeedback from '../../components/Home/RecentFeedback';

export default function Home() {
    const data = [];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#8c1aff" />

            {/* Top Section with Background Color */}
            <View style={styles.topSection}>
                <Header />
            </View>

            {/* Rest of the Screen */}
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={null}
                ListHeaderComponent={() => (
                    <View>
                        <Slider />
                        <Category />
                        <PopularFoodList />
                        <RecentFeedback />
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8', // Default background for the rest of the screen
    },
    topSection: {
        backgroundColor: '#8c1aff', // Background color for the top section
        // paddingBottom: 10, // Adjust to match the height of your header
        marginTop:-25
    },
    listContent: {
        paddingBottom: 20, // Ensures proper spacing at the bottom
    },
});
