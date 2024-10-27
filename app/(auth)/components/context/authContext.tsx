// import * as React from "react";
// import { router } from "expo-router";
// import { onAuthStateChanged, signOut } from "firebase/auth";

// import { ContextInterface, User } from "../../types/types";
// import { useProtectedRoute } from "../hooks/useProtectedRoute";
// import { auth } from "@/firebase/firebaseConfig";

// // initial state
// const userInitialState = {
//     token: "",
//     uid: "",
//     createdAt: "",
//     displayName: "",
//     lastLoginAt: "",
//     photoURL: "",
//     providerId: "",
//     email: "",
// };

// // initial context state
// const contextInitialState: ContextInterface = {
//     user: userInitialState,
//     signIn: () => {},
//     signOut: () => {},
// };

// // create context
// export const AuthContext =
//     React.createContext<ContextInterface>(contextInitialState);

// // This provider will wrap the entire app and provide the user authentication.
// export function AuthProvider({ children }: React.PropsWithChildren) {
//     const [user, setUser] = React.useState<User>(userInitialState);

//     useProtectedRoute(user);

//     React.useEffect(() => {
//         const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
//             if (user) {
//                 const IdToken = await user.getIdToken();

//                 const authenticatedUserData: User = {
//                     IdToken: IdToken,
//                     uid: user.uid,
//                     displayName: user.providerData[0].displayName ?? "",
//                     photoURL: user.providerData[0].photoURL ?? "",
//                     providerId: user.providerData[0].providerId,
//                     email: user.providerData[0].email ?? "",
//                     createdAt: user.metadata.creationTime!,
//                     lastLoginAt: user.metadata.lastSignInTime!,
//                 };

//                 // work with Slot in the _layout.tsx file
//                 // basically, this will redirect to the tabs screen (i.e., access the app),
//                 // if the user is authenticated
//                 setUser(authenticatedUserData);
//                 router.replace("/(authenticated)/(tabs)");
//             } else {
//                 // work with Slot in the _layout.tsx file
//                 // basically, this will redirect to the welcome screen,
//                 // if the user is not authenticated
//                 console.log("user is not authenticated");
//                 router.replace("/(auth)/screens/Welcome");
//             }
//         });
//         return () => unsubscribeAuth();
//     }, []);

//     // return the context provider
//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 signIn: setUser,
//                 signOut: () => {
//                     setUser(userInitialState);
//                     signOut(auth);
//                 },
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }
import * as React from "react";
import { router } from "expo-router";
import { onAuthStateChanged, onIdTokenChanged, signOut } from "firebase/auth";

import { ContextInterface, User } from "../../types/types";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { auth } from "@/firebase/firebaseConfig";

// Initial state for the user
const userInitialState: User = {
    IdToken: "",
    uid: "",
    createdAt: "",
    displayName: "",
    lastLoginAt: "",
    photoURL: "",
    providerId: "",
    email: "",
};

// Initial context state
const contextInitialState: ContextInterface = {
    user: userInitialState,
    signIn: () => {},
    signOut: () => {},
};

// Create the AuthContext
export const AuthContext =
    React.createContext<ContextInterface>(contextInitialState);

/**
 * Custom hook to refresh the token every 30 minutes.
 */
function useTokenRefresher(
    setUser: React.Dispatch<React.SetStateAction<User>>
) {
    React.useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        const refreshToken = async () => {
            try {
                const newToken = await auth.currentUser?.getIdToken(true); // Force token refresh
                console.log("ID Token refreshed:", newToken);

                setUser((prevUser) => ({
                    ...prevUser,
                    token: newToken ?? prevUser.IdToken,
                }));
            } catch (error) {
                console.error("Error refreshing token:", error);
            }
        };

        intervalId = setInterval(refreshToken, 45 * 60 * 1000);

        // Cleanup interval on unmount
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [setUser]); // Run only once when the component mounts
}

/**
 * AuthProvider component that wraps the app and provides authentication context.
 */
export function AuthProvider({ children }: React.PropsWithChildren) {
    const [user, setUser] = React.useState<User>(userInitialState); // User state

    // Protect routes based on the user's authentication status
    useProtectedRoute(user);

    // Use the token refresher hook
    useTokenRefresher(setUser);

    React.useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(
            auth,
            async (firebaseUser) => {
                if (firebaseUser) {
                    const IdToken = await firebaseUser.getIdToken(); // Get initial token

                    const authenticatedUserData: User = {
                        IdToken: IdToken,
                        uid: firebaseUser.uid,
                        displayName:
                            firebaseUser.providerData[0]?.displayName ?? "",
                        photoURL: firebaseUser.providerData[0]?.photoURL ?? "",
                        providerId:
                            firebaseUser.providerData[0]?.providerId ?? "",
                        email: firebaseUser.providerData[0]?.email ?? "",
                        createdAt: firebaseUser.metadata.creationTime!,
                        lastLoginAt: firebaseUser.metadata.lastSignInTime!,
                    };

                    setUser(authenticatedUserData);
                    router.replace("/(authenticated)/(tabs)");
                } else {
                    console.log("User is not authenticated");
                    router.replace("/(auth)/screens/Welcome");
                }
            }
        );

        return () => unsubscribeAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn: setUser,
                signOut: async () => {
                    setUser(userInitialState);
                    await signOut(auth);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
