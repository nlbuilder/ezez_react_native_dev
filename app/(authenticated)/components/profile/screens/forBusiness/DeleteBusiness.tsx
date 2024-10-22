import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/styles/Colors";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";

import { useDeleteBusinessInfoAPI } from "../../apis/deleteBusinessInfoAPI";
import dummyTermsAndCondition from "@/dummy/dummyTermsAndConditions.json";
import { signOut } from "@/app/(auth)/utils/utils";
import { useGetBusinessStaffInfoForBusinessAPI } from "../../apis/getBusinessStaffInfoForBusinessAPI";

const DeleteBusiness = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const termsAndConditions = dummyTermsAndCondition;

    const [isDeleteStaffBoxChecked, setIsDeleteStaffBoxChecked] =
        useState(false);
    const [isFinalBoxChecked, setIsFinalBoxChecked] = useState(false);

    const handleCheckBox = () => {
        // setIsDeleteStaffBoxChecked(!isDeleteStaffBoxChecked);
        // setIsFinalBoxChecked(false);
        setIsFinalBoxChecked(!isFinalBoxChecked);
    };

    const { deleteBusiness, isLoading: isDeleteBusinessLoading } =
        useDeleteBusinessInfoAPI();

    const {
        currentBusinessStaffInfoForBusiness,
        refetch: refetchBusinessStaffInfo,
        isLoading: isGetBusinessStaffInfoLoading,
    } = useGetBusinessStaffInfoForBusinessAPI();

    const showToast = () => {
        Toast.show({
            type: "error",
            text1: "Error",
            text2: "Please check and delete all staff accounts first",
            position: "bottom",
        });
    };

    // def a func to handle delete business
    const handleDeleteBusiness = async () => {
        try {
            if (currentBusinessStaffInfoForBusiness === null) {
                await deleteBusiness();

                signOut();
            } else {
                showToast();
            }
        } catch (error) {
            console.log("Failed to delete business", error);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Delete Business",
            headerBackTitle: "Back",
            presentation: "modal",

            headerRight: () => (
                // go back button
                <Pressable
                    onPress={() => {
                        router.back();
                    }}
                >
                    <View
                        style={{
                            alignSelf: "flex-end",
                            paddingHorizontal: 15,
                        }}
                    >
                        <AntDesign
                            name={"close"}
                            size={24}
                            color={Colors[colorScheme ?? "light"].text}
                        />
                    </View>
                </Pressable>
            ),
        });
    }, [navigation, colorScheme, currentBusinessStaffInfoForBusiness]);

    if (isDeleteBusinessLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                }}
            >
                <ActivityIndicator
                    size="small"
                    color={colorScheme === "dark" ? "white" : "grey"}
                    style={{
                        marginBottom: hp("10%"),
                    }}
                />
            </View>
        );
    }

    return (
        <>
            <View
                style={{
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                    alignItems: "center",
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                }}
            >
                <Text
                    style={{
                        padding: 10,
                        left: wp("10%"),
                        top: 5,
                        alignSelf: "flex-start",
                    }}
                >
                    Term and conditions
                </Text>
                <ScrollView
                    style={{
                        height: hp("40%"),
                        width: wp("80%"),
                        borderColor:
                            Colors[colorScheme ?? "light"].tabIconDefault,
                        borderWidth: 1,
                        borderRadius: 15,
                    }}
                >
                    <Text style={{ padding: 10, textAlign: "auto" }}>
                        {termsAndConditions.content}
                    </Text>
                </ScrollView>

                {/* check delete staff */}
                {/* <View
                    style={{
                        margin: 10,
                        width: wp("80%"),
                        left: wp("5%"),
                        marginBottom: hp("2%"),
                        flexDirection: "row",
                        alignContent: "center",
                    }}
                >
                    <Checkbox
                        style={{ borderColor: "grey", marginBottom: 10 }}
                        value={isDeleteStaffBoxChecked}
                        onValueChange={handleCheckBox}
                    />
                    <Text style={{ marginLeft: 20 }}>
                        I have deleted all staff accounts
                    </Text>
                </View> */}

                {/* final check before delete */}
                <View style={{ height: hp("60%") }}>
                    <View
                        style={{
                            // margin: 10,
                            width: wp("80%"),
                            left: wp("2.5%"),
                            paddingVertical: hp("2.5%"),
                            // paddingVertical: !isFinalBoxChecked
                            //     ? hp("2.5%")
                            //     : hp("2.5%"),
                            flexDirection: "row",
                            alignContent: "center",
                        }}
                    >
                        <Checkbox
                            style={{ borderColor: "grey", marginBottom: 10 }}
                            value={isFinalBoxChecked}
                            onValueChange={setIsFinalBoxChecked}
                        />
                        <Text style={{ marginHorizontal: 20 }}>
                            I have read and agree to the terms and conditions
                        </Text>
                    </View>

                    {/* DELETE BUTTON */}
                    {isFinalBoxChecked ? (
                        <View
                            style={{
                                width: wp("20%"),
                                height: hp("3.5%"),
                                backgroundColor: "red",
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "flex-start",
                                left: wp("2.5%"),
                                borderRadius: 8,
                                // marginBottom: hp("2.5%"),
                            }}
                        >
                            <Pressable
                                onPress={() => {
                                    handleDeleteBusiness();
                                }}
                            >
                                <Text style={{ color: "white" }}>DELETE</Text>
                            </Pressable>
                        </View>
                    ) : null}

                    <Toast />
                </View>
            </View>
        </>
    );
};

export default DeleteBusiness;

const styles = StyleSheet.create({});
