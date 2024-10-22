import { useMutation } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { AppointmentDetailsProps } from "@/app/(authenticated)/components/appointment/types/types";

// def a hook to update a specified appointment info
export const useUpdateAppointmentAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // def a function to get the appointment info
    const updateAppointmentInfoRequest = async (
        formData: AppointmentDetailsProps
    ) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        const businessId = auth?.user?.uid;

        // make a GET request to the backend to get the appointment info
        const response = await fetch(`${BASE_URL}/appointment`, {
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
            throw new Error("Failed to update appointment info");
        }

        return response.json();
    };

    // use the useMutation hook to update the appointment info
    const {
        mutateAsync: updateAppointmentInfo,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useMutation(updateAppointmentInfoRequest);

    return {
        updateAppointmentInfo,
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
