import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import FoodList from '../../components/Home/FoodList';
import PopularFoodList from '../../components/Home/PopularFoodList';
import RecentFeedback from '../../components/Home/RecentFeedback';

export default function Home() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Header />
                <Slider />
                <Category />
                <PopularFoodList />
                <RecentFeedback/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    home: {
        fontSize: 35,
        fontFamily: 'outfitbold',
        color: 'green',
    },
});
