import { useMutation } from "react-query";

// import { BASE_URL } from "@/app/(auth)/utils/utils";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessStaffInfoDetails } from "@/app/(authenticated)/components/profile/types/types";

// def a hook to update staff info
export const useUpdateBusinessStaffInfoAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // def a function to update staff info
    const updateBusinessStaffInfoRequest = async (
        formData: BusinessStaffInfoDetails
    ) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        const businessStaffId = auth?.user?.uid;

        // make a PUT request to the backend
        const response = await fetch(`${BASE_URL}/auth/staff/forStaff`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
                "businessstaff-Id": businessStaffId, // inject the businessId to send to backend
            } as HeadersInit,

            credentials: "include",
            body: JSON.stringify(formData),
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to update staff info");
        }

        return response.json();
    };

    // use the useMutation hook to update the business staff info
    const {
        mutateAsync: updateBusinessStaffInfo,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useMutation(updateBusinessStaffInfoRequest);

    return {
        updateBusinessStaffInfo,
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
