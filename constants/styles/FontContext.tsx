// FontContext.tsx
import React, { createContext, useContext } from "react";
import { TextStyle } from "react-native";

const FontContext = createContext<TextStyle>({ fontFamily: "Calibri" });

import { ReactNode } from "react";

export const FontProvider = ({ children }: { children: ReactNode }) => {
    return (
        <FontContext.Provider value={{ fontFamily: "Calibri" }}>
            {children}
        </FontContext.Provider>
    );
};

export const useFont = () => useContext(FontContext);
