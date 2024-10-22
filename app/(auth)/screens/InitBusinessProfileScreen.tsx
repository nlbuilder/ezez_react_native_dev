import React, { useEffect, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Alert,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Checkbox from "expo-checkbox";

import { useCreateBusinessHourAPI } from "@/app/(authenticated)/components/profile/apis/createBusinessHourAPI";
import { useGetBusinessInfoAPI } from "@/app/(authenticated)/components/profile/apis/getBusinessInfoAPI";
import { useCreateInitServicesAPI } from "@/app/(authenticated)/components/profile/apis/createInitServicesAPI";
import {
    BusinessHourInfo,
    initServiceInfo,
} from "@/app/(authenticated)/components/profile/types/types";

import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/styles/Colors";
import NotificationModal from "@/app/(authenticated)/utils/modals/NotificationModal";

import { useUpdateBusinessInfoAPI } from "@/app/(authenticated)/components/profile/apis/updateBusinessInfoAPI";
import { useGetBusinessHourAPI } from "@/app/(authenticated)/components/profile/apis/getBusinessHourAPI";
import { CalibriText } from "@/constants/styles/StyledText";
import initBusinessHour from "@/init/initBusinessHours.json";
import initServiceOptions from "@/init/initServiceOptions.json";

const InitBusinessProfileScreen = () => {
    const {
        businessHourInfo,
        refetch: refetchBusinessHourInfo,
        isLoading: isBusinessHourInfoLoading,
    } = useGetBusinessHourAPI();

    useEffect(() => {
        refetchBusinessHourInfo();

        if (businessHourInfo) {
            router.replace("/(authenticated)/(tabs)");
        }
    }, [businessHourInfo]);

    if (isBusinessHourInfoLoading) {
        return (
            <SafeAreaView>
                <View style={{ alignSelf: "center", justifyContent: "center" }}>
                    <ActivityIndicator size="small" color="grey" />
                </View>
            </SafeAreaView>
        );
    }

    const { currentBusinessInfo } = useGetBusinessInfoAPI();
    const { createBusinessHour } = useCreateBusinessHourAPI();
    const { createInitServices } = useCreateInitServicesAPI();

    const businessId = currentBusinessInfo?.businessId as string;
    const email = currentBusinessInfo?.email as string;

    const { updateBusinessInfo } = useUpdateBusinessInfoAPI();

    const [businessName, setBusinessName] = useState("");

    const handleUpdateBusinessInfo = async () => {
        try {
            if (businessId) {
                const businessInfo = {
                    businessId: Array.isArray(businessId)
                        ? businessId[0]
                        : businessId,
                    name: businessName,
                    email: email,
                };

                await updateBusinessInfo(businessInfo);
            }
        } catch (error) {
            console.error("Error updating business info: ", error);
        }
    };

    // State for managing the selected business hour (only one allowed)
    const [selectedBusinessHourIndex, setSelectedBusinessHourIndex] = useState<
        number | null
    >(null);

    // State for managing the selected service option (only one allowed)
    const [selectedServiceIndex, setSelectedServiceIndex] = useState<
        number | null
    >(null);

    const handleBusinessHourChange = (index: number) => {
        setSelectedBusinessHourIndex(
            selectedBusinessHourIndex === index ? null : index
        );
    };

    const handleServiceChange = (index: number) => {
        setSelectedServiceIndex(selectedServiceIndex === index ? null : index);
    };

    const handleCreateBusinessHour = async () => {
        const selectedHours = initBusinessHour.filter(
            (_, index) => selectedBusinessHourIndex === index
        );

        if (selectedHours.length === 0) {
            Alert.alert("Error", "Please select at least one time slot.");
            return;
        }

        for (const { openingHour, closingHour } of selectedHours) {
            const businessHourInfo: BusinessHourInfo = {
                businessId: Array.isArray(businessId)
                    ? businessId[0]
                    : businessId,
                startTime: openingHour,
                finishTime: closingHour,
            };

            const businessHour = await createBusinessHour(businessHourInfo);

            if (!businessHour) {
                console.error(
                    "Error creating business hour [initBusinessProfile error message]: ",
                    businessHour
                );
            }
        }
    };

    const handleCreateInitServices = async () => {
        if (businessId) {
            try {
                // filter the matching option from initServiceInfo
                const chosenOption = initServiceOptions.find(
                    (_, index) => index === selectedServiceIndex
                );

                const initServiceInfo: initServiceInfo = {
                    businessId: Array.isArray(businessId)
                        ? businessId[0]
                        : businessId,
                    chosenOption: chosenOption?.option || "default",
                };

                const service = await createInitServices(initServiceInfo);

                if (!service) {
                    console.error(
                        "Error creating service [initBusinessProfile error message]: ",
                        service
                    );
                }
            } catch (error) {
                console.error("Error creating service:", error);
            }
        }
    };

    // def a function to create a business profile
    const handleCreateBusinessProfile = async () => {
        try {
            if (
                businessName === "" ||
                selectedBusinessHourIndex === null ||
                selectedServiceIndex === null
            ) {
                Alert.alert(
                    "",
                    "Please enter your business name, select an option for business hours and service option. Otherwise, skip to create a default business profile."
                );
                return;
            } else {
                await handleUpdateBusinessInfo();
                await handleCreateBusinessHour();
                await handleCreateInitServices();

                setShowModal(true);
            }
        } catch (error) {
            console.error("Error creating business profile: ", error);
        }
    };

    // def a function to skip the business profile creation
    // this will create a default business profile
    const handleSkip = async () => {
        try {
            const selectedHours = initBusinessHour.filter(
                (_, index) => index === 0
            );

            for (const { openingHour, closingHour } of selectedHours) {
                const businessHourInfo: BusinessHourInfo = {
                    businessId: Array.isArray(businessId)
                        ? businessId[0]
                        : businessId,
                    startTime: openingHour,
                    finishTime: closingHour,
                };

                await createBusinessHour(businessHourInfo);

                const initServiceInfo: initServiceInfo = {
                    businessId: Array.isArray(businessId)
                        ? businessId[0]
                        : businessId,
                    chosenOption: "option0",
                };
                await createInitServices(initServiceInfo);

                router.replace("/(authenticated)/(tabs)");
            }
        } catch (error) {
            console.error("Error skipping business profile creation: ", error);
        }
    };

    // const handlePushToNextScreen = () => {
    //     if (businessName === "" || selectedBusinessHourIndex === null) {
    //         Alert.alert(
    //             "",
    //             "Please enter the business name and select an option for the business hour. Otherwise, skip to create a default business profile."
    //         );
    //         return;
    //     } else {
    //         router.push({
    //             pathname: "/(auth)/screens/InitBusinessProfileScreen1",
    //             params: {
    //                 businessName: businessName,
    //                 selectedBusinessHourIndex: selectedBusinessHourIndex,
    //             },
    //         });
    //     }
    // };

    const [showModal, setShowModal] = useState<boolean>(false);
    const handleOnOK = () => {
        setShowModal(false);

        router.replace("/(authenticated)/(tabs)");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Title */}
                <View style={styles.titleContainer}>
                    <CalibriText style={styles.title}>
                        Let's create your business profile
                    </CalibriText>
                </View>

                {/* Business Name */}
                <View style={styles.optionContainer}>
                    <Text style={styles.subTitle}>
                        What is the name of your business?
                        <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <View style={styles.openningHourRow}>
                        <TextInput
                            placeholder="Enter business name"
                            placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
                            style={{ color: "black", left: wp("5%") }}
                            value={businessName}
                            onChangeText={(value) => {
                                setBusinessName(value);
                            }}
                        />
                    </View>
                </View>

                {/* Business Hour Options */}
                <View style={styles.optionContainer}>
                    <Text style={styles.subTitle}>
                        What are your business's opening and closing hours?
                        <Text style={{ color: "red" }}> *</Text>
                    </Text>

                    {initBusinessHour.map((item, index) => (
                        <View key={index} style={styles.openningHourRow}>
                            <Text style={styles.text}>
                                {item.openingHour} - {item.closingHour}
                            </Text>
                            <Checkbox
                                style={styles.checkboxBusinessHour}
                                value={selectedBusinessHourIndex === index}
                                onValueChange={() =>
                                    handleBusinessHourChange(index)
                                }
                            />
                        </View>
                    ))}
                </View>

                {/* Service Options */}
                <View style={[styles.optionContainer]}>
                    <Text style={styles.subTitle}>
                        What services does your business offer?
                        <Text style={{ color: "red" }}> *</Text>
                    </Text>

                    {initServiceOptions.map((item, index) => (
                        <View key={index} style={styles.serviceRow}>
                            <Text style={styles.text}>{item.option}</Text>
                            <Checkbox
                                style={styles.checkboxService}
                                value={selectedServiceIndex === index}
                                onValueChange={() => handleServiceChange(index)}
                            />
                        </View>
                    ))}
                </View>
            </View>

            {/* 
            <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>
                    How many customers can your business serve at once?
                    <Text style={{ color: "red" }}> *</Text>
                </Text>
                <View style={styles.serviceRow}>
                    <TextInput
                        placeholder="0"
                        placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
                        style={{ color: "black", left: wp("5%") }}
                        value={numberOfPeople.toString()}
                        onChangeText={(value) => {
                            setNumberOfPeople(value);
                        }}
                    />
                </View>
            </View> */}

            {/* create profile button */}
            <View>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        handleCreateBusinessProfile();
                    }}
                >
                    <Text style={styles.buttonText}>Create profile</Text>
                </Pressable>
            </View>

            {/* <View>
                <Pressable
                    onPress={() => {
                        // handleCreateBusinessProfile();
                        handlePushToNextScreen();
                    }}
                >
                    <View style={styles.button}>
                        <AntDesign
                            name="arrowright"
                            size={24}
                            color="transparent"
                        />
                        <Text>Continue</Text>
                        <AntDesign
                            name="arrowright"
                            size={24}
                            color={Colors.light.text}
                            style={{ right: wp("1.5%") }}
                        />
                    </View>
                </Pressable>
            </View> */}

            <View style={styles.skipButton}>
                <Pressable
                    onPress={() => {
                        handleSkip();
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text>Skip</Text>
                        <Ionicons
                            name="play-skip-forward-outline"
                            size={24}
                            color={Colors.light.text}
                        />
                    </View>
                </Pressable>
            </View>

            <NotificationModal
                title={
                    "We initialized business hours and services based on your selection. You can always change them later in the settings."
                }
                visible={showModal}
                onOK={handleOnOK}
            />
        </SafeAreaView>
    );
};

