import { useMutation } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";

// def a hook to delete the service info given a serviceId and businessId
export const useDeleteServiceAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager
    // to delete the service info that they offer

    // def a function to delete service info
    const deleteServiceRequest = async (serviceId: string) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        const businessId = auth?.user?.uid;

        // make a DELETE request to the backend to delete the service info
        const response = await fetch(`${BASE_URL}/service`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
                "business-id": businessId,
                "service-id": serviceId,
            } as HeadersInit,

            credentials: "include",
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to delete service info");
        }

        return response.json();
    };
    // use the useMutation hook to delete the service info
    const {
        mutateAsync: deleteService,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useMutation(deleteServiceRequest);

    return { deleteService, isLoading, isError, isSuccess, error };
};
