import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Wander } from "react-native-animated-spinkit";

import { useCreateBusinessAPI } from "@/app/(authenticated)/components/profile/apis/createBusinessAPI";
import { useCreateBusinessHourAPI } from "@/app/(authenticated)/components/profile/apis/createBusinessHourAPI";
import { BusinessInfo } from "@/app/(authenticated)/components/profile/types/types";
import { BusinessHourInfo } from "@/app/(authenticated)/components/profile/types/types";

const loading = () => {
    const { businessId, name, email } = useLocalSearchParams();
    const { createBusinessInfo } = useCreateBusinessAPI();
    const { createBusinessHour } = useCreateBusinessHourAPI();

    const [error, setError] = useState<string | null>(null);

    // initialize the startTime = "10:00 AM"
    const initStartTime = "10:00 AM";

    // initialize the finishTime = "7:00 PM"
    const initFinishTime = "7:00 PM";

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

                    // call the API to create the business
                    await createBusinessInfo(businessInfo);

                    // Navigate to authenticated tabs if successful
                    router.replace("/(authenticated)/(tabs)");
                } catch (error) {
                    console.error(
                        "Error creating business [loading screen]: ",
                        error
                    );
                }
            }
        };

        const handleCreateBusinessHour = async () => {
            if (businessId && name && email) {
                try {
                    const businessHourInfo: BusinessHourInfo = {
                        businessId: Array.isArray(businessId)
                            ? businessId[0]
                            : businessId,
                        startTime: initStartTime,
                        finishTime: initFinishTime,
                    };

                    // call the API to create the business hour
                    await createBusinessHour(businessHourInfo);

                    // Navigate to authenticated tabs if successful
                    router.replace("/(authenticated)/(tabs)");
                } catch (error) {
                    console.error(
                        "Error creating business hour [loading screen]: ",
                        error
                    );
                }
            }
        };

        handleCreateBusiness();
        handleCreateBusinessHour();
    }, [businessId, name, email, createBusinessInfo, createBusinessHour]);

    return (
        <>
            <View>
                <Wander size={48} color="blue" />
            </View>
        </>
    );
};

export default loading;
