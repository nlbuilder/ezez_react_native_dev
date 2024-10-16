import { useMutation } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { AppointmentDetailsProps } from "@/app/(authenticated)/components/appointment/types/types";

// def a hook to update a specified appointment info
export const useUpdateAppointmentAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // def a function to get the appointment info
    const updateAppointmentInfoRequest = async (
        appointmentId: string,
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
                "business-id": businessId,
                "appointment-id": appointmentId,
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

    // // use the useMutation hook to update the appointment info
    // const {
    //     data: updateAppointmentInfo,
    //     isLoading,
    //     isError,
    //     isSuccess,
    //     error,
    // } = useMutation(updateAppointmentInfoRequest);

    // return {
    //     updateAppointmentInfo,
    //     isLoading,
    //     isError,
    //     isSuccess,
    //     error,
    // };

    // use the useMutation hook to create the mutation
    const mutation = useMutation(
        ({
            appointmentId,
            formData,
        }: {
            appointmentId: string;
            formData: AppointmentDetailsProps;
        }) => updateAppointmentInfoRequest(appointmentId, formData)
    );

    // destructure the returned values from the mutation
    const { data, isLoading, isError, isSuccess, error } = mutation;

    // return the mutation and its states
    return {
        updateAppointmentInfo: mutation.mutate,
        data,
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