export default InitBusinessProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        marginTop: hp("2.5%"),
        // marginBottom: hp("2.5%"),
    },
    title: {
        fontSize: 22,
        fontWeight: "500",
    },
    optionContainer: {
        alignSelf: "center",
        width: wp("80%"),
        // paddingLeft: wp("10%"),
    },
    subTitle: {
        marginBottom: hp("1.5%"),
        marginTop: hp("4.5%"),
        fontSize: 16,
    },
    openningHourRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        borderColor: "rgba(189, 195, 199, 0.8)",
        borderWidth: 1,
        borderRadius: 25,
        paddingVertical: 10,
    },
    checkboxBusinessHour: {
        borderColor: "grey",
        right: wp("5%"),
        borderWidth: 1,
        width: 18,
        height: 18,
        borderRadius: 15,
    },
    serviceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        borderColor: "rgba(189, 195, 199, 0.8)",
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
    },
    text: {
        flex: 1,
        left: wp("5%"),
    },
    checkboxService: {
        borderColor: "grey",
        right: wp("5%"),
        borderWidth: 1,
        width: 15,
        height: 15,
        // borderRadius: 15,
    },
    button: {
        // backgroundColor: "blue",
        borderColor: "rgba(189, 195, 199, 0.8)",
        borderWidth: 1,
        // paddingHorizontal: wp("10%"),
        width: wp("45%"),
        height: hp("4.5%"),
        borderRadius: 25,
        marginVertical: hp("8%"),
        // marginBottom: hp("10%"),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: Colors.light.text,
        textAlign: "center",
    },
    skipButton: {
        alignSelf: "flex-end",
        right: wp("10%"),
        // marginTop: hp("2.5%"),
    },
});

// const handleCreateBusinessHour = async () => {
//     if (businessId) {
//         try {
//             const selectedHours = dummyBusinessHour.filter(
//                 (_, index) => checkboxStates[index]
//             );

//             if (selectedHours.length === 0) {
//                 Alert.alert(
//                     "Error",
//                     "Please select at least one time slot."
//                 );
//                 return;
//             }

//             for (const { openingHour, closingHour } of selectedHours) {
//                 const businessHourInfo: BusinessHourInfo = {
//                     businessId: Array.isArray(businessId)
//                         ? businessId[0]
//                         : businessId,
//                     startTime: openingHour,
//                     finishTime: closingHour,
//                 };

//                 const businessHour = await createBusinessHour(
//                     businessHourInfo
//                 );

//                 console.log("businessHour: ", businessHour);
//                 if (!businessHour) {
//                     console.error(
//                         "Error creating business hour:",
//                         businessHour
//                     );
//                 }
//             }

//             router.replace("/(authenticated)/(tabs)");
//         } catch (error) {
//             console.error("Error creating business hour:", error);
//             setError("Failed to create business hour.");
//         }
//     }
// };
