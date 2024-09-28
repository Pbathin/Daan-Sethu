import { Text, View } from "react-native";
import { Redirect } from "expo-router";
import firestore from '@react-native-firebase/firestore';

export default function Index() {
     return <Redirect href={'/home'}/>

}

