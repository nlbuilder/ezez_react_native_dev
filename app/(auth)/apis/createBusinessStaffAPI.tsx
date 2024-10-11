import { useMutation } from "react-query";

import { BASE_URL } from "@/app/(auth)/utils/utils";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessStaffInfo } from "@/app/(auth)/types/types";

// def a hook to create a new staff
export const useCreateBusinessStaffAPI = () => {
    const auth = useAuth();

    // this method is meant to be used by an authenticated business manager
    // to create a new staff that works for their business

    // def a function to create a staff
    const createBusinessStaffRequest = async (
        businessStaffInfo: BusinessStaffInfo
    ) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;
        const businessId = auth?.user?.uid;

        // make a POST request to the backend to create a staff
        const response = await fetch(`${BASE_URL}/auth/staff`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
                "business-id": businessId, // inject the businessId to send to backend
            } as HeadersInit,
            body: JSON.stringify(businessStaffInfo),
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error(
                "Failed to create staff [frontend error message]: "
            );
        }

        return response.json();
    };

    // use the useMutation hook to create a new staff
    const {
        mutateAsync: createBusinessStaff,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createBusinessStaffRequest);

    return { createBusinessStaff, isLoading, isError, isSuccess };
};
