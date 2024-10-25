import { Pressable, useColorScheme, View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { router, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";

import { useToast } from "@/app/(authenticated)/utils/toasts/toastContext";
import { useGetBusinessInfoAPI } from "@/app/(authenticated)/components/profile/apis/getBusinessInfoAPI";
import Colors from "@/constants/styles/Colors";
import BusinessInfoCard from "@/app/(authenticated)/components/profile/components/auth/forBusiness/BusinessInfoCard";

const BusinessInfo = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const { message, clearToast } = useToast();

    const {
        currentBusinessInfo,
        refetch,
        isLoading: isGetBusinessInfoLoading,
    } = useGetBusinessInfoAPI();

    const businessInfoData = [
        { title: "Email", value: currentBusinessInfo?.email || "" },
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
    ];

    // handle the header when this screen is rendered
    useEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back",
            headerTitle: "Business Information",
            presentation: "card",

            headerRight: () => (
                // edit button
                <Pressable
                    onPress={() => {
                        router.navigate(
                            "/(authenticated)/components/profile/screens/forBusiness/EditBusinessInfo"
                        ),
                            refetch();
                    }}
                >
                    <View
                        style={{
                            alignSelf: "flex-end",
                            paddingHorizontal: 15,
                        }}
                    >
                        <AntDesign
                            name={"edit"}
                            size={24}
                            color={Colors[colorScheme ?? "light"].text}
                        />
                    </View>
                </Pressable>
            ),
        });
    }, [navigation, colorScheme]);

    useEffect(() => {
        // this trick is used to handle the scenario
        // where the user makes no changes to the business info
        // and still tries to submit the form
        // so the toast message shows "No changes detected in the business information."
        // if no data has changed, show a toast and return
        if (message === "No changes detected in the business information") {
            Toast.show({
                type: "info",
                text1: "Notification",
                text2: message,
                position: "bottom",
            });

            clearToast();
        } else if (message === "Business information updated successfully") {
            Toast.show({
                type: "success",
                text1: "Success",
                text2: message,
                position: "bottom",
            });

            clearToast();
        }
    }, [message]);

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
                        borderTopColor:
                            Colors[colorScheme ?? "light"].separator,
                        borderTopWidth: 1,
                        backgroundColor:
                            Colors[colorScheme ?? "light"].background,
                        height: hp("10%"),
                        borderBottomColor:
                            Colors[colorScheme ?? "light"].separator,
                        borderBottomWidth: 1,
                        alignSelf: "center",
                        justifyContent: "center",
                        width: wp("100%"),
                    }}
                >
                    <Text
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                            marginLeft: wp("10%"),
                            fontSize: 18,
                            fontWeight: "500",
                        }}
                    >
                        {currentBusinessInfo?.name}
                    </Text>
                </View>

                {/* handle the Flastlist */}
                <FlatList
                    data={businessInfoData}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    renderItem={({ item }) => (
                        <BusinessInfoCard
                            infoTitle={item.title}
                            infoDetails={item.value}
                        />
                    )}
                    style={{ marginBottom: hp("10%") }}
                />

                <Toast />
            </View>
        </>
    );
};

export default BusinessInfo;
