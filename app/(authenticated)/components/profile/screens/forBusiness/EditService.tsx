import {
    ActivityIndicator,
    Pressable,
    Text,
    TextInput,
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

import { useUpdateServiceAPI } from "../../apis/updateServiceAPI";
import { useGetAllServicesAPI } from "../../apis/getAllServicesAPI";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";

const EditService = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const localParams = useLocalSearchParams();
    const serviceId = localParams.serviceId as string;
    const serviceNameParam = localParams.serviceName as string;
    const priceParam = localParams.price as string;
    const noteParam = localParams.note as string;

    const auth = useAuth();
    const businessId = auth?.user?.uid || "";

    const {
        allServicesInfo,
        refetch: refetchAllServicesInfo,
        isLoading,
    } = useGetAllServicesAPI();

    const { updateServiceInfo, isLoading: isUpdateServiceLoading } =
        useUpdateServiceAPI();

    const [serviceName, setServiceName] = useState(serviceNameParam);
    const [price, setPrice] = useState(priceParam ? Number(priceParam) : 0);
    const [note, setNote] = useState(noteParam);

    // def a function to handle createBusinessStaff
    const handleAddService = async () => {
        const editServiceInfo = {
            businessId: businessId,
            serviceId: serviceId,
            serviceName: serviceName,
            photoUrl: "",
            price: price,
            note: note,
        };

        try {
            const service = await updateServiceInfo(editServiceInfo);

            if (service) {
                //refetch the service info before navigating back
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
            headerTitle: "Edit Service Information",
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

    if (isUpdateServiceLoading) {
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
        <View style={{ backgroundColor: "transparent" }}>
            {/* service name */}
            <View
                style={{
                    backgroundColor: Colors[colorScheme ?? "light"].background,
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
                            Colors[colorScheme ?? "light"].tabIconDefault,
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
                        placeholder={serviceName}
                        placeholderTextColor={
                            colorScheme === "dark"
                                ? "white"
                                : "rgba(189, 195, 199, 0.8)"
                        }
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                            marginLeft: wp("6%"),
                            fontWeight: "400",
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
                    backgroundColor: Colors[colorScheme ?? "light"].background,
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
                                Colors[colorScheme ?? "light"].tabIconDefault,
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
                            placeholder="Enter new price"
                            placeholderTextColor={
                                colorScheme === "dark"
                                    ? "white"
                                    : "rgba(189, 195, 199, 0.8)"
                            }
                            style={{
                                color: Colors[colorScheme ?? "light"].text,
                                flex: 1, // Take available space
                                fontWeight: "400",
                            }}
                            value={price.toString()}
                            onChangeText={(value) => {
                                setPrice(Number(value));
                            }}
                            keyboardType="numeric" // Ensure numeric keyboard for price input
                        />
                        <Text style={{ marginLeft: wp("2%") }}>dollars</Text>
                    </View>
                </View>
            </View>

            {/* note */}
            <View
                style={{
                    backgroundColor: Colors[colorScheme ?? "light"].background,
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
                    Note <Text style={{ color: "red" }}>*</Text>
                </Text>

                <View
                    style={{
                        borderColor:
                            Colors[colorScheme ?? "light"].tabIconDefault,
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
                            colorScheme === "dark"
                                ? "white"
                                : "rgba(189, 195, 199, 0.8)"
                        }
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                            marginLeft: wp("6%"),
                            fontWeight: "400",
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
                    height: hp("100%"),
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                }}
            >
                <Pressable
                    onPress={() => {
                        handleAddService();
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: wp("50%"),
                            marginTop: hp("2.5%"),
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
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default EditService;
