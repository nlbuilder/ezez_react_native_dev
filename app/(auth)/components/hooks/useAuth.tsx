import * as React from "react";
import { ContextInterface } from "../../types/types";
import { AuthContext } from "../context/authContext";

// This hook can be used to access the user info.
export function useAuth(): ContextInterface {
    const context = React.useContext<ContextInterface>(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within a Provider");
    }

    return context;
}
