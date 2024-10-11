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

import { useGetBusinessInfoAPI } from "@/app/(auth)/apis/getBusinessInfoAPI";
import { useUpdateBusinessInfoAPI } from "@/app/(auth)/apis/updateBusinessInfoAPI";
import Colors from "@/constants/styles/Colors";
import EditBusinessInfoCard from "../components/businessInfo/EditBusinessInfoCard";

const EditBusinessInfo = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const { updateBusinessInfo, isLoading: isUpdateBusinessInfoLoading } =
        useUpdateBusinessInfoAPI();

    const {
        currentBusinessInfo,
        refetch,
        isLoading: isGetBusinessInfoLoading,
    } = useGetBusinessInfoAPI();

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
        const updatedBusinessInfo = {
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

        const update = updateBusinessInfo(updatedBusinessInfo);

        if (await update) {
            refetch(); // refetch the data
            router.back(); // go back to the previous screen
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
    }, [navigation, businessInfoData]);

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
        </View>
    );
};

export default EditBusinessInfo;
