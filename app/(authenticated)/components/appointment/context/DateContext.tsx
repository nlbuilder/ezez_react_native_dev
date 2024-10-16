import React, { createContext, useState, useContext } from "react";

// Create a context for the date
const DateContext = createContext<{
    date: Date;
    setDate: (newDate: Date) => void;
}>({
    date: new Date(),
    setDate: () => {},
});

// Export a custom hook to access the context
export const useDate = () => useContext(DateContext);

// DateProvider component to wrap the navigation and provide date context
export const DateProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [date, setDate] = useState(new Date());

    return (
        <DateContext.Provider value={{ date, setDate }}>
            {children}
        </DateContext.Provider>
    );
};
