import { ActivityIndicator, View } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { useCreateBusinessAPI } from "@/app/(authenticated)/components/profile/apis/createBusinessAPI";
import { BusinessInfo } from "@/app/(authenticated)/components/profile/types/types";

const loading = () => {
    const { businessId, email } = useLocalSearchParams();

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
    }, [businessId, email]);

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
