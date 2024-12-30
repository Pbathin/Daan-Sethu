import React, { useState } from 'react';
import { StyleSheet, View, FlatList, StatusBar, RefreshControl } from 'react-native';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import PopularFoodList from '../../components/Home/RecentDonates/PopularFoodList';
import RecentFeedback from '../../components/Home/RecentFeedback';
import PopClothes from '../../components/Home/RecentDonates/PopClothes';
import PopBooks from '../../components/Home/RecentDonates/PopBooks';
import PopHouseholdItems from '../../components/Home/RecentDonates/PopHouseholdItems';
import PopGadgets from '../../components/Home/RecentDonates/PopGadgets';
import PopOtherItems from '../../components/Home/RecentDonates/PopOtherItems';

export default function Home() {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        setTimeout(() => {
            setData([...data]); 
            setRefreshing(false);
        }, 1500); 
    };

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
                        <PopClothes/>
                        <PopBooks/>
                        <PopHouseholdItems/>
                        <PopGadgets/>
                        <PopOtherItems/>
                        <RecentFeedback />
                    </View>
                )}
                contentContainerStyle={styles.listContent}
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
        backgroundColor: '#F8F8F8',
    },
    topSection: {
        backgroundColor: '#8c1aff',
        marginTop: -25,
    },
    listContent: {
        paddingBottom: 20,
    },
});
