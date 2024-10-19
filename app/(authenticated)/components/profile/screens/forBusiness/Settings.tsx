import {
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/styles/Colors";

import { useGetBusinessHourAPI } from "../../apis/getBusinessHourAPI";

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
    const { businessHourInfo } = useGetBusinessHourAPI();

    const startTime =
        (Array.isArray(businessHourInfo) && businessHourInfo[0]?.startTime) ||
        "10:00 AM";
    const finishTime =
        (Array.isArray(businessHourInfo) && businessHourInfo[0]?.finishTime) ||
        "7:00 PM";

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors[colorScheme ?? "light"].background,
            }}
        >
            {/* Opening hours setting */}
            <View
                style={[
                    styles.settingComponent,
                    {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    },
                ]}
            >
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
                <Pressable
                    onPress={() => {
                        router.navigate(
                            "/(authenticated)/components/profile/components/settings/forBusiness/UpdateOpeningHourSetting"
                        );
                    }}
                    style={{ paddingHorizontal: 10 }}
                >
                    <AntDesign name="setting" size={24} color="black" />
                </Pressable>
            </View>

            <View
                style={{
                    width: wp("86%"),
                    height: hp("10%"),
                    borderColor: "rgba(189, 195, 199, 0.8)",
                    borderWidth: 1,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignSelf: "center",
                    flexDirection: "row",
                }}
            >
                {/* set timeStart */}
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: wp("5%"),
                    }}
                >
                    <Text style={{ padding: hp("1.5%") }}>{startTime}</Text>
                    <Text style={{ paddingBottom: hp("1.25%") }}>
                        {finishTime}
                    </Text>
                </View>

                {/* set timeFinish */}
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: wp("5%"),
                    }}
                >
                    <Text style={{ padding: hp("1.5%") }}>Opening Time</Text>
                    <Text style={{ paddingBottom: hp("1.25%") }}>
                        Closing Time
                    </Text>
                </View>
            </View>

            <View style={styles.settingComponent}>
                {/* Account deletion setting */}
                <Text
                    style={[
                        {
                            color: Colors[colorScheme ?? "light"].text,
                        },
                        styles.titleText,
                    ]}
                >
                    Danger Zone
                </Text>
            </View>

            <View
                style={{
                    width: wp("86%"),
                    height: hp("10%"),
                    borderColor: "rgba(192,88,88,1)",
                    borderWidth: 1,
                    borderRadius: 15,
                    alignSelf: "center",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "red", margin: wp("5%") }}>
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
                            style={{
                                marginLeft: wp("20%"),
                            }}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    settingComponent: {
        marginTop: wp("10%"),
        marginBottom: 5,
        marginHorizontal: wp("10%"),
    },
    titleText: {
        fontSize: 16,
        fontWeight: 400,
    },
});
