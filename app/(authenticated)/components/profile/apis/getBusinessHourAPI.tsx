import { useQuery } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessHourInfo } from "@/app/(authenticated)/components/profile/types/types";

// def a hook to get the businessHour info
export const useGetBusinessHourAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager
    //  to retrieve all the businessHour info that they offer

    // def a function to get businessHour info
    const getBusinessHourInfoRequest =
        async (): Promise<BusinessHourInfo | null> => {
            // get the access token from auth
            const accessToken = auth?.user?.IdToken;

            const businessId = auth?.user?.uid;

            // make a GET request to the backend to get businessHour info
            const response = await fetch(`${BASE_URL}/businessHour`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                    "Content-Type": "application/json",
                    "business-id": businessId,
                } as HeadersInit,

                credentials: "include",
            });

            // this trick is used to handle the case
            // where there is no businessHour added to the business yet
            // which is unlikely to happen because I will trigger the creation of businessHour
            // when the business is created (i.e., when the business manager signs up)
            if (response.status == 404) {
                return null;
            }

            // check if the request was successful
            if (!response.ok) {
                throw new Error(
                    "Failed to get businessHour info [frontend error message]"
                );
            }

            return response.json();
        };

    // use the useQuery hook to get the businessHour info
    const {
        data: businessHourInfo,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    } = useQuery(
        ["getBusinessHourInfo", auth?.user?.uid],
        getBusinessHourInfoRequest,
        {
            enabled: !!auth?.user?.uid, // Only run query if auth.uid is available
        }
    );

    return { businessHourInfo, isLoading, isError, isSuccess, error, refetch };
};
