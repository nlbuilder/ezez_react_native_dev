import {
    Pressable,
    StyleSheet,
    TextInput,
    useColorScheme,
    View,
    Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useGetBusinessInfoAPI } from "@/app/(auth)/apis/getBusinessInfoAPI";
import Colors from "@/constants/styles/Colors";

const BusinessInfo = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const { currentBusinessInfo, isLoading: isGetBusinessInfoLoading } =
        useGetBusinessInfoAPI();

    const [businessName, setBusinessName] = useState("");
    const businessEmail = currentBusinessInfo?.email;

    // handle the header when this screen is rendered
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Business Information",
            headerLeft: () => (
                <Pressable
                    onPress={() =>
                        router.replace("/(authenticated)/(tabs)/profile")
                    }
                >
                    <AntDesign
                        name="leftcircleo"
                        size={24}
                        color={colorScheme === "dark" ? "white" : "black"}
                    />
                </Pressable>
            ),
        });
    }, [navigation]);

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
                            colorScheme === "dark" ? "white" : "white",
                        height: hp("10%"),
                        borderBottomColor:
                            colorScheme === "dark"
                                ? "white"
                                : "rgba(189, 195, 199, 0.8)",
                        borderBottomWidth: 1,
                        alignSelf: "center",
                        width: wp("90%"),
                    }}
                >
                    <TextInput
                        placeholder="Enter business name"
                        placeholderTextColor={"grey"}
                        style={{
                            height: "100%",
                            color: Colors[colorScheme ?? "light"].text,
                            marginLeft: wp("10%"),
                        }}
                        value={businessName}
                        onChangeText={(value) => setBusinessName(value)}
                    />
                </View>

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
                        justifyContent: "center",
                        alignSelf: "center",
                        width: wp("90%"),
                    }}
                >
                    <Text
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                            marginLeft: wp("10%"),
                        }}
                    >
                        Email
                    </Text>

                    {/* separator between Email title and email address */}
                    <View
                        style={{
                            borderBottomColor:
                                colorScheme === "dark"
                                    ? "white"
                                    : "rgba(189, 195, 199, 0.5)",
                            borderBottomWidth: 1,
                            width: wp("50%"),
                            marginLeft: wp("10%"),
                            marginTop: hp("1%"),
                        }}
                    ></View>

                    <TextInput
                        placeholderTextColor={"grey"}
                        style={{
                            // height: "100%",
                            color: Colors[colorScheme ?? "light"].text,
                            marginLeft: wp("10%"),
                            marginTop: hp("1%"),
                        }}
                        value={businessEmail}
                        onChangeText={(value) => setBusinessName(value)}
                    />
                </View>
            </View>
        </>
    );
};

export default BusinessInfo;

const styles = StyleSheet.create({});
