import { useMutation } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";

// def a hook to update a specified appointment info
export const useDeleteAppointmentAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // def a function to get the appointment info
    const deleteAppointmentRequest = async (appointmentId: string) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;
        const businessId = auth?.user?.uid;

        // make a GET request to the backend to get the appointment info
        const response = await fetch(`${BASE_URL}/appointment`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
                "business-id": businessId,
                "appointment-id": appointmentId,
            } as HeadersInit,

            credentials: "include",
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to delete appointment");
        }

        return response.json();
    };

    // use the useMutation hook to delete the appointment info
    const {
        data: deleteAppointment,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useMutation(deleteAppointmentRequest);

    return {
        deleteAppointment,
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
