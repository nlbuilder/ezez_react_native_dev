import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useColorScheme } from "@/constants/styles/useColorScheme";
import { Pressable, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/styles/Colors";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    const [date, setDate] = useState(new Date());
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />

                    {/* create a new appointment modal screen */}
                    <Stack.Screen
                        name="CreateAppointmentModal"
                        options={{
                            presentation: "modal",
                            title: "",

                            headerLeft: () => (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        left: wp("2%"),
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <DateTimePicker
                                            value={date}
                                            mode={"date"}
                                            onChange={onChangeDate}
                                        />

                                        <DateTimePicker
                                            value={date}
                                            mode={"time"}
                                            onChange={onChangeDate}
                                            minuteInterval={15}
                                        />
                                    </View>
                                </View>
                            ),

                            headerRight: () => (
                                <View>
                                    <Pressable
                                        onPress={() => {
                                            console.log(
                                                "Search button pressed"
                                            );
                                            router.dismiss();
                                        }}
                                    >
                                        <View
                                            style={{
                                                marginLeft: wp("22%"),
                                            }}
                                        >
                                            <AntDesign
                                                name="close"
                                                size={28}
                                                color={
                                                    Colors[
                                                        colorScheme ?? "light"
                                                    ].text
                                                }
                                                style={{ marginRight: 10 }}
                                            />
                                        </View>
                                    </Pressable>
                                </View>
                            ),
                        }}
                    />
                </Stack>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
