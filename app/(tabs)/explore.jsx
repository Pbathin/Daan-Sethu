// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export default function explore() {
//   return (
//     <View style={{
//       display:'flex',
//     }}>
//       <Text style={{
//         textAlign:'center',
//         fontSize:18,
//         fontFamily:'outfitbold',
//         color:'black',
//         marginTop:150,
//       }}>Big changes are on the Way,</Text>
//       <Text style={{
//         textAlign:'center',
//         fontSize:20,
//         fontFamily:'outfitbold',
//         color:'black',
//         marginTop:10,
//       }}>Stay Tuned...!</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})



import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ExploreList from '../../components/Explore/ExploreList'

export default function Explore() {
  return (
    <View>
      <ExploreList/>
    </View>
  )
}