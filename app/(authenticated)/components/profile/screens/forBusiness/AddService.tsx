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
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/styles/Colors";

import { useCreateServiceAPI } from "../../apis/createServiceAPI";
import { useGetAllServicesAPI } from "../../apis/getAllServicesAPI";
import { useToast } from "@/app/(authenticated)/utils/toasts/toastContext";
import { validateServiceInfo } from "@/app/validations/validations";

const AddService = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const localParams = useLocalSearchParams();
    const businessId = localParams.businessId as string;
    const { showToast } = useToast();

    const { createService, isLoading: isCreateServiceLoading } =
        useCreateServiceAPI();

    const {
        allServicesInfo,
        refetch: refetchAllServicesInfo,
        isLoading,
    } = useGetAllServicesAPI();

    const [serviceName, setServiceName] = useState("");
    const [price, setPrice] = useState(0);
    const [note, setNote] = useState("");

    // def a function to handle createBusinessStaff
    const handleAddService = async () => {
        const newServiceInfo = {
            businessId: businessId,
            serviceId: new Date().getTime().toString(),
            serviceName: serviceName,
            photoUrl: "",
            price: price,
            note: note,
        };

        const { isValid, message } = validateServiceInfo(
            newServiceInfo.serviceName,
            newServiceInfo.price.toString(),
            newServiceInfo.note
        );

        if (!isValid) {
            Alert.alert("Service Information Error", message);
            return;
        }

        try {
            const service = await createService(newServiceInfo);

            if (service) {
                showToast("Service added successfully");

                // refetch the services info before going back
                refetchAllServicesInfo();

                router.back();
            }
        } catch (error) {
            console.error("Error creating business staff:", error);
        }
    };

    // handle the header when this screen is rendered
    useEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back",
            headerTitle: "Add Service",
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
    }, [navigation, colorScheme, serviceName, price]);

    if (isCreateServiceLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="small" color="grey" />
            </View>
        );
    }

    return (
        <>
            <KeyboardAvoidingView behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ backgroundColor: "transparent" }}>
                        {/* service name */}
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
                                Title <Text style={{ color: "red" }}>*</Text>
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
                                    placeholder="Enter service title"
                                    placeholderTextColor={
                                        Colors[colorScheme ?? "light"]
                                            .placeholder
                                    }
                                    style={{
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
                                        marginLeft: wp("6%"),
                                        fontWeight: "400",
                                        height: "100%",
                                        width: "100%",
                                    }}
                                    value={serviceName}
                                    onChangeText={(value) => {
                                        setServiceName(value);
                                    }}
                                />
                            </View>
                        </View>

                        {/* price */}
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
                                Price <Text style={{ color: "red" }}>*</Text>
                            </Text>

                            <View
                                style={{
                                    width: wp("80%"),
                                    height: hp("4.5%"),
                                    alignSelf: "center",
                                    marginTop: hp("1%"),
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        borderColor:
                                            Colors[colorScheme ?? "light"]
                                                .tabIconDefault,
                                        borderWidth: 1.25,
                                        width: wp("80%"),
                                        height: hp("4.5%"),
                                        borderRadius: 10,
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingHorizontal: wp("4%"),
                                    }}
                                >
                                    <TextInput
                                        placeholder="Enter price"
                                        placeholderTextColor={
                                            Colors[colorScheme ?? "light"]
                                                .placeholder
                                        }
                                        style={{
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                            flex: 1, // Take available space
                                            fontWeight: "400",
                                            height: "100%",
                                            width: "100%",
                                        }}
                                        value={price.toString()}
                                        onChangeText={(value) => {
                                            setPrice(Number(value));
                                        }}
                                        keyboardType="numeric" // Ensure numeric keyboard for price input
                                    />
                                    <Text style={{ marginLeft: wp("2%") }}>
                                        dollars
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* note */}
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
                                height: hp("15%"),
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
                                Note
                            </Text>

                            <View
                                style={{
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .tabIconDefault,
                                    borderWidth: 1.25,
                                    width: wp("80%"),
                                    height: hp("10%"),
                                    borderRadius: 10,
                                    alignSelf: "center",
                                    // justifyContent: "center",
                                    marginTop: hp("1%"),
                                }}
                            >
                                <TextInput
                                    placeholder="Enter note or description"
                                    placeholderTextColor={
                                        Colors[colorScheme ?? "light"]
                                            .placeholder
                                    }
                                    style={{
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
                                        marginLeft: wp("6%"),
                                        fontWeight: "400",
                                        paddingVertical: hp("1.5%"),
                                        height: "100%",
                                        width: "100%",
                                    }}
                                    value={note}
                                    onChangeText={(value) => {
                                        setNote(value);
                                    }}
                                    multiline={true}
                                    numberOfLines={3}
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
                                        handleAddService();
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

export default AddService;
