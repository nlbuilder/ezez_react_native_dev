import { useQuery } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessStaffInfoDetails } from "@/app/(authenticated)/components/profile/types/types";

// def a hook to get staff info
export const useGetBusinessStaffInfoAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated staff to get their own info
    // it is not meant to be used by the business manager
    // the business manager should use the useGetBusinessInfoAPI hook instead
    // there is a listOfStaff field that can give a brief information about all staffs
    // also, there is a method, named useGetBusinessStaffInfoForBusinessAPI,
    // that can be used to get the staff info details for a specific staff

    // def a function to get staff info
    const getBusinessStaffInfoRequest =
        async (): Promise<BusinessStaffInfoDetails | null> => {
            // get the access token from auth
            const accessToken = auth?.user?.IdToken;

            const businessStaffId = auth?.user?.uid;

            // make a GET request to the backend
            const response = await fetch(`${BASE_URL}/auth/staff/forStaff`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                    "Content-Type": "application/json",
                    "businessstaff-id": businessStaffId,
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
        data: currentBusinessStaffInfo,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    } = useQuery(
        // note * use unique key for each query
        ["getStaffInfo", auth?.user?.uid],
        getBusinessStaffInfoRequest,
        {
            enabled: !!auth?.user?.uid, // Only run query if auth.user.uid is available
        }
    );

    return {
        currentBusinessStaffInfo,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    };
};
