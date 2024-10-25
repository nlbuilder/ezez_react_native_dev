import { AuthProvider } from "@/app/(auth)/components/context/authContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme, Text } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

import { FontProvider } from "@/constants/styles/FontContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "./(authenticated)/utils/toasts/toastContext";
import { DateProvider } from "./(authenticated)/components/appointment/context/DateContext";
import { auth } from "@/firebase/firebaseConfig";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "auth",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// define the root layout
export default function RootLayout() {
    const [loaded, error] = useFonts({
        Calibri: require("../assets/fonts/calibri.ttf"),
        FuzzyBubbles: require("../assets/fonts/Fuzzy Bubbles Regular.ttf"),
        TimesRegular: require("../assets/fonts/Times Regular.ttf"),
        ...FontAwesome.font,
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

// add queryClientProvider
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    // // arrangement of local authentication
    // const [unlocked, setUnlocked] = useState(false);

    // useEffect(() => {
    //     const authenticateUser = async () => {
    //         const hasHardware = await LocalAuthentication.hasHardwareAsync();
    //         const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    //         if (!hasHardware || !isEnrolled) {
    //             console.log(
    //                 "Biometric authentication not available or configured."
    //             );
    //             setUnlocked(true); // Proceed without Face ID if unavailable
    //             return;
    //         }

    //         const result = await LocalAuthentication.authenticateAsync({
    //             promptMessage: "Unlock with Face ID",
    //             fallbackLabel: "Enter Password", // Optional fallback
    //         });

    //         if (result.success) {
    //             setUnlocked(true);
    //         } else {
    //             console.log("Authentication failed or canceled");
    //             setUnlocked(false);
    //         }
    //     };

    //     authenticateUser();
    // }, []);

    // if (!unlocked) {
    //     return <Text>something</Text>;
    // }

    return (
        <>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <FontProvider>
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>
                            <ToastProvider>
                                <DateProvider>
                                    <Slot />
                                </DateProvider>
                            </ToastProvider>
                        </AuthProvider>
                    </QueryClientProvider>
                </FontProvider>
            </ThemeProvider>
        </>
    );
}
