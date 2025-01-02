import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ExploreList from '../../components/Explore/ExploreList'
import PopBooks from '../../components/Home/RecentDonates/PopBooks';
import PopularFoodList from '../../components/Home/RecentDonates/PopularFoodList';
import PopClothes from '../../components/Home/RecentDonates/PopClothes';
import PopHouseholdItems from '../../components/Home/RecentDonates/PopHouseholdItems';
import PopOtherItems from '../../components/Home/RecentDonates/PopOtherItems';
import PopGadgets from '../../components/Home/RecentDonates/PopGadgets';

export default function Explore() {
  return (
    <ScrollView>
      <ExploreList/>
      {/* <PopularFoodList/>
      <PopClothes/>
      <PopBooks/>
      <PopHouseholdItems/>
      <PopGadgets/>
      <PopOtherItems/> */}
    </ScrollView>
  )
}