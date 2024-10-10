import { useMutation } from "react-query";

import { BASE_URL } from "@/app/(auth)/utils/utils";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";

// def a hook to delete staff info
export const useDeleteBusinessStaffInfoAPI = () => {
    const auth = useAuth();

    // def a function to delete staff
    const deleteBusinessStaffInfoRequest = async (businessStaffId: string) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        const businessId = auth?.user?.uid;

        // make a DELETE request to the backend
        const response = await fetch(`${BASE_URL}/auth/staff`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
                "business-id": businessId,
                "businessstaff-id": businessStaffId, // inject the businessId to send to backend
            } as HeadersInit,

            credentials: "include",
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to delete staff");
        }

        return response.json();
    };

    // use the useQuery hook to delete business
    const {
        data: deleteBusinessStaff,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useMutation(deleteBusinessStaffInfoRequest);

    return {
        deleteBusinessStaff,
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
