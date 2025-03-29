import {
    ActivityIndicator,
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
    const handleEditService = async () => {
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
        <>
            <KeyboardAvoidingView behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ backgroundColor: "transparent" }}>
                        {/* service name */}
                        <View
                            style={[
                                styles.formContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderBottomColor:
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
                                Title <Text style={{ color: "red" }}>*</Text>
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
                                    placeholder={serviceName}
                                    placeholderTextColor={
                                        colorScheme === "dark"
                                            ? "white"
                                            : "rgba(189, 195, 199, 0.8)"
                                    }
                                    style={[
                                        styles.formInput,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        },
                                    ]}
                                    value={serviceName}
                                    onChangeText={(value) => {
                                        setServiceName(value);
                                    }}
                                />
                            </View>
                        </View>

                        {/* price */}
                        <View
                            style={[
                                styles.formContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderBottomColor:
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
                                Price <Text style={{ color: "red" }}>*</Text>
                            </Text>

                            <View
                                style={[
                                    styles.formContent,
                                    {
                                        borderColor:
                                            Colors[colorScheme ?? "light"]
                                                .separator,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingHorizontal: wp("5%"),
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="Enter new price"
                                    placeholderTextColor={
                                        colorScheme === "dark"
                                            ? "white"
                                            : "rgba(189, 195, 199, 0.8)"
                                    }
                                    style={[
                                        styles.formInput,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                            flex: 1,
                                        },
                                    ]}
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

                        {/* note */}
                        <View
                            style={[
                                styles.formContainer,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderBottomColor:
                                        Colors[colorScheme ?? "light"]
                                            .separator,
                                    height: hp("14%"),
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
                                Note
                            </Text>

                            <View
                                style={[
                                    styles.formContent,
                                    {
                                        borderColor:
                                            Colors[colorScheme ?? "light"]
                                                .separator,
                                        height: hp("10%"),
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="Enter note or description"
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
                                    value={note}
                                    onChangeText={(value) => {
                                        setNote(value);
                                    }}
                                    multiline={true}
                                    numberOfLines={3}
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
                                        handleEditService();
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
                        </View> */}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
};

export default EditService;

const styles = StyleSheet.create({
    formContainer: {
        justifyContent: "center",
        alignSelf: "center",
        height: hp("9%"),
        width: wp("100%"),
    },
    formTitle: {
        marginLeft: wp("10%"),
    },
    formContent: {
        borderWidth: 1,
        width: wp("84%"),
        height: hp("4.5%"),
        borderRadius: 10,
        alignSelf: "center",
        justifyContent: "center",
        marginTop: hp(".5%"),
    },
    formInput: {
        marginLeft: wp("5%"),
        height: "100%",
        width: "100%",
    },
    confirmButton: {
        alignSelf: "center",
        borderWidth: 1,
        height: hp("6%"),
        width: wp("84%"),
        borderRadius: 10,
        marginTop: hp("1.5%"),
    },
});
