// import { Text, View } from "react-native";
// import { Redirect } from "expo-router";
// import firestore from '@react-native-firebase/firestore';

// export default function Index() {
//      return <Redirect href={'/home'}/>

// }


import {  Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

export default function Index() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      const role = user?.publicMetadata?.role;
      console.log({"ROLE":role})
      setIsAdmin(role === "admin");
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return null;
  }

  // if (!isSignedIn) {
  //   return <Redirect href={'/login'} />;
  // }

  return isAdmin ? <Redirect href={'/admin'} /> : <Redirect href={'/home'} />;
}
