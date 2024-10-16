import { useQuery } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { ServiceInfo } from "@/app/(authenticated)/components/profile/types/types";

// def a hook to get the service info
export const useGetAllServicesAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager
    //  to retrieve all the service info that they offer

    // def a function to get service info
    const getAllServicesInfoRequest = async (): Promise<ServiceInfo | null> => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        const businessId = auth?.user?.uid;

        // make a GET request to the backend to get service info
        const response = await fetch(`${BASE_URL}/service/services`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
                "business-id": businessId,
            } as HeadersInit,

            credentials: "include",
        });

        // this trick is used to handle the case
        // where there is no service added to the business yet
        if (response.status === 404) {
            return null;
        }

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to get service info");
        }

        return response.json();
    };

    // use the useQuery hook to get the service info
    const {
        data: allServicesInfo,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    } = useQuery(
        ["getAllServicesInfo", auth?.user?.uid],
        getAllServicesInfoRequest,
        {
            enabled: !!auth?.user?.uid, // Only run query if auth.uid is available
        }
    );

    return { allServicesInfo, isLoading, isError, isSuccess, error, refetch };
};
