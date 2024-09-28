import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import PopularFoodList from '../../components/Home/PopularFoodList';
import RecentFeedback from '../../components/Home/RecentFeedback';

// export default function Home() {
//     const data = []; 
//     return (
//         <SafeAreaView style={styles.container}>
//             <Header />
//             <ScrollView >
//                 <Slider />
//                 <Category />
//                 <PopularFoodList />
//                 <RecentFeedback />
//             </ScrollView>
//         </SafeAreaView>
//     );
// }


export default function Home() {
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
                        <Slider />
                        <Category />
                        <PopularFoodList />
                        <RecentFeedback />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    home: {
        fontSize: 35,
        fontFamily: 'outfitbold',
        color: 'green',
    },
});
