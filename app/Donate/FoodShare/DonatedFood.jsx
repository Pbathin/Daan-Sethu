import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, storage } from '../../../configs/FirebaseConfig'
import ExploreFoodCardTrash from '../../../components/Explore/ExploreFoodCardTrash';
import { useNavigation } from 'expo-router';

const DonatedFood=()=> {

    const {user} = useUser();

    const [foodList, setFoodList]=useState([]);
    const [loading,setLoading]=useState(false);
    const navigation=useNavigation();
     
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:'Donated Foods',
            headerStyle:{
                backgroundColor: '#8c6fff',
            },
            headerTitleStyle: {   
              fontSize: 18,          
              color: '#ffffff',      
              fontFamily: 'outfit', 
          },
        })
        user&&GetUserFoods()
    },[user])
    const GetUserFoods=async()=>{
        setLoading(true);
        setFoodList([]);
        const q= query(collection(db, 'FoodList'),where ('userEmail','==', user?.primaryEmailAddress?.emailAddress));
        const querySnapshot= await getDocs(q);
        querySnapshot.forEach((doc)=>{
            setFoodList(prev=>[...prev,{id:doc.id,...doc.data()}])
        })
        setLoading(false);
    }
  return (
    <View style={{
        marginTop:5,
        paddingLeft:10
    }}>
      <Text style={{
        fontFamily:'outfitbold',
        fontSize:25, 
      }}>Donated Foods</Text>

      <FlatList
      data={foodList}
      onRefresh={GetUserFoods}
      refreshing={loading}
      renderItem={({item,index})=>(
        <ExploreFoodCardTrash
            foods={item}
            key={index}
        />
      )}
      />
    </View>
  )
}
export default DonatedFood;