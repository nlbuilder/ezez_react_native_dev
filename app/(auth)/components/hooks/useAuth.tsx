// import * as React from "react";
// import { ContextInterface } from "../../types/types";
// import { AuthContext } from "../context/authContext";

// // This hook can be used to access the user info.
// export function useAuth(): ContextInterface {
//     const context = React.useContext<ContextInterface>(AuthContext);

//     if (context === undefined) {
//         throw new Error("useAuth must be used within a Provider");
//     }

//     return context;
// }

import * as React from "react";
import { AuthContext } from "../context/authContext";
import { auth } from "@/firebase/firebaseConfig";
import { ContextInterface } from "../../types/types";

export function useAuth(): ContextInterface {
    const context = React.useContext<ContextInterface>(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a Provider");
    }

    // Refresh token at regular intervals
    React.useEffect(() => {
        const refreshToken = async () => {
            try {
                const newToken = await auth.currentUser?.getIdToken(true); // Refresh

                if (newToken) {
                    if (context.user) {
                        context.user.IdToken = newToken; // Update token in context
                    }
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
            }
        };

        const intervalId = setInterval(refreshToken, 45 * 60 * 1000); // Refresh every 45 minutes

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    return context;
}
