import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { router, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/styles/Colors";

import { useGetBusinessHourAPI } from "@/app/(authenticated)/components/profile/apis/getBusinessHourAPI";
import { useGetBusinessInfoAPI } from "../../apis/getBusinessInfoAPI";

const Settings = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    // handle the header when this screen is rendered
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Settings",
            headerBackTitle: "Back",
            presentation: "card",
        });
    }, [navigation]);

    // get the businessHour info
    const {
        businessHourInfo,
        isLoading: isGetBusinessHourLoading,
        refetch: refetchGetBusinessHour,
    } = useGetBusinessHourAPI();

    // get the business info
    // const {
    //     currentBusinessInfo,
    //     isLoading: isGetBusinessInfoLoading,
    //     refetch: refetchGetBusinessInfo,
    // } = useGetBusinessInfoAPI();

    const startTime =
        (Array.isArray(businessHourInfo) && businessHourInfo[0]?.startTime) ||
        "10:00 AM";
    const finishTime =
        (Array.isArray(businessHourInfo) && businessHourInfo[0]?.finishTime) ||
        "7:00 PM";

    return (
        <ScrollView
            style={{
                // flex: 1,
                backgroundColor: Colors[colorScheme ?? "light"].background,
                borderTopColor: Colors[colorScheme ?? "light"].separator,
                borderTopWidth: 1,
            }}
        >
            {/* Opening hours setting */}
            <View>
                <Text
                    style={[
                        {
                            color: Colors[colorScheme ?? "light"].text,
                        },
                        styles.titleText,
                    ]}
                >
                    Opening Hours
                </Text>

                {/* Opening hours setting component */}
                <View style={[styles.settingComponent]}>
                    {/* First Column */}
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ paddingVertical: hp("2%") }}>
                            {startTime}
                        </Text>
                        <Text style={{ paddingBottom: hp("2%") }}>
                            {finishTime}
                        </Text>
                    </View>

                    {/* Second Column */}
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ paddingVertical: hp("2%") }}>
                            Opening Time
                        </Text>
                        <Text style={{ paddingBottom: hp("2%") }}>
                            Closing Time
                        </Text>
                    </View>

                    {/* Third Column */}
                    <View style={{ alignItems: "center" }}>
                        <Pressable
                            onPress={() => {
                                router.push({
                                    pathname:
                                        "/(authenticated)/components/profile/components/settings/forBusiness/UpdateOpeningHourSetting",
                                    params: {
                                        startTime: startTime,
                                        finishTime: finishTime,
                                    },
                                });
                            }}
                        >
                            <AntDesign
                                name="setting"
                                size={24}
                                color={Colors[colorScheme ?? "light"].text}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* Update email or password */}
            <View>
                <Text
                    style={[
                        {
                            color: Colors[colorScheme ?? "light"].text,
                        },

                        styles.titleText,
                    ]}
                >
                    Update Account
                </Text>
            </View>

            <View
                style={{
                    width: wp("86%"),
                    borderColor: "rgba(189, 195, 199, 0.8)",
                    borderWidth: 1,
                    borderRadius: 15,
                    alignSelf: "center",
                    paddingHorizontal: wp("5%"),
                    paddingVertical: hp("1%"),
                }}
            >
                {/* Second Row - Update Password */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ paddingVertical: hp("1%") }}>
                        Update password
                    </Text>
                    <Pressable
                        onPress={() =>
                            router.push({
                                pathname:
                                    "/(authenticated)/components/profile/components/settings/forBusiness/UpdatePassword",
                            })
                        }
                    >
                        <AntDesign
                            name="setting"
                            size={24}
                            color={Colors[colorScheme ?? "light"].text}
                        />
                    </Pressable>
                </View>
            </View>

            {/* Terms and Conditions */}
            <View>
                <Text
                    style={[
                        {
                            color: Colors[colorScheme ?? "light"].text,
                        },

                        styles.titleText,
                    ]}
                >
                    Terms & Conditions
                </Text>
            </View>

            <View
                style={{
                    width: wp("86%"),
                    borderColor: "rgba(189, 195, 199, 0.8)",
                    borderWidth: 1,
                    borderRadius: 15,
                    alignSelf: "center",
                    paddingHorizontal: wp("5%"),
                    paddingVertical: hp("1%"),
                }}
            >
                {/* First Row */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ paddingVertical: hp("1%") }}>
                        Terms and conditions
                    </Text>
                    <Pressable
                        onPress={() =>
                            router.push(
                                "/components/profile/components/settings/forBusiness/TermsAndConditions"
                            )
                        }
                    >
                        <MaterialCommunityIcons
                            name="open-in-new"
                            size={24}
                            color={Colors[colorScheme ?? "light"].text}
                        />
                    </Pressable>
                </View>

                {/* Second Row */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ paddingVertical: hp("1%") }}>
                        Privacy policy
                    </Text>
                    <Pressable
                        onPress={() =>
                            router.push(
                                "/components/profile/components/settings/forBusiness/PrivacyPolicy"
                            )
                        }
                    >
                        <MaterialCommunityIcons
                            name="open-in-new"
                            size={24}
                            color={Colors[colorScheme ?? "light"].text}
                        />
                    </Pressable>
                </View>
            </View>

            {/* danger zone */}
            <View>
                {/* Account deletion setting */}
                <Text style={[styles.titleText, { color: "red" }]}>
                    Danger Zone
                </Text>

                <View
                    style={[
                        styles.settingComponent,
                        {
                            borderColor: "rgba(192,88,88,1)",
                            marginBottom: hp("10%"),
                        },
                    ]}
                >
                    <Text style={{ color: "red", paddingVertical: hp("2.5%") }}>
                        Delete business account
                    </Text>

                    <Pressable
                        onPress={() => {
                            router.push({
                                pathname:
                                    "/(authenticated)/components/profile/screens/forBusiness/DeleteBusiness",
                            });
                        }}
                    >
                        <MaterialCommunityIcons
                            name="delete-forever"
                            size={24}
                            color="red"
                        />
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    settingComponent: {
        width: wp("86%"),
        borderColor: "rgba(189, 195, 199, 0.8)",
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center", // center vertically
        paddingHorizontal: wp("5%"),
    },

    titleText: {
        fontSize: 16,
        marginBottom: hp("1%"),
        paddingHorizontal: wp("10%"),
        marginTop: wp("10%"),
    },
});
