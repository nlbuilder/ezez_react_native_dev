import {
    StyleSheet,
    Text,
    View,
    Image,
    useColorScheme,
    Pressable,
} from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "@/constants/styles/Colors";
import { CalibriText, FuzzyBubblesText } from "@/constants/styles/StyledText";
import { router } from "expo-router";

const Profile = () => {
    const colorScheme = useColorScheme();

    return (
        <>
            <View
                style={{
                    alignItems: "center",
                    flex: 1,
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                }}
            >
                <View
                    style={{
                        borderBottomColor:
                            Colors[colorScheme ?? "light"].tabIconSelected,
                        borderLeftColor: "transparent",
                        borderRightColor:
                            Colors[colorScheme ?? "light"].tabIconSelected,

                        borderWidth: 1.5,
                        width: wp("101%"),
                        height: hp("27.5%"),
                        marginTop: -1,
                        borderBottomEndRadius: 100,
                    }}
                ></View>
                <View
                    style={{
                        position: "absolute",
                        marginVertical: hp("10%"),
                        alignItems: "center",
                    }}
                >
                    <FuzzyBubblesText
                        style={{
                            fontWeight: 500,
                            fontSize: 32,
                            marginBottom: 10,
                        }}
                    >
                        EzEz
                    </FuzzyBubblesText>

                    <CalibriText
                        style={{
                            fontWeight: 400,
                            justifyContent: "center",
                        }}
                    >
                        make your daily tasks easier
                    </CalibriText>
                </View>
                <View
                    style={{ position: "absolute", marginVertical: hp("20%") }}
                >
                    <Image
                        source={require("../../../assets/images/icon.png")}
                        style={{
                            width: wp("30%"),
                            height: wp("30%"),
                            borderColor:
                                Colors[colorScheme ?? "light"].tabIconSelected,
                            borderWidth: 1.5,
                            borderRadius: 100,
                        }}
                    />
                </View>

                {/* Business Info */}
                <View style={{ marginTop: hp("12%") }}>
                    <Pressable
                        onPress={() =>
                            router.navigate(
                                "/(authenticated)/components/profile/screens/BusinessInfo"
                            )
                        }
                    >
                        <View
                            style={{
                                backgroundColor:
                                    colorScheme === "dark"
                                        ? "white"
                                        : "transparent",
                                borderColor:
                                    Colors[colorScheme ?? "light"]
                                        .tabIconSelected,
                                borderWidth: 1.25,
                                width: wp("86%"),
                                height: hp("8%"),
                                borderRadius: 35,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{ fontWeight: 400, fontSize: 16 }}>
                                Business Information
                            </Text>
                        </View>
                    </Pressable>
                </View>

                {/* Staff Info */}
                <View style={{ marginTop: hp("2.5%") }}>
                    <Pressable
                        onPress={() =>
                            router.navigate(
                                "/(authenticated)/components/profile/screens/StaffInfo"
                            )
                        }
                    >
                        <View
                            style={{
                                backgroundColor:
                                    colorScheme === "dark"
                                        ? "white"
                                        : "transparent",
                                borderColor:
                                    Colors[colorScheme ?? "light"]
                                        .tabIconSelected,
                                borderWidth: 1.25,
                                width: wp("86%"),
                                height: hp("8%"),
                                borderRadius: 35,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{ fontWeight: 400, fontSize: 16 }}>
                                Staff Information
                            </Text>
                        </View>
                    </Pressable>
                </View>

                {/* Services */}
                <View style={{ marginTop: hp("2.5%") }}>
                    <Pressable
                        onPress={() =>
                            router.replace(
                                "/(authenticated)/components/profile/screens/Service"
                            )
                        }
                    >
                        <View
                            style={{
                                backgroundColor:
                                    colorScheme === "dark"
                                        ? "white"
                                        : "transparent",
                                borderColor:
                                    Colors[colorScheme ?? "light"]
                                        .tabIconSelected,
                                borderWidth: 1.25,
                                width: wp("86%"),
                                height: hp("8%"),
                                borderRadius: 35,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{ fontWeight: 400, fontSize: 16 }}>
                                Services
                            </Text>
                        </View>
                    </Pressable>
                </View>

                {/* Settings */}
                <View style={{ marginTop: hp("2.5%") }}>
                    <Pressable
                        onPress={() =>
                            router.replace(
                                "/(authenticated)/components/profile/screens/Settings"
                            )
                        }
                    >
                        <View
                            style={{
                                backgroundColor:
                                    colorScheme === "dark"
                                        ? "white"
                                        : "transparent",
                                borderColor:
                                    Colors[colorScheme ?? "light"]
                                        .tabIconSelected,
                                borderWidth: 1.25,
                                width: wp("86%"),
                                height: hp("8%"),
                                borderRadius: 35,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{ fontWeight: 400, fontSize: 16 }}>
                                Settings
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "20%",
        width: "90%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
