import { useQuery } from "react-query";

// import { BASE_URL } from "@/app/(auth)/utils/utils";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessInfo } from "@/app/(authenticated)/components/profile/types/types";

// def a hook to get business info
export const useGetBusinessInfoAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager to
    // get their business info including all the staff info

    // def a function to get business info
    const getBusinessInfoRequest = async (): Promise<BusinessInfo> => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        const businessId = auth?.user?.uid;

        // make a GET request to the backend
        const response = await fetch(`${BASE_URL}/auth/business`, {
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
            throw new Error(
                "Failed to get business info [frontend error message]"
            );
        }

        return response.json();
    };

    // use the useQuery hook to get the business info
    const {
        data: currentBusinessInfo,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    } = useQuery(
        // note * use unique key for each query
        ["getBusinessInfo", auth?.user?.uid],
        getBusinessInfoRequest,
        {
            enabled: !!auth?.user?.uid, // Only run query if auth.uid is available
        }
    );

    return {
        currentBusinessInfo,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    };
};
