import * as React from "react";
import { router } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { ContextInterface, User } from "../../types/types";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { auth } from "@/firebase/firebaseConfig";

// initial state
const userInitialState = {
    uid: "",
    createdAt: "",
    displayName: "",
    lastLoginAt: "",
    photoURL: "",
    providerId: "",
    email: "",
};

// initial context state
const contextInitialState: ContextInterface = {
    user: userInitialState,
    signIn: () => {},
    signOut: () => {},
};

// create context
export const AuthContext =
    React.createContext<ContextInterface>(contextInitialState);

// This provider will wrap the entire app and provide the user authentication.
export function AuthProvider({ children }: React.PropsWithChildren) {
    const [user, setUser] = React.useState<User>(userInitialState);

    useProtectedRoute(user);

    React.useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(JSON.stringify(user, null, 2));
                const authenticatedUserData: User = {
                    uid: user.uid,
                    displayName: user.providerData[0].displayName ?? "",
                    photoURL: user.providerData[0].photoURL ?? "",
                    providerId: user.providerData[0].providerId,
                    email: user.providerData[0].email ?? "",
                    createdAt: user.metadata.creationTime!,
                    lastLoginAt: user.metadata.lastSignInTime!,
                };

                // work with Slot in the _layout.tsx file
                // basically, this will redirect to the tabs screen (i.e., access the app),
                // if the user is authenticated
                setUser(authenticatedUserData);
                router.replace("/(authenticated)/(tabs)");
            } else {
                // work with Slot in the _layout.tsx file
                // basically, this will redirect to the welcome screen,
                // if the user is not authenticated
                console.log("user is not authenticated");
                alert("user is not authenticated");
                router.replace("/(auth)/screens/welcome");
            }
        });
        return () => unsubscribeAuth();
    }, []);

    // return the context provider
    return (
        <AuthContext.Provider
            value={{
                user,
                signIn: setUser,
                signOut: () => {
                    setUser(userInitialState);
                    signOut(auth);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
