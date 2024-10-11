import { View } from "react-native";
import React, { useEffect } from "react";
import { useCreateBusinessAPI } from "../apis/createBusinessAPI";
import { BusinessInfo } from "../types/types";
import { useLocalSearchParams } from "expo-router";
import { Wander } from "react-native-animated-spinkit";

const loading = () => {
    const { businessId, name, email } = useLocalSearchParams();
    const { createBusinessInfo } = useCreateBusinessAPI();

    useEffect(() => {
        const createBusinessRequest = async () => {
            if (businessId && name && email) {
                try {
                    const businessInfo: BusinessInfo = {
                        businessId: Array.isArray(businessId)
                            ? businessId[0]
                            : businessId,
                        name: Array.isArray(name) ? name[0] : name,
                        email: Array.isArray(email) ? email[0] : email,
                    };

                    await createBusinessInfo(businessInfo);
                } catch (error) {
                    console.error(
                        "Error creating business [loading screen]: ",
                        error
                    );
                }
            }
        };

        createBusinessRequest();
    }, [createBusinessInfo]);

    return (
        <View>
            <Wander size={48} color="blue" />
        </View>
    );
};

export default loading;
