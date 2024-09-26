import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, Tabs } from "expo-router";
import { Pressable, View } from "react-native";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "@/constants/styles/Colors";
import { useColorScheme } from "@/constants/styles/useColorScheme";
import { useClientOnlyValue } from "@/app/(authenticated)/utils/useClientOnlyValue";
import PlusButton from "./plusButton";
import SearchModal from "@/app/(authenticated)/components/search/screens/SearchModal";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof AntDesign>["name"];
    color: string;
}) {
    return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    const [date, setDate] = useState(new Date());
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const [showSearch, setShowSearch] = useState(false);

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

                        headerLeft: () => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingHorizontal: 10,
                                }}
                            >
                                <DateTimePicker
                                    value={date}
                                    mode={"date"}
                                    onChange={onChangeDate}
                                    style={{ left: -wp("2%") }}
                                />
                            </View>
                        ),

                        headerRight: () => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingHorizontal: 10,
                                }}
                            >
                                {/* search button */}
                                <Pressable
                                    onPress={() => {
                                        setShowSearch(!showSearch);
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

                                <SearchModal
                                    visible={showSearch}
                                    onClose={() => setShowSearch(false)}
                                />
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
                                    router.push(
                                        "/(authenticated)/CreateAppointmentModal"
                                    );
                                }}
                            />
                        ),
                    }}
                />

                {/* menu tab */}
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
