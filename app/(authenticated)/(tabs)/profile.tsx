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
import { Bodoni72Text, CalibriText } from "@/constants/styles/StyledText";
import { router } from "expo-router";

import { signOut } from "@/app/(auth)/utils/utils";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useGetBusinessInfoAPI } from "../components/profile/apis/getBusinessInfoAPI";

const Profile = () => {
    const colorScheme = useColorScheme();

    const { currentBusinessInfo, isLoading, refetch } = useGetBusinessInfoAPI();

    const businessName = currentBusinessInfo?.name;

    return (
        <>
            <View
                style={{
                    alignItems: "center",
                    flex: 1,
                    backgroundColor: Colors[colorScheme ?? "light"].separator,
                }}
            >
                {/* header part */}
                <LinearGradient
                    colors={["rgba(131, 100, 232, .8)", "rgba(69, 16, 106, 1)"]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderWidth: 1.5,
                        width: wp("101%"),
                        height: hp("27.5%"),
                        marginTop: -1,
                        borderBottomEndRadius: 100,
                    }}
                ></LinearGradient>
                <View
                    style={{
                        position: "absolute",
                        marginVertical: hp("9%"),
                        alignItems: "center",
                    }}
                >
                    <Bodoni72Text
                        style={{
                            fontSize: 36,
                            marginBottom: 10,
                            color: Colors[colorScheme ?? "light"]
                                .textButtonColor,
                        }}
                    >
                        Hi{" "}
                        <Bodoni72Text
                            style={{
                                color: Colors[colorScheme ?? "light"]
                                    .textButtonColor,
                            }}
                        >
                            {businessName}
                        </Bodoni72Text>
                    </Bodoni72Text>

                    <CalibriText
                        style={{
                            justifyContent: "center",
                            color: Colors[colorScheme ?? "light"]
                                .textButtonColor,
                            // color: "rgba(32, 3, 96, 1)",
                        }}
                    >
                        We make your daily tasks easier
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
                            resizeMode: "center",
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
                            style={[
                                styles.buttonContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderColor:
                                        Colors[colorScheme ?? "light"].tint,
                                },
                            ]}
                        >
                            <AntDesign
                                name="profile"
                                size={28}
                                color={Colors[colorScheme ?? "light"].tint}
                                style={{ marginLeft: wp("5%") }}
                            />
                            <Text style={{ fontSize: 16 }}>
                                Business Information
                            </Text>
                            <AntDesign
                                name="rightcircleo"
                                size={28}
                                color={Colors[colorScheme ?? "light"].tint}
                                style={{ marginRight: wp("5%") }}
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
                            style={[
                                styles.buttonContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderColor:
                                        Colors[colorScheme ?? "light"].tint,
                                },
                            ]}
                        >
                            <AntDesign
                                name="team"
                                size={28}
                                color={Colors[colorScheme ?? "light"].tint}
                                style={{ marginLeft: wp("5%") }}
                            />
                            <Text style={{ fontSize: 16 }}>
                                Staff Information
                            </Text>
                            <AntDesign
                                name="rightcircleo"
                                size={28}
                                color={Colors[colorScheme ?? "light"].tint}
                                style={{ marginRight: wp("5%") }}
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
                            style={[
                                styles.buttonContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderColor:
                                        Colors[colorScheme ?? "light"].tint,
                                },
                            ]}
                        >
                            <AntDesign
                                name="star"
                                size={28}
                                color={Colors[colorScheme ?? "light"].tint}
                                style={{ marginLeft: wp("5%") }}
                            />
                            <Text style={{ fontSize: 16 }}>
                                Service Information
                            </Text>
                            <AntDesign
                                name="rightcircleo"
                                size={28}
                                color={Colors[colorScheme ?? "light"].tint}
                                style={{ marginRight: wp("5%") }}
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
                            style={[
                                styles.buttonContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderColor:
                                        Colors[colorScheme ?? "light"].tint,
                                },
                            ]}
                        >
                            <AntDesign
                                name="setting"
                                size={28}
                                color={Colors[colorScheme ?? "light"].tint}
                                style={{ marginLeft: wp("5%") }}
                            />
                            <Text style={{ fontSize: 16 }}>Settings</Text>
                            <AntDesign
                                name="rightcircleo"
                                size={28}
                                color={Colors[colorScheme ?? "light"].tint}
                                style={{ marginRight: wp("5%") }}
                            />
                        </View>
                    </Pressable>
                </View>

                {/* sign out */}
                <View
                    style={{
                        marginTop: hp("2%"),
                    }}
                >
                    <Pressable
                        onPress={() =>
                            signOut().then(() => {
                                router.replace("/(auth)/screens/Welcome");
                            })
                        }
                    >
                        <View
                            style={[
                                styles.buttonContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"].tint,
                                    // borderColor:
                                    //     Colors[colorScheme ?? "light"].tint,

                                    borderColor: "transparent",
                                },
                            ]}
                        >
                            <Feather
                                name="log-out"
                                size={28}
                                color={
                                    Colors[colorScheme ?? "light"]
                                        .textButtonColor
                                }
                                style={{
                                    marginLeft: wp("5%"),
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: Colors[colorScheme ?? "dark"]
                                        .textButtonColor,
                                }}
                            >
                                Sign Out
                            </Text>
                            <AntDesign
                                name="rightcircleo"
                                size={28}
                                color={
                                    Colors[colorScheme ?? "light"]
                                        .textButtonColor
                                }
                                style={{ marginRight: wp("5%") }}
                            />
                        </View>
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default Profile;

const styles = StyleSheet.create({
    buttonContainer: {
        borderWidth: 1.25,
        width: wp("90%"),
        height: hp("6.9%"),
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    // signOutButton: {
    //     width: wp("60%"),
    //     height: hp("6.9%"),
    //     borderRadius: 45,
    //     alignSelf: "flex-start",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     flexDirection: "row",
    // },
});
