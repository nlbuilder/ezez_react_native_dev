// import React, { createContext, useState, useContext } from "react";

// const ToastContext = createContext<{
//     message: string | null;
//     showToast: (newMessage: string) => void;
//     clearToast: () => void;
// } | null>(null);

// export const useToast = () => useContext(ToastContext);

// import { ReactNode } from "react";

// export const ToastProvider = ({ children }: { children: ReactNode }) => {
//     const [message, setMessage] = useState<string | null>(null);

//     const showToast = (newMessage: string) => {
//         setMessage(newMessage);
//     };

//     const clearToast = () => {
//         setMessage(null);
//     };

//     return (
//         <ToastContext.Provider value={{ message, showToast, clearToast }}>
//             {children}
//         </ToastContext.Provider>
//     );
// };

import React, { createContext, useState, useContext, ReactNode } from "react";

// define the type of the context
interface ToastContextType {
    message: string | null;
    showToast: (newMessage: string) => void;
    clearToast: () => void;
}

// provide a default value for the context
const ToastContext = createContext<ToastContextType>({
    message: null,
    showToast: () => {},
    clearToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState<string | null>(null);

    const showToast = (newMessage: string) => {
        setMessage(newMessage);
    };

    const clearToast = () => {
        setMessage(null);
    };

    return (
        <ToastContext.Provider value={{ message, showToast, clearToast }}>
            {children}
        </ToastContext.Provider>
    );
};
