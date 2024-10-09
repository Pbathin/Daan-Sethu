import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Category() {
    const router = useRouter();
    return (
        <View>
            <View style={styles.sub}>
                <Text style={styles.headerText}>Category</Text>
            </View>
            <ScrollView>
                <View
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.sub_block}>
                    <TouchableOpacity
                        onPress={() => router.push("/FoodShare/exploreList")}
                    >
                        <View style={styles.icon}>
                            <Image
                                source={require("../../assets/images/Food share.png")}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.text}>Food Share</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push("/FoodShare/DonateFoodEx")}
                    >
                        <View style={styles.icon}>
                            <Image
                                source={require("../../assets/images/Food donate.png")}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.text}>Food Donate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push("/Organizations/Orphanages")}
                    >
                        <View
                            style={styles.icon}>
                            <Image
                                source={require("../../assets/images/orphanages.png")}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.text}>Orphanages</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push("/Organizations/OldAgeHomes")}
                    >
                        <View style={styles.icon}>
                            <Image
                                source={require("../../assets/images/oldagehome.png")}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.text}>Old Age Homes</Text>
                    </TouchableOpacity>
                
               
                    
                    <TouchableOpacity
                        onPress={() => router.push("/Volunteers/Volunteers")}
                    >
                        <View style={styles.icon}>
                            <Image
                                source={require("../../assets/images/Volunteers.png")}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.text}>Volunteers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push("/Feedback/DisplayFeedback")}
                    >
                        <View style={styles.icon}>
                            <Image
                                source={require("../../assets/images/feedback.png")}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.text}>Feedback</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push("/SupportUs/supportUs")}
                    >
                        <View style={styles.icon}>
                            <Image
                                source={require("../../assets/images/Support Us.png")}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.text}>Support Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push("/SupportUs/supportUs")}
                    >
                        <View style={styles.icon}>
                            <Image
                                source={require("../../assets/images/Support Us.png")}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.text}>Support Us</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    sub_block: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
        rowGap:10
    },
    headerText: {
        marginTop: 10,
        fontSize: 20,
        fontFamily: "outfitbold",
    },
    sub: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    subheadtxt: {
        marginTop: 20,
        fontFamily: "outfitmedium",
        color: "#B9BDD8",
    },
    image: {
        width: 50,
        height: 50,
        margin: 10,
    },
    icon: {
        backgroundColor: "#DDD6E5",
        borderRadius: 99,
        margin: 10,
    },
    text: {
        fontFamily: "outfitmedium",
        fontSize: 12,
        textAlign: "center",
        marginTop: -5,
    },
});
