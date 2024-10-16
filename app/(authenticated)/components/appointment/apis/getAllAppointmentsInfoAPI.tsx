import { useQuery } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { AppointmentDetailsProps } from "@/app/(authenticated)/components/appointment/types/types";

// def a hook to get the appointment info
export const useGetAllAppointmentsAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager
    // to retrieve all the appointment info

    // def a function to get the appointment info
    const getAllAppointmentsInfoRequest =
        async (): Promise<AppointmentDetailsProps | null> => {
            // get the access token from auth
            const accessToken = auth?.user?.IdToken;

            const businessId = auth?.user?.uid;

            // make a GET request to the backend to get the appointment info
            const response = await fetch(`${BASE_URL}/appointment`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                    "Content-Type": "application/json",
                    "business-id": businessId,
                } as HeadersInit,

                credentials: "include",
            });

            // this trick is used to handle the case
            // where there is no appointment added to the business yet
            if (response.status === 404) {
                return null;
            }

            // check if the request was successful
            if (!response.ok) {
                throw new Error("Failed to get appointment info");
            }

            return response.json();
        };

    // use the useQuery hook to get the appointment info
    const {
        data: allAppointmentInfo,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    } = useQuery(
        ["getAppointmentInfo", auth?.user?.uid],
        getAllAppointmentsInfoRequest,
        {
            enabled: !!auth?.user?.uid, // Only run query if auth.uid is available
        }
    );

    return {
        allAppointmentInfo,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    };
};
