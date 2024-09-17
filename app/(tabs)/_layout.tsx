import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, Tabs } from "expo-router";
import { Pressable, View, Text } from "react-native";

import Colors from "@/constants/styles/Colors";
import { useColorScheme } from "@/components/utils/useColorScheme";
import { useClientOnlyValue } from "@/components/utils/useClientOnlyValue";
import { heightPercentageToDP } from "react-native-responsive-screen";
import PlusButton from "./plusButton";

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
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

                    // Disable the static render of the header on web
                    // to prevent a hydration error in React Navigation v6.
                    headerShown: useClientOnlyValue(false, true),
                    tabBarShowLabel: true,
                }}
            >
                {/* home tab */}
                <Tabs.Screen
                    name="index" // set the appointment list as the default screen
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color }) => (
                            <TabBarIcon name="home" color={color} />
                        ),
                        headerTitle: "", // hide the header title
                        headerTransparent: true, // make the header transparent

                        headerRight: () => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingHorizontal: 10,
                                }}
                            >
                                <View style={{ paddingRight: 5 }}>
                                    {/* search button */}
                                    <Pressable
                                        onPress={() => {
                                            console.log("button 1 pressed");
                                        }}
                                    >
                                        <AntDesign
                                            name="calendar"
                                            size={28}
                                            color={
                                                Colors[colorScheme ?? "light"]
                                                    .tint
                                            }
                                            style={{ marginRight: 10 }}
                                        />
                                    </Pressable>
                                </View>

                                {/* calendar button */}
                                <Pressable
                                    onPress={() => {
                                        console.log("button 2 pressed");
                                    }}
                                >
                                    <AntDesign
                                        name="search1"
                                        size={28}
                                        color={
                                            Colors[colorScheme ?? "light"].tint
                                        }
                                        style={{ marginRight: 10 }}
                                    />
                                </Pressable>
                            </View>
                        ),
                    }}
                />

                {/* create appointment button */}
                <Tabs.Screen
                    name="plusButton"
                    options={{
                        title: "",
                        tabBarButton: () => (
                            <PlusButton
                                onPress={() => {
                                    console.log("Center button A pressed");
                                }}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="settings"
                    options={{
                        title: "Settings",
                        tabBarIcon: ({ color }) => (
                            <TabBarIcon name="weibo-circle" color={color} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
