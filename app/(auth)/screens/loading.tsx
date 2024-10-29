import { ActivityIndicator, View } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { useCreateBusinessAPI } from "@/app/(authenticated)/components/profile/apis/createBusinessAPI";
import { BusinessInfo } from "@/app/(authenticated)/components/profile/types/types";

const loading = () => {
    const {
        businessId,
        email,
        // , name
    } = useLocalSearchParams();

    const { createBusinessInfo, isLoading: isCreateBusinessInfoLoading } =
        useCreateBusinessAPI();

    useEffect(() => {
        const handleCreateBusiness = async () => {
            if (
                businessId &&
                email
                //  && name
            ) {
                try {
                    const businessInfo: BusinessInfo = {
                        businessId: Array.isArray(businessId)
                            ? businessId[0]
                            : businessId,
                        // name: Array.isArray(name) ? name[0] : name,
                        email: Array.isArray(email) ? email[0] : email,
                    };

                    console.log("Sending business info:", businessInfo);

                    // call the API to create the business
                    const business = await createBusinessInfo(businessInfo);

                    console.log("business: ", business);

                    if (!business) {
                        console.error("Error creating business: ", business);
                    }

                    if (business) {
                        // Navigate to authenticated tabs if successful
                        // deciding between InitBusinessProfile screens

                        // router.replace(
                        //     "/(authenticated)/components/profile/screens/forBusiness/InitBusinessProfile"
                        // );

                        router.replace(
                            "/(auth)/screens/InitBusinessProfileScreen"
                        );
                    }
                } catch (error) {
                    console.error(
                        "Error creating business [loading screen]: ",
                        error
                    );
                }
            }
        };

        handleCreateBusiness();
    }, [
        businessId,
        email,
        //  name
    ]);

    if (isCreateBusinessInfoLoading) {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size="small" color="grey" />
                </View>
            </>
        );
    }

    return (
        <>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="small" color="grey" />
            </View>
        </>
    );
};

export default loading;
