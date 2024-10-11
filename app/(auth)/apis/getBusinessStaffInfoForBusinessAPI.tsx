import { useQuery } from "react-query";

import { BASE_URL } from "@/app/(auth)/utils/utils";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { BusinessStaffInfo } from "@/app/(auth)/types/types";

// def a hook to get staff info
export const useGetBusinessStaffInfoForBusinessAPI = () => {
    const auth = useAuth();

    // this method is meant to be used by an authenticated staff to get their own info
    // it is not meant to be used by the business manager
    // the business manager should use the useGetBusinessInfoAPI hook instead
    // there is a listOfStaff field that contains all the staff info in the business info

    // def a function to get staff info
    const getBusinessStaffInfoRequestForBusiness =
        async (): Promise<BusinessStaffInfo | null> => {
            // get the access token from auth
            const accessToken = auth?.user?.IdToken;

            const businessId = auth?.user?.uid;

            console.log(businessId);

            // make a GET request to the backend
            const response = await fetch(`${BASE_URL}/auth/business/staffs`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                    "Content-Type": "application/json",
                    "business-id": businessId,
                } as HeadersInit,

                credentials: "include",
            });

            console.log("response", response);

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
        ["getBusinessInfo", auth?.user?.uid],
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
