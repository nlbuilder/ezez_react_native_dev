import {
    Pressable,
    useColorScheme,
    View,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { useGetBusinessInfoAPI } from "@/app/(authenticated)/components/profile/apis/getBusinessInfoAPI";
import { useUpdateBusinessInfoAPI } from "@/app/(authenticated)/components/profile/apis/updateBusinessInfoAPI";
import Colors from "@/constants/styles/Colors";
import EditBusinessInfoCard from "@/app/(authenticated)/components/profile/components/auth/forBusiness/EditBusinessInfoCard";
import { useToast } from "@/app/(authenticated)/utils/toasts/toastContext";
import { compareObjects } from "@/app/(authenticated)/utils/utils";

const EditBusinessInfo = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const { showToast } = useToast();

    const {
        updateBusinessInfo,
        isLoading: isUpdateBusinessInfoLoading,
        isSuccess,
    } = useUpdateBusinessInfoAPI();

    const {
        currentBusinessInfo,
        refetch,
        isLoading: isGetBusinessInfoLoading,
    } = useGetBusinessInfoAPI();

    // filter out the properties we don't want to compare
    // between the currentBusinessInfo and the updatedBusinessInfo
    const filteredCurrentBusinessInfo = currentBusinessInfo
        ? Object.fromEntries(
              Object.entries(currentBusinessInfo).filter(
                  ([key]) =>
                      key !== "_id" &&
                      key !== "listOfStaff" &&
                      key !== "logoURL"
              )
          )
        : {};

    // Create a local state to store updated business info
    const [businessInfoData, setBusinessInfoData] = useState([
        { title: "Business Title", value: currentBusinessInfo?.name || "" },
        {
            title: "Phone Number",
            value: currentBusinessInfo?.phoneNumber || "",
        },
        {
            title: "Manager Name",
            value: Array.isArray(currentBusinessInfo?.managerName)
                ? currentBusinessInfo.managerName.join(", ")
                : "",
        },
        {
            title: "Address Line 1",
            value: currentBusinessInfo?.addressLine1 || "",
        },
        {
            title: "Address Line 2",
            value: currentBusinessInfo?.addressLine2 || "",
        },
        { title: "City", value: currentBusinessInfo?.city || "" },
        { title: "State", value: currentBusinessInfo?.state || "" },
        { title: "Zip Code", value: currentBusinessInfo?.zip || "" },
        { title: "Country", value: currentBusinessInfo?.country || "" },
        { title: "Description", value: currentBusinessInfo?.description || "" },
    ]);

    // Update the local state when a user makes changes
    const handleChange = (index: number, value: string) => {
        const updatedData = [...businessInfoData];
        updatedData[index].value = value;
        setBusinessInfoData(updatedData);
    };

    // Handle submission of the updated data
    const handleSubmit = async () => {
        const updatedBusinessInfoData = {
            email: currentBusinessInfo?.email || "",
            businessId: currentBusinessInfo?.businessId || "",
            name: businessInfoData[0].value,
            phoneNumber: businessInfoData[1].value,
            managerName: businessInfoData[2].value.split(", "),
            addressLine1: businessInfoData[3].value,
            addressLine2: businessInfoData[4].value,
            city: businessInfoData[5].value,
            state: businessInfoData[6].value,
            zip: businessInfoData[7].value,
            country: businessInfoData[8].value,
            description: businessInfoData[9].value,
        };

        // compare updatedBusinessInfo with currentBusinessInfo (i.e., filteredCurrentBusinessInfo)
        const differences = compareObjects(
            updatedBusinessInfoData,
            filteredCurrentBusinessInfo
        );

        // this trick is used to handle the scenario
        // where the user makes no changes to the business info
        // and still tries to submit the form
        // so the toast message shows "No changes detected in the business information."
        // if no data has changed, show a toast and return
        if (differences === "No differences found") {
            if (showToast) {
                showToast("No changes detected in the business information");
            }
        } else {
            try {
                const update = await updateBusinessInfo(
                    updatedBusinessInfoData
                );

                if (update) {
                    if (showToast) {
                        showToast("Business information updated successfully");
                    }

                    refetch(); // refetch the data

                    setTimeout(() => {
                        router.back(); // go back to the previous screen
                    }, 1000); // wait for 1 second
                } else {
                    if (showToast) {
                        showToast("Failed to update business information");
                    }
                }
            } catch (error) {
                console.log("Error when updating business info: ", error);
                if (showToast) {
                    showToast(
                        "An error occurred while updating business information"
                    );
                }
            }
        }
    };

    // Set up header options
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Edit Business Information",
            presentation: "modal",

            headerRight: () => (
                <Pressable onPress={handleSubmit}>
                    <View
                        style={{ alignSelf: "flex-end", paddingHorizontal: 10 }}
                    >
                        <AntDesign
                            name={"check"}
                            size={24}
                            color={
                                Colors[colorScheme ?? "light"].tabIconSelected
                            }
                        />
                    </View>
                </Pressable>
            ),
        });
    }, [navigation, colorScheme]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors[colorScheme ?? "light"].background,
            }}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"} // adjust behavior based on platform
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // adjust offset for iOS
            >
                <FlatList
                    data={businessInfoData}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    renderItem={({ item, index }) => (
                        <EditBusinessInfoCard
                            infoTitle={item.title}
                            infoDetails={item.value}
                            onChange={(value) => handleChange(index, value)}
                        />
                    )}
                />
            </KeyboardAvoidingView>
            <Toast />
        </View>
    );
};

export default EditBusinessInfo;
