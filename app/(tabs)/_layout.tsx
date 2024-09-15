import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, Tabs } from "expo-router";
import { Pressable, View } from "react-native";

import Colors from "@/constants/styles/Colors";
import { useColorScheme } from "@/components/utils/useColorScheme";
import { useClientOnlyValue } from "@/components/utils/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof AntDesign>["name"];
    color: string;
}) {
    return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
                tabBarShowLabel: true,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Appointment",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="calendar" color={color} />
                    ),
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="settings/BusinessProfile"
                options={{
                    title: "Business Profile",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="codepen" color={color} />
                    ),

                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
