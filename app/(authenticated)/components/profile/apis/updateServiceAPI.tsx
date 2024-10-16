import { useMutation } from "react-query";

import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { ServiceInfo } from "@/app/(authenticated)/components/profile/types/types";

// def a hook to update the service info given a serviceId and businessId
export const useUpdateServiceAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager
    //  to update the service info that they offer

    // def a function to update service info
    const updateServiceInfoRequest = async (
        // serviceId: string,
        formData: ServiceInfo
    ) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        // const businessId = auth?.user?.uid;

        // make a PUT request to the backend to update service info
        const response = await fetch(`${BASE_URL}/service`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
                // "business-id": businessId,
                // "service-id": serviceId,
            } as HeadersInit,

            credentials: "include",
            body: JSON.stringify(formData),
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to update service info");
        }

        return response.json();
    };

    // use the useMutation hook to update the business info
    const {
        mutateAsync: updateServiceInfo,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useMutation(updateServiceInfoRequest);

    return {
        updateServiceInfo,
        isLoading,
        isError,
        isSuccess,
        error,
    };

    // // use the useMutation hook to update the service info
    // const mutation = useMutation(
    //     ({
    //         serviceId,
    //         formData,
    //     }: {
    //         serviceId: string;
    //         formData: ServiceInfo;
    //     }) => updateServiceInfoRequest(serviceId, formData)
    // );

    // // destructure the returned values from the mutation
    // const { data, isLoading, isError, isSuccess, error } = mutation;

    // return {
    //     updateServiceInfo: mutation.mutate,
    //     data,
    //     isLoading,
    //     isError,
    //     isSuccess,
    //     error,
    // };
};
