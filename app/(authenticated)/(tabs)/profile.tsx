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
import {
    CalibriText,
    FuzzyBubblesText,
    TimesRegularText,
} from "@/constants/styles/StyledText";
import { router } from "expo-router";

import { signOut } from "@/app/(auth)/utils/utils";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";

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
                    <CalibriText
                        style={{
                            fontWeight: 500,
                            fontSize: 38,
                            marginBottom: 10,
                        }}
                    >
                        EzEz
                    </CalibriText>

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
                                "/(authenticated)/components/profile/screens/forBusiness/BusinessInfo"
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
                                width: wp("80%"),
                                height: hp("6.9%"),
                                borderRadius: 35,
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <MaterialIcons
                                name="business-center"
                                size={28}
                                color={
                                    colorScheme !== "dark"
                                        ? "rgba(78,147,214,1)"
                                        : "grey"
                                }
                                style={{ marginLeft: wp("5%") }}
                            />
                            <Text style={{ fontWeight: 400, fontSize: 16 }}>
                                Business Information
                            </Text>
                            <AntDesign
                                name="arrowright"
                                size={28}
                                color={
                                    colorScheme !== "dark"
                                        ? "rgba(78,147,214,1)"
                                        : "grey"
                                }
                                style={{ marginRight: wp("2.5%") }}
                            />
                        </View>
                    </Pressable>
                </View>

                {/* Staff Info */}
                <View style={{ marginTop: hp("2%") }}>
                    <Pressable
                        onPress={() =>
                            router.navigate(
                                "/(authenticated)/components/profile/screens/forBusiness/StaffInfo"
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
                                width: wp("80%"),
                                height: hp("6.9%"),
                                borderRadius: 35,
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <AntDesign
                                name="team"
                                size={28}
                                color={
                                    colorScheme !== "dark"
                                        ? "rgba(78,147,214,1)"
                                        : "grey"
                                }
                                style={{ marginLeft: wp("5%") }}
                            />
                            <Text style={{ fontWeight: 400, fontSize: 16 }}>
                                Staff Information
                            </Text>
                            <AntDesign
                                name="arrowright"
                                size={28}
                                color={
                                    colorScheme !== "dark"
                                        ? "rgba(78,147,214,1)"
                                        : "grey"
                                }
                                style={{ marginRight: wp("2.5%") }}
                            />
                        </View>
                    </Pressable>
                </View>

                {/* Services */}
                <View style={{ marginTop: hp("2%") }}>
                    <Pressable
                        onPress={() =>
                            router.navigate(
                                "/(authenticated)/components/profile/screens/forBusiness/Service"
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
                                width: wp("80%"),
                                height: hp("6.9%"),
                                borderRadius: 35,
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <AntDesign
                                name="star"
                                size={28}
                                color={
                                    colorScheme !== "dark"
                                        ? "rgba(78,147,214,1)"
                                        : "grey"
                                }
                                style={{ marginLeft: wp("5%") }}
                            />
                            <Text style={{ fontWeight: 400, fontSize: 16 }}>
                                Service Information
                            </Text>
                            <AntDesign
                                name="arrowright"
                                size={28}
                                color={
                                    colorScheme !== "dark"
                                        ? "rgba(78,147,214,1)"
                                        : "grey"
                                }
                                style={{ marginRight: wp("2.5%") }}
                            />
                        </View>
                    </Pressable>
                </View>

                {/* Settings */}
                <View style={{ marginTop: hp("2%") }}>
                    <Pressable
                        onPress={() =>
                            router.navigate(
                                "/(authenticated)/components/profile/screens/forBusiness/Settings"
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
                                width: wp("80%"),
                                height: hp("6.9%"),
                                borderRadius: 35,
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <AntDesign
                                name="setting"
                                size={28}
                                color={
                                    colorScheme !== "dark"
                                        ? "rgba(78,147,214,1)"
                                        : "grey"
                                }
                                style={{ marginLeft: wp("5%") }}
                            />
                            <Text style={{ fontWeight: 400, fontSize: 16 }}>
                                Settings
                            </Text>
                            <AntDesign
                                name="arrowright"
                                size={28}
                                color={
                                    colorScheme !== "dark"
                                        ? "rgba(78,147,214,1)"
                                        : "grey"
                                }
                                style={{ marginRight: wp("2.5%") }}
                            />
                        </View>
                    </Pressable>
                </View>

                {/* sign out */}
                <View style={{ marginTop: hp("2%") }}>
                    <View
                        style={{
                            backgroundColor:
                                colorScheme !== "dark"
                                    ? "white"
                                    : "transparent",
                            width: wp("80%"),
                            marginTop: 15,
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        <Feather
                            name="log-out"
                            size={28}
                            color={Colors[colorScheme ?? "light"].text}
                            style={{
                                marginLeft: 10,
                                opacity: 0.8,
                            }}
                        />
                        <Pressable
                            onPress={() =>
                                signOut().then(() => {
                                    router.replace("/(auth)/screens/Welcome");
                                })
                            }
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    marginLeft: 10,
                                    color: Colors[colorScheme ?? "light"].text,
                                }}
                            >
                                Sign Out
                            </Text>
                        </Pressable>
                    </View>
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
