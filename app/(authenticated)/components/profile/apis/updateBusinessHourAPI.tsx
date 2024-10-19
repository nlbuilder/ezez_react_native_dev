import { useMutation } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessHourInfo } from "@/app/(authenticated)/components/profile/types/types";

// def a hook to update the businessHour info given businessId
export const useUpdateBusinessHourAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager
    //  to update the setting of the business hours

    // def a function to update businessHour info
    const updateBusinessHourInfoRequest = async (
        formData: BusinessHourInfo
    ) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        // make a PUT request to the backend to update businessHour info
        const response = await fetch(`${BASE_URL}/businessHour`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            } as HeadersInit,

            credentials: "include",
            body: JSON.stringify(formData),
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to update businessHour info");
        }

        return response.json();
    };

    // use the useMutation hook to update the business info
    const {
        mutateAsync: updateBusinessHourInfo,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useMutation(updateBusinessHourInfoRequest);

    return {
        updateBusinessHourInfo,
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
