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
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "@/constants/styles/Colors";
import { useGetBusinessStaffInfoForBusinessAPI } from "@/app/(authenticated)/components/profile/apis/getBusinessStaffInfoForBusinessAPI";
import { useDeleteBusinessStaffInfoAPI } from "../../apis/deleteBusinessStaffInfoAPI";
import StaffInfoDetailsCard from "@/app/(authenticated)/components/profile/components/auth/forBusiness/StaffInfoDetailsCard";
import WarningModal from "@/app/(authenticated)/utils/modals/WarningModal";
import { useGetBusinessInfoAPI } from "../../apis/getBusinessInfoAPI";

const StaffInfoDetails = () => {
    const localParams = useLocalSearchParams();
    const businessStaffId = Array.isArray(localParams.staffId)
        ? localParams.staffId[0]
        : localParams.staffId;

    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const {
        currentBusinessInfo,
        refetch: refetchBusinessInfo,
        isLoading: isGetBusinessInfoLoading,
    } = useGetBusinessInfoAPI();

    const {
        currentBusinessStaffInfoForBusiness,
        refetch: refetchBusinessStaffInfo,
        isLoading: isGetBusinessStaffInfoLoading,
    } = useGetBusinessStaffInfoForBusinessAPI();

    const { deleteBusinessStaff, isLoading: isDeleteBusinessStaffLoading } =
        useDeleteBusinessStaffInfoAPI();

    // this line is to make sure that the data going into the filter is an array
    // the purpose is to prepare the data for the FlatList
    const staffArray = Array.isArray(currentBusinessStaffInfoForBusiness)
        ? currentBusinessStaffInfoForBusiness
        : [];

    // filter the staff info based on the businessStaffId
    const filteredStaffInfo = staffArray.find(
        (staff) => staff.businessStaffId === businessStaffId
    );

    // prepare the staffInfoDetails for using in the FlatList
    const StaffInfoDetails = [
        {
            title: "First Name",
            value: filteredStaffInfo?.firstName || "",
        },
        {
            title: "Last Name",
            value: filteredStaffInfo?.lastName || "",
        },
        {
            title: "Date of Birth",
            value: filteredStaffInfo?.DOB || "",
        },
        { title: "Sex", value: filteredStaffInfo?.Sex || "" },
        {
            title: "Email",
            value: filteredStaffInfo?.email || "",
        },
        {
            title: "Phone Number",
            value: filteredStaffInfo?.phoneNumber || "",
        },
        {
            title: "Address Line 1",
            value: filteredStaffInfo?.addressLine1 || "",
        },
        {
            title: "Address Line 2",
            value: filteredStaffInfo?.addressLine2 || "",
        },
        {
            title: "City",
            value: filteredStaffInfo?.city || "",
        },
        {
            title: "State",
            value: filteredStaffInfo?.state || "",
        },
        {
            title: "Zip Code",
            value: filteredStaffInfo?.zip || "",
        },
        {
            title: "Country",
            value: filteredStaffInfo?.country || "",
        },
    ];

    const photoUrl = filteredStaffInfo?.photoUrl || "";
    const tempStaffPhoto = require("@/assets/images/staffImage.png");

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
            await deleteBusinessStaff(businessStaffId);

            // close the modal if the delete is successful
            setModalVisible(false);

            // refetch the listOfStaff
            refetchBusinessInfo();

            // navigate back to the previous screen
            router.back();
        } catch (error) {
            // Log the error and prevent unhandled promise rejection
            console.error("Failed to delete staff:", error);
        }
    };

    const cancelDelete = () => {
        setModalVisible(false);
    };

    // handle the header when this screen is rendered
    useEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back",
            headerTitle: "Staff Information",
            presentation: "modal",

            headerRight: () => (
                // edit button
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

    if (isGetBusinessInfoLoading) {
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
                                ? tempStaffPhoto // use the local image when photoUrl is empty
                                : { uri: photoUrl } // use the remote URL if it's provided
                        }
                        style={{
                            width: wp("30%"),
                            height: wp("30%"),
                            borderColor:
                                Colors[colorScheme ?? "light"].tabIconDefault,
                            borderWidth: 1,
                            borderRadius: 100,
                        }}
                    />
                </View>

                {/* Warning Modal Show */}
                <WarningModal
                    title={"The selected staff will be deleted. Are you sure?"}
                    visible={modalVisible}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />

                {/* handle the Flastlist */}
                <FlatList
                    data={StaffInfoDetails}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    renderItem={({ item }) => (
                        <StaffInfoDetailsCard
                            infoTitle={item.title}
                            infoDetails={item.value}
                        />
                    )}
                    style={{ marginBottom: hp("10%") }}
                />

                {/* delete staff button */}
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
                        <AntDesign
                            name="deleteuser"
                            size={24}
                            color="red"
                            style={{ padding: wp("5%") }}
                        />
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default StaffInfoDetails;
