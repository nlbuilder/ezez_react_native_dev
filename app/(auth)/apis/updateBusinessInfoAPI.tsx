import { useMutation } from "react-query";

import { BASE_URL } from "@/app/(auth)/utils/utils";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessInfo } from "@/app/(auth)/types/types";

// def a hook to update business info
export const useUpdateBusinessInfoAPI = () => {
    const auth = useAuth();

    // def a function to update business info
    const updateBusinessInfoRequest = async (formData: BusinessInfo) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        const businessId = auth?.user?.uid;

        // make a PUT request to the backend
        const response = await fetch(`${BASE_URL}/auth/business`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
                "business-id": businessId, // inject the businessId to send to backend
            } as HeadersInit,

            credentials: "include",
            body: JSON.stringify(formData),
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to update business info");
        }

        return response.json();
    };

    // use the useMutation hook to update the business info
    const {
        data: updateBusinessInfo,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useMutation(updateBusinessInfoRequest);

    return {
        updateBusinessInfo,
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
