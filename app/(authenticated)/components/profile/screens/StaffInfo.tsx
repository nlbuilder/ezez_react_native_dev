import {
    Pressable,
    useColorScheme,
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { router, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Wander } from "react-native-animated-spinkit";

import { useGetBusinessStaffInfoForBusinessAPI } from "@/app/(auth)/apis/getBusinessStaffInfoForBusinessAPI";
import Colors from "@/constants/styles/Colors";
import BusinessInfoCard from "../components/businessInfo/BusinessInfoCard";

const StaffInfo = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const {
        currentBusinessStaffInfoForBusiness,
        refetch,
        isLoading: isGetBusinessStaffInfoLoading,
    } = useGetBusinessStaffInfoForBusinessAPI();

    console.log(
        "currentBusinessStaffInfoForBusiness",
        currentBusinessStaffInfoForBusiness
    );
    // const businessStaffInfoData = [
    //     { title: "Name", value: currentBusinessStaffInfo?.email || "" },
    //     {
    //         title: "Phone Number",
    //         value: currentBusinessStaffInfo?.phoneNumber || "",
    //     },
    // ];

    // handle the header when this screen is rendered
    useEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back",
            headerTitle: "Staff Information",
            presentation: "card",

            headerRight: () => (
                // edit button
                <Pressable
                    onPress={() =>
                        router.navigate({
                            pathname:
                                "/(authenticated)/components/profile/screens/AddStaffInfo",
                        })
                    }
                >
                    <View
                        style={{
                            alignSelf: "flex-end",
                            paddingHorizontal: 15,
                        }}
                    >
                        <AntDesign
                            name={"adduser"}
                            size={24}
                            color={Colors[colorScheme ?? "light"].text}
                        />
                    </View>
                </Pressable>
            ),
        });

        refetch();
    }, [navigation, colorScheme]);

    if (isGetBusinessStaffInfoLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                }}
            >
                <Wander
                    size={45}
                    color={colorScheme === "dark" ? "white" : "grey"}
                    style={{
                        marginBottom: hp("10%"),
                    }}
                />
            </View>
        );
    }

    if (!currentBusinessStaffInfoForBusiness) {
        return (
            <View
                style={{
                    flex: 1,

                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                }}
            >
                <Text
                    style={{
                        color: Colors[colorScheme ?? "light"].text,
                        fontSize: 14,
                        marginBottom: hp("20%"),
                    }}
                >
                    No staff added yet.
                </Text>
            </View>
        );
    }

    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                }}
            >
                <View
                    style={{
                        backgroundColor:
                            Colors[colorScheme ?? "light"].background,
                        height: hp("10%"),
                        borderBottomColor:
                            colorScheme === "dark"
                                ? "white"
                                : "rgba(189, 195, 199, 0.8)",
                        borderBottomWidth: 1,
                        alignSelf: "center",
                        justifyContent: "center",
                        width: wp("90%"),
                    }}
                >
                    <Text
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                            marginLeft: wp("10%"),
                            fontSize: 18,
                            fontWeight: "500",
                        }}
                    >
                        {/* {currentBusinessStaffInfo?.name} */}
                    </Text>
                </View>

                {/* handle the Flastlist */}
                {/* <FlatList
                    data={businessStaffInfoDataForBusiness}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    renderItem={({ item }) => (
                        <BusinessInfoCard
                            infoTitle={item.title}
                            infoDetails={item.value}
                        />
                    )}
                /> */}
            </View>
        </>
    );
};

export default StaffInfo;
