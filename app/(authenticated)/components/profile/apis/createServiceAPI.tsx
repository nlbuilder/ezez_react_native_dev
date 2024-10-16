import { useMutation } from "react-query";

// import { BASE_URL } from "@/app/(auth)/utils/utils";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { ServiceInfo } from "@/app/(authenticated)/components/profile/types/types";

// def a hook to create a new service
export const useCreateServiceAPI = () => {
    const auth = useAuth();

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

    // this method is meant to be used by an authenticated business manager
    // to create a new service that they offer

    // def a function to create a new service
    const createServiceRequest = async (ServiceInfo: ServiceInfo) => {
        // get the access token from auth
        const accessToken = auth?.user?.IdToken;

        // make a POST request to the backend to create a service
        const response = await fetch(`${BASE_URL}/service`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ServiceInfo),
        });

        // check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to create service");
        }

        // return the response
        return response.json();
    };

    // use the useMutation hook to create a new service
    const {
        mutateAsync: createService,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createServiceRequest);

    return { createService, isLoading, isError, isSuccess };
};
