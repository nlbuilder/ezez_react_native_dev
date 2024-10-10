import { useMutation } from "react-query";

import { BASE_URL } from "@/app/(auth)/utils/utils";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessInfo } from "@/app/(auth)/types/types";

// def a hook to create a new business
export const useCreateBusinessAPI = () => {
    const auth = useAuth();

    // def a function to create a business
    const createBusinessInfoRequest = async (BusinessInfo: BusinessInfo) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        // make a POST request to the backend to create a business
        const response = await fetch(`${BASE_URL}/auth/business`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
            body: JSON.stringify(BusinessInfo),
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to create business");
        }
    };

    // use the useMutation hook to create a new business
    const {
        mutateAsync: createBusinessInfo,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createBusinessInfoRequest);

    return { createBusinessInfo, isLoading, isError, isSuccess };
};
