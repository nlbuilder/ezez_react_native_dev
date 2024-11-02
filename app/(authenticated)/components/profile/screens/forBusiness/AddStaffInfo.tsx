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
    StyleSheet,
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
    const defaultPassword = "123455";
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
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            backgroundColor: "transparent",
                            flex: 1,
                        }}
                    >
                        {/* first name */}
                        <View
                            style={[
                                styles.formContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .separator,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.formTitle,
                                    {
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
                                    },
                                ]}
                            >
                                First Name{" "}
                                <Text style={{ color: "red" }}>*</Text>
                            </Text>

                            <View
                                style={[
                                    styles.formContent,
                                    {
                                        borderColor:
                                            Colors[colorScheme ?? "light"]
                                                .separator,
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="Enter first name"
                                    placeholderTextColor={
                                        Colors[colorScheme ?? "light"]
                                            .placeholder
                                    }
                                    style={[
                                        styles.formInput,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        },
                                    ]}
                                    value={firstName}
                                    onChangeText={(value) => {
                                        setFirstName(value);
                                    }}
                                />
                            </View>
                        </View>

                        {/* last name */}
                        <View
                            style={[
                                styles.formContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .separator,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.formTitle,
                                    {
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
                                    },
                                ]}
                            >
                                Last Name
                            </Text>

                            <View
                                style={[
                                    styles.formContent,
                                    {
                                        borderColor:
                                            Colors[colorScheme ?? "light"]
                                                .separator,
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="Enter last name"
                                    placeholderTextColor={
                                        Colors[colorScheme ?? "light"]
                                            .placeholder
                                    }
                                    style={[
                                        styles.formInput,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        },
                                    ]}
                                    value={lastName}
                                    onChangeText={(value) => {
                                        setLastName(value);
                                    }}
                                />
                            </View>
                        </View>

                        {/* email */}
                        <View
                            style={[
                                styles.formContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .separator,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.formTitle,
                                    {
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
                                    },
                                ]}
                            >
                                Email <Text style={{ color: "red" }}>*</Text>
                            </Text>

                            <View
                                style={[
                                    styles.formContent,
                                    {
                                        borderColor:
                                            Colors[colorScheme ?? "light"]
                                                .separator,
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="Enter last name"
                                    placeholderTextColor={
                                        Colors[colorScheme ?? "light"]
                                            .placeholder
                                    }
                                    style={[
                                        styles.formInput,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        },
                                    ]}
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
                            style={[
                                styles.formContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .separator,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.formTitle,
                                    {
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
                                    },
                                ]}
                            >
                                Phone Number{" "}
                                <Text style={{ color: "red" }}>*</Text>
                            </Text>

                            <View
                                style={[
                                    styles.formContent,
                                    {
                                        borderColor:
                                            Colors[colorScheme ?? "light"]
                                                .separator,
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="Enter last name"
                                    placeholderTextColor={
                                        Colors[colorScheme ?? "light"]
                                            .placeholder
                                    }
                                    style={[
                                        styles.formInput,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        },
                                    ]}
                                    value={phoneNumber}
                                    onChangeText={(value) => {
                                        setPhoneNumber(value);
                                    }}
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                        {/* Confirm button */}
                        <View
                            style={{
                                height: hp("10%"),
                                backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                                borderBottomEndRadius: 35,
                                borderBottomStartRadius: 35,
                            }}
                        >
                            <View
                                style={[
                                    styles.confirmButton,
                                    {
                                        backgroundColor:
                                            Colors[colorScheme ?? "light"]
                                                .mainButtonBackgroundColor,
                                        borderColor:
                                            Colors[colorScheme ?? "light"]
                                                .mainButtonBorderColor,
                                    },
                                ]}
                            >
                                <Pressable
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        justifyContent: "center",
                                    }}
                                    onPress={() => {
                                        handleCreateStaffInfo();
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].textButtonColor,
                                        }}
                                    >
                                        Confirm and Continue
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        {/* confirm button */}
                        {/* <View
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
                        </View> */}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
};

export default AddStaffInfo;

const styles = StyleSheet.create({
    formContainer: {
        // borderBottomWidth: 1,
        justifyContent: "center",
        alignSelf: "center",
        height: hp("9%"),
        width: wp("100%"),
    },
    formTitle: {
        marginLeft: wp("10%"),
    },
    formContent: {
        borderWidth: 1.25,
        width: wp("84%"),
        height: hp("4.5%"),
        borderRadius: 10,
        alignSelf: "center",
        justifyContent: "center",
        marginTop: hp(".5%"),
    },
    formInput: {
        marginLeft: wp("5%"),
        width: "100%",
        height: "100%",
    },
    confirmButton: {
        alignSelf: "center",
        borderWidth: 1,
        height: hp("5%"),
        width: wp("84%"),
        borderRadius: 10,
        marginTop: hp("2%"),
    },
});
