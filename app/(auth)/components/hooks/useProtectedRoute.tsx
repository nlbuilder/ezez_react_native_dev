import * as React from "react";
import { router, useRootNavigationState, useSegments } from "expo-router";
import { User } from "../../types/types";

// This hook will protect the route access based on user authentication.
export function useProtectedRoute(user: User) {
    const segments = useSegments();
    const navigationState = useRootNavigationState();

    const [hasNavigated, setHasNavigated] = React.useState(false);

    React.useEffect(() => {
        if (!navigationState?.key || hasNavigated) return;
        const inAuthGroup = segments[0] === "(auth)";

        if (!user.uid && !inAuthGroup) {
            // work with Slot in the _layout.tsx file
            // basically, this will redirect to the welcome screen,
            // if the user is not authenticated
            router.replace("/(auth)/screens/welcome");
            setHasNavigated(true);
        } else if (user.uid && inAuthGroup) {
            // work with Slot in the _layout.tsx file
            // basically, this will redirect to the tabs screen (i.e., access the app),
            // if the user is authenticated
            router.replace("/(authenticated)/(tabs)");
            setHasNavigated(true);
        }
    }, [user.uid, segments, navigationState, hasNavigated]);
}
