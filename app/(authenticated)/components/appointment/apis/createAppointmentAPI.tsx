import { useMutation } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { AppointmentDetailsProps } from "@/app/(authenticated)/components/appointment/types/types";

// def a hook to create a new appointment
export const useCreateAppointmentAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager
    // to create a new appointment for their business

    // def a function to create a new appointment
    const createAppointmentRequest = async (
        AppointmentInfo: AppointmentDetailsProps
    ) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        // make a POST request to the backend to create a apoointment
        const response = await fetch(`${BASE_URL}/appointment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
            body: JSON.stringify(AppointmentInfo),
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error(
                "Failed to create appointment [frontend error message]"
            );
        }

        // return the response data
        return response.json();
    };

    // use the useMutation hook to create a new apoointment
    const {
        mutateAsync: createAppointment,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createAppointmentRequest);

    return { createAppointment, isLoading, isError, isSuccess };
};
