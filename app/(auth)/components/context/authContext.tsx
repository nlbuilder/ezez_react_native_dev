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
import {
    onAuthStateChanged, // Listens for auth state changes (user login/logout).
    onIdTokenChanged, // Listens for token changes (useful for refreshing tokens).
    signOut,
    User as FirebaseUser, // Type for Firebase User.
} from "firebase/auth";
import * as LocalAuthentication from "expo-local-authentication";

import { ContextInterface, User } from "../../types/types";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { auth } from "@/firebase/firebaseConfig";

// --- Initial state for user.
const userInitialState = {
    token: "", // This will store the latest Firebase ID token.
    uid: "",
    createdAt: "",
    displayName: "",
    lastLoginAt: "",
    photoURL: "",
    providerId: "",
    email: "",
};

// --- Initial context state to be provided to the app.
const contextInitialState: ContextInterface = {
    user: userInitialState,
    signIn: () => {}, // Dummy function for sign-in.
    signOut: () => {}, // Dummy function for sign-out.
};

// --- Create the Authentication Context to share auth state across components.
export const AuthContext =
    React.createContext<ContextInterface>(contextInitialState);

// --- Main AuthProvider component wrapping the entire app.
export function AuthProvider({ children }: React.PropsWithChildren) {
    const [user, setUser] = React.useState<User>(userInitialState); // User state.

    useProtectedRoute(user); // Ensures user access to protected routes.

    // --- Effect to monitor authentication state (login/logout).
    React.useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(
            auth,
            async (firebaseUser) => {
                if (firebaseUser) {
                    // If the user is logged in, update user with the latest token.
                    await updateUserWithToken(firebaseUser);
                    router.replace("/(authenticated)/(tabs)"); // Redirect to authenticated tabs.
                } else {
                    // If no user is authenticated, redirect to welcome screen.
                    console.log("User is not authenticated");
                    router.replace("/(auth)/screens/Welcome");
                }
            }
        );

        return () => unsubscribeAuth(); // Cleanup listener on unmount.
    }, []); // Runs only on component mount.

    // --- Effect to monitor and refresh tokens when they change.
    React.useEffect(() => {
        const unsubscribeToken = onIdTokenChanged(
            auth,
            async (firebaseUser) => {
                if (firebaseUser) {
                    // If the token changes, update the user with the new token.
                    await updateUserWithToken(firebaseUser);
                }
            }
        );

        return () => unsubscribeToken(); // Cleanup listener on unmount.
    }, []); // Runs only on component mount.

    // --- Function to update user state with refreshed token.
    const updateUserWithToken = async (firebaseUser: FirebaseUser) => {
        const IdToken = await firebaseUser.getIdToken(true); // Force refresh the token.

        const authenticatedUserData: User = {
            IdToken, // Store the new token.
            uid: firebaseUser.uid,
            displayName: firebaseUser.providerData[0]?.displayName ?? "", // Optional chaining.
            photoURL: firebaseUser.providerData[0]?.photoURL ?? "",
            providerId: firebaseUser.providerData[0]?.providerId ?? "",
            email: firebaseUser.providerData[0]?.email ?? "",
            createdAt: firebaseUser.metadata.creationTime!, // Use non-null assertion.
            lastLoginAt: firebaseUser.metadata.lastSignInTime!,
        };

        setUser(authenticatedUserData); // Update user state.
    };

    // --- Return the Auth Context Provider.
    return (
        <AuthContext.Provider
            value={{
                user, // Provide the current user state.
                signIn: setUser, // Sign-in function to update user.
                signOut: async () => {
                    setUser(userInitialState); // Reset user state on sign-out.
                    await signOut(auth); // Perform Firebase sign-out.
                    router.replace("/(auth)/screens/Welcome"); // Redirect to welcome screen.
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
