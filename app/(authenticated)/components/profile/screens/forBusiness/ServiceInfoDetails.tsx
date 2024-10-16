import {
    Pressable,
    useColorScheme,
    View,
    FlatList,
    Image,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "@/constants/styles/Colors";
import { useGetAllServicesAPI } from "../../apis/getAllServicesAPI";
import { useDeleteServiceAPI } from "../../apis/deleteServiceAPI";
import WarningModal from "@/app/(authenticated)/utils/modals/WarningModal";
import ServiceInfoDetailsCard from "../../components/services/forBusiness/ServiceInfoDetailsCard";

const ServiceInfoDetails = () => {
    const localParams = useLocalSearchParams();
    const serviceId = localParams.serviceId as string;

    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const { deleteService, isLoading: isDeleteServiceLoading } =
        useDeleteServiceAPI();

    const {
        allServicesInfo,
        refetch: refetchGetAllServicesInfo,
        isLoading: isGetAllServicesInfoLoading,
    } = useGetAllServicesAPI();

    // this line is to make sure that the data going into the filter is an array
    // the purpose is to prepare the data for the FlatList
    const serviceArray = Array.isArray(allServicesInfo) ? allServicesInfo : [];

    // filter the staff info based on the serviceId
    const filteredServiceInfo = serviceArray.find(
        (service) => service.serviceId === serviceId
    );

    // prepare the staffInfoDetails for using in the FlatList
    const ServiceInfoDetails = [
        {
            title: "Service",
            value: filteredServiceInfo?.serviceName || "",
        },
        {
            title: "Price",
            value: filteredServiceInfo?.price || "",
        },
        {
            title: "Note",
            value: filteredServiceInfo?.note || "",
        },
    ];

    const photoUrl = filteredServiceInfo?.photoUrl || "";
    const tempServicePhoto = require("@/assets/images/icon.png");

    // handle the delete staff process
    // warning modal for delete confirmation or cancelation
    const [modalVisible, setModalVisible] = useState(false);

    // def a func to handle the press of the delete staff button
    const handleDeleteStaffPress = () => {
        setModalVisible(true);
    };

    // def a func to handle the confirmation of the delete staff
    const confirmDelete = async () => {
        try {
            // call the delete staff API
            await deleteService(serviceId);

            // close the modal if the delete is successful
            setModalVisible(false);

            // refetch all services info before navigating back
            refetchGetAllServicesInfo();

            // navigate back to the previous screen
            router.back();
        } catch (error) {
            // Log the error and prevent unhandled promise rejection
            console.error("Failed to delete service:", error);
        }
    };

    const cancelDelete = () => {
        setModalVisible(false);
    };

    // handle the header when this screen is rendered
    useEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back",
            headerTitle: "Service Information",
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
    }, [navigation, colorScheme, allServicesInfo]);

    if (isGetAllServicesInfoLoading) {
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
                    flex: 1,
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                }}
            >
                <View
                    style={{
                        backgroundColor:
                            Colors[colorScheme ?? "light"].background,
                        height: hp("25%"),
                        alignSelf: "center",
                        justifyContent: "center",
                        // width: wp("90%"),
                    }}
                >
                    <Image
                        source={
                            photoUrl === ""
                                ? tempServicePhoto // use the local image when photoUrl is empty
                                : { uri: photoUrl } // use the remote URL if it's provided
                        }
                        style={{
                            width: wp("30%"),
                            height: wp("30%"),
                            borderColor:
                                Colors[colorScheme ?? "light"].tabIconDefault,
                            borderWidth: 1,
                            borderRadius: 25,
                        }}
                    />
                </View>

                {/* Warning Modal Show */}
                <WarningModal
                    title={
                        "The selected service will be deleted. Are you sure?"
                    }
                    visible={modalVisible}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />

                {/* edit button */}
                <View
                    style={{
                        position: "absolute",
                        top: hp("20.5%"),
                        // alignSelf: "flex-end",
                        right: wp("10%"),
                    }}
                >
                    <Pressable
                        onPress={() => {
                            router.push({
                                pathname:
                                    "/(authenticated)/components/profile/screens/forBusiness/EditService",
                                params: {
                                    serviceId: serviceId,
                                    serviceName:
                                        filteredServiceInfo?.serviceName,
                                    price: filteredServiceInfo?.price,
                                    note: filteredServiceInfo?.note,
                                },
                            });
                        }}
                    >
                        <AntDesign name="edit" size={24} color="black" />
                    </Pressable>
                </View>

                {/* handle the Flastlist */}
                <FlatList
                    data={ServiceInfoDetails}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    renderItem={({ item }) => (
                        <ServiceInfoDetailsCard
                            infoTitle={item.title}
                            infoDetails={item.value}
                        />
                    )}
                    style={{ marginBottom: hp("10%") }}
                />

                {/* delete service button */}
                <View
                    style={{
                        bottom: hp("2.5%"),
                        alignSelf: "flex-end",
                        right: wp("5%"),
                    }}
                >
                    <Pressable
                        onPress={() => {
                            handleDeleteStaffPress();
                        }}
                    >
                        <MaterialCommunityIcons
                            name="delete-forever"
                            size={26}
                            color="red"
                            style={{ padding: wp("5%") }}
                        />
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default ServiceInfoDetails;
