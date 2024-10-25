import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/styles/Colors";

import { useCreateBusinessStaffAPI } from "@/app/(authenticated)/components/profile/apis/createBusinessStaffAPI";
import { useGetBusinessInfoAPI } from "@/app/(authenticated)/components/profile/apis/getBusinessInfoAPI";
import { useToast } from "@/app/(authenticated)/utils/toasts/toastContext";
import { validateStaffInfo } from "@/app/validations/validations";

const AddStaffInfo = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const { showToast } = useToast();

    const { createBusinessStaff, isLoading: isCreateBusinessStaffLoading } =
        useCreateBusinessStaffAPI();

    const { refetch } = useGetBusinessInfoAPI();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const defaultPassword = "123456";
    const role = "staff";

    // def a function to handle createBusinessStaff
    const handleCreateStaffInfo = async () => {
        const businessStaffInfoBrief = {
            businessStaffId: "",
            name: firstName + " " + lastName,
            phoneNumber: phoneNumber,
            email: email,
            password: defaultPassword,
            role: role,
        };

        const { isValid, message } = validateStaffInfo(
            firstName,
            phoneNumber,
            email,
            role
        );

        if (!isValid) {
            Alert.alert("Invalid Staff Information", message);
            return;
        }

        try {
            const staff = await createBusinessStaff(businessStaffInfoBrief);

            if (staff) {
                showToast("Staff registered successfully");

                refetch(); // refetch the business info

                router.back(); // go back to the previous screen
            }
        } catch (error) {
            console.error("Error creating business staff:", error);
        }
    };

    // handle the header when this screen is rendered
    useEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back",
            headerTitle: "Register Staff",
            presentation: "modal",

            headerRight: () => (
                // submit button
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
    }, [navigation, colorScheme, firstName, lastName, email]);

    if (isCreateBusinessStaffLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="small" color="grey" />
                {/* <Wander size={45} color={Colors[colorScheme ?? "light"].text} /> */}
            </View>
        );
    }

    return (
        <>
            <KeyboardAvoidingView behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            backgroundColor: "transparent",
                        }}
                    >
                        {/* first name */}
                        <View
                            style={{
                                backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                                borderBottomColor:
                                    colorScheme === "dark"
                                        ? "white"
                                        : "rgba(189, 195, 199, 0.8)",
                                // borderBottomWidth: 1,
                                justifyContent: "center",
                                alignSelf: "center",
                                height: hp("10%"),
                                width: wp("100%"),
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors[colorScheme ?? "light"].text,
                                    marginLeft: wp("12.5%"),
                                    opacity: 0.8,
                                }}
                            >
                                First Name{" "}
                                <Text style={{ color: "red" }}>*</Text>
                            </Text>

                            <View
                                style={{
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .tabIconDefault,
                                    borderWidth: 1.25,
                                    width: wp("80%"),
                                    height: hp("4.5%"),
                                    borderRadius: 10,
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    marginTop: hp("1%"),
                                }}
                            >
                                <TextInput
                                    placeholder="Enter first name"
                                    placeholderTextColor={
                                        Colors[colorScheme ?? "light"]
                                            .placeholder
                                    }
                                    style={{
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
                                        marginLeft: wp("6%"),
                                        fontWeight: "400",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    value={firstName}
                                    onChangeText={(value) => {
                                        setFirstName(value);
                                    }}
                                />
                            </View>
                        </View>

                        {/* last name */}
                        <View
                            style={{
                                backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                                borderBottomColor:
                                    colorScheme === "dark"
                                        ? "white"
                                        : "rgba(189, 195, 199, 0.8)",
                                // borderBottomWidth: 1,
                                justifyContent: "center",
                                alignSelf: "center",
                                height: hp("10%"),
                                width: wp("100%"),
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors[colorScheme ?? "light"].text,
                                    marginLeft: wp("12.5%"),
                                    opacity: 0.8,
                                }}
                            >
                                Last Name
                            </Text>

                            <View
                                style={{
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .tabIconDefault,
                                    borderWidth: 1.25,
                                    width: wp("80%"),
                                    height: hp("4.5%"),
                                    borderRadius: 10,
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    marginTop: hp("1%"),
                                }}
                            >
                                <TextInput
                                    placeholder="Enter last name"
                                    placeholderTextColor={
                                        Colors[colorScheme ?? "light"]
                                            .placeholder
                                    }
                                    style={{
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
                                        marginLeft: wp("6%"),
                                        fontWeight: "400",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    value={lastName}
                                    onChangeText={(value) => {
                                        setLastName(value);
                                    }}
                                />
                            </View>
                        </View>

                        {/* email */}
                        <View
                            style={{
                                backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                                borderBottomColor:
                                    colorScheme === "dark"
                                        ? "white"
                                        : "rgba(189, 195, 199, 0.8)",
                                // borderBottomWidth: 1,
                                justifyContent: "center",
                                alignSelf: "center",
                                height: hp("10%"),
                                width: wp("100%"),
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors[colorScheme ?? "light"].text,
                                    marginLeft: wp("12.5%"),
                                    opacity: 0.8,
                                }}
                            >
                                Email <Text style={{ color: "red" }}>*</Text>
                            </Text>

                            <View
                                style={{
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .tabIconDefault,
                                    borderWidth: 1.25,
                                    width: wp("80%"),
                                    height: hp("4.5%"),
                                    borderRadius: 10,
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    marginTop: hp("1%"),
                                }}
                            >
                                <TextInput
                                    placeholder="Enter last name"
                                    placeholderTextColor={
                                        Colors[colorScheme ?? "light"]
                                            .placeholder
                                    }
                                    style={{
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
                                        marginLeft: wp("6%"),
                                        fontWeight: "400",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    value={email}
                                    onChangeText={(value) => {
                                        setEmail(value);
                                    }}
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        {/* phone number */}
                        <View
                            style={{
                                backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                                borderBottomColor:
                                    colorScheme === "dark"
                                        ? "white"
                                        : "rgba(189, 195, 199, 0.8)",
                                // borderBottomWidth: 1,
                                justifyContent: "center",
                                alignSelf: "center",
                                height: hp("10%"),
                                width: wp("100%"),
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors[colorScheme ?? "light"].text,
                                    marginLeft: wp("12.5%"),
                                    opacity: 0.8,
                                }}
                            >
                                Phone Number{" "}
                                <Text style={{ color: "red" }}>*</Text>
                            </Text>

                            <View
                                style={{
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .tabIconDefault,
                                    borderWidth: 1.25,
                                    width: wp("80%"),
                                    height: hp("4.5%"),
                                    borderRadius: 10,
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    marginTop: hp("1%"),
                                }}
                            >
                                <TextInput
                                    placeholder="Enter last name"
                                    placeholderTextColor={
                                        Colors[colorScheme ?? "light"]
                                            .placeholder
                                    }
                                    style={{
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
                                        marginLeft: wp("6%"),
                                        fontWeight: "400",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    value={phoneNumber}
                                    onChangeText={(value) => {
                                        setPhoneNumber(value);
                                    }}
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                        {/* confirm button */}
                        <View
                            style={{
                                backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                                paddingBottom: hp("4%"),
                                borderBottomEndRadius: 35,
                                borderBottomStartRadius: 35,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignSelf: "flex-end",
                                    alignItems: "center",
                                    marginTop: hp("2.5%"),
                                    right: wp("10%"),
                                    // borderColor: "red",
                                    // borderWidth: 1,
                                }}
                            >
                                <Pressable
                                    onPress={() => {
                                        handleCreateStaffInfo();
                                    }}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text>Confirm</Text>
                                    <View
                                        style={{
                                            alignSelf: "flex-end",
                                            paddingHorizontal: 15,
                                        }}
                                    >
                                        <AntDesign
                                            name={"check"}
                                            size={24}
                                            color={
                                                Colors[colorScheme ?? "light"]
                                                    .tabIconSelected
                                            }
                                        />
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
};

export default AddStaffInfo;
