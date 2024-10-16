import { useQuery } from "react-query";

// import { BASE_URL } from "@/app/(auth)/utils/utils";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessStaffInfoDetails } from "@/app/(authenticated)/components/profile/types/types";

// def a hook to get staff info
export const useGetBusinessStaffInfoForBusinessAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager
    // the business manager can ge tall details of all staffs in a business

    // def a function to get staff info
    const getBusinessStaffInfoRequestForBusiness =
        async (): Promise<BusinessStaffInfoDetails | null> => {
            // get the access token from auth
            const accessToken = auth?.user?.IdToken;

            const businessId = auth?.user?.uid;

            // make a GET request to the backend
            const response = await fetch(`${BASE_URL}/auth/staff/forBusiness`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                    "Content-Type": "application/json",
                    "business-id": businessId,
                } as HeadersInit,

                credentials: "include",
            });

            // this trick is used to handle the case
            // where there is no staff added to the business yet
            if (response.status === 404) {
                return null;
            }

            // check if the request was successful
            if (!response.ok) {
                throw new Error("Failed to get staff info");
            }

            return response.json();
        };

    const {
        data: currentBusinessStaffInfoForBusiness,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    } = useQuery(
        // note * use unique key for each query
        ["getStaffInfoForBusiness", auth?.user?.uid],
        getBusinessStaffInfoRequestForBusiness,
        {
            enabled: !!auth?.user?.uid, // Only run query if auth.uid is available
        }
    );
    return {
        currentBusinessStaffInfoForBusiness,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    };
};
