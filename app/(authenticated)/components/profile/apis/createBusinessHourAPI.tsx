import { useMutation } from "react-query";

// import { BASE_URL } from "@/app/(auth)/utils/utils";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessHourInfo } from "@/app/(authenticated)/components/profile/types/types";

// def a hook to create a new setting of businessHours
export const useCreateBusinessHourAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager
    // to create a new setting of businessHours for their business

    // def a function to create a new setting of businessHours
    const createBusinessHourRequest = async (
        BusinessHourInfo: BusinessHourInfo
    ) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        // make a POST request to the backend to create a setting of businessHours
        const response = await fetch(`${BASE_URL}/businessHour`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
            body: JSON.stringify(BusinessHourInfo),
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error(
                "Failed to create businessHour [frontend error message]"
            );
        }

        // return the response
        return response.json();
    };

    // use the useMutation hook to create a new setting of businessHours
    const {
        mutateAsync: createBusinessHour,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createBusinessHourRequest);

    return { createBusinessHour, isLoading, isError, isSuccess };
};
