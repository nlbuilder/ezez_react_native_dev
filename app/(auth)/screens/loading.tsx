import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useCreateBusinessAPI } from "@/app/(authenticated)/components/profile/apis/createBusinessAPI";
import { BusinessInfo } from "@/app/(authenticated)/components/profile/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { Wander } from "react-native-animated-spinkit";

const loading = () => {
    const { businessId, name, email } = useLocalSearchParams();
    const { createBusinessInfo } = useCreateBusinessAPI();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleCreateBusiness = async () => {
            if (businessId && name && email) {
                try {
                    const businessInfo: BusinessInfo = {
                        businessId: Array.isArray(businessId)
                            ? businessId[0]
                            : businessId,
                        name: Array.isArray(name) ? name[0] : name,
                        email: Array.isArray(email) ? email[0] : email,
                    };

                    // Call the API to create the business
                    await createBusinessInfo(businessInfo);

                    // Navigate to authenticated tabs if successful
                    router.replace("/(authenticated)/(tabs)");
                } catch (error) {
                    console.error(
                        "Error creating business [loading screen]: ",
                        error
                    );

                    setError("Failed to create business.");
                }
            } else {
                setError("Missing business information.");
            }
        };

        handleCreateBusiness();
    }, [businessId, name, email, createBusinessInfo]);

    return (
        <>
            <View>
                <Wander size={48} color="blue" />
            </View>
        </>
    );
};

export default loading;
