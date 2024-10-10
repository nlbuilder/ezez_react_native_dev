import { useQuery } from "react-query";

import { BASE_URL } from "@/app/(auth)/utils/utils";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessStaffInfo } from "@/app/(auth)/types/types";

// def a hook to get staff info
export const useGetBusinessStaffInfoAPI = () => {
    const auth = useAuth();

    // this method is meant to be used by an authenticated staff to get their own info
    // it is not meant to be used by the business manager
    // the business manager should use the useGetBusinessInfoAPI hook instead
    // there is a listOfStaff field that contains all the staff info in the business info

    // def a function to get staff info
    const getBusinessStaffInfoRequest =
        async (): Promise<BusinessStaffInfo> => {
            // get the access token from auth
            const accessToken = auth?.user?.IdToken;

            const businessStaffId = auth?.user?.uid;

            // make a GET request to the backend
            const response = await fetch(`${BASE_URL}/auth/staff`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                    "Content-Type": "application/json",
                    "businessstaff-id": businessStaffId,
                } as HeadersInit,

                credentials: "include",
            });

            // check if the request was successful
            if (!response.ok) {
                throw new Error("Failed to get staff info");
            }

            return response.json();
        };

    // use the useQuery hook to get the business info
    // const {
    //     data: currentBusinessStaffInfo,
    //     isLoading,
    //     isError,
    //     isSuccess,
    //     error,
    //     refetch,
    // } = useQuery("getBusinessStaffInfo", getBusinessStaffInfoRequest);

    const {
        data: currentBusinessStaffInfo,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    } = useQuery(
        ["getBusinessInfo", auth?.user?.uid],
        getBusinessStaffInfoRequest,
        {
            enabled: !!auth?.user?.uid, // Only run query if auth.uid is available
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
