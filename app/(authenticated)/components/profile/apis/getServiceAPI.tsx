import { useQuery } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { ServiceInfo } from "@/app/(authenticated)/components/profile/types/types";

// def a hook to get the service info
export const useGetServiceAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager
    // to retrieve the details info of a specified service that they offer

    // def a function to get service info
    const getServiceInfoRequest = async (): Promise<ServiceInfo> => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        const businessId = auth?.user?.uid;

        // make a GET request to the backend to get service info
        const response = await fetch(`${BASE_URL}/service`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
                "business-id": businessId,
            } as HeadersInit,

            credentials: "include",
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to get service info");
        }

        return response.json();
    };

    // use the useQuery hook to get the service info
    const {
        data: serviceInfo,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    } = useQuery(["getServiceInfo", auth?.user?.uid], getServiceInfoRequest, {
        enabled: !!auth?.user?.uid, // Only run query if auth.user.uid is available
    });

    return { serviceInfo, isLoading, isError, isSuccess, error, refetch };
};
