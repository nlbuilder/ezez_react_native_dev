// AppointmentModal.tsx
import React, { useLayoutEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { FlatList, Pressable, StyleSheet, useColorScheme } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

import { Text, View } from "@/constants/styles/Themed";
import AppointmentDetails from "@/app/(authenticated)/components/appointment/components/AppointmentDetails";
import Colors from "@/constants/styles/Colors";
import { ModalProps } from "../types/types";
import dummyAppointmentDataByDate from "@/dummy/dummyAppointmentDataByDate.json";
import dummyAppointmentDataByDateByTime from "@/dummy/dummyAppointmentDataByDateByRoundedTime.json";
import { filterAppointmentsByRoundedTime } from "@/app/(authenticated)/utils/utils";

const AppointmentEachHourListScreen = ({ visible, onClose }: ModalProps) => {
    const navigation = useNavigation();

    // hide the header when this screen is rendered
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const colorScheme = useColorScheme();

    const [appointmentDetails, setAppointmentDetails] = useState(
        dummyAppointmentDataByDate
    );

    // console.log(appointmentDetails);
    const A = filterAppointmentsByRoundedTime(
        dummyAppointmentDataByDateByTime,
        "20:00:00"
    );

    // console.log(A);

    const handleDeleteAppointment = (id: string) => {
        const updatedData = appointmentDetails.filter(
            (item) => item.appointmentId !== id
        );
        setAppointmentDetails(updatedData);
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor:
                        Colors[colorScheme ?? "light"].tabIconDefault,
                },
            ]}
        >
            {/* Header */}
            <View
                style={[
                    styles.content,
                    {
                        backgroundColor:
                            Colors[colorScheme ?? "light"].background,
                    },
                ]}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: hp("2%"),
                    }}
                >
                    {/* Title */}
                    <View style={{}}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "500",
                                color: Colors[colorScheme ?? "light"].text,
                                left: wp("4%"),
                            }}
                        >
                            List of Appointments
                        </Text>
                    </View>

                    {/* close button */}
                    <View style={{ left: wp("20.5%") }}>
                        <Pressable
                            onPress={() => {
                                router.back();
                            }}
                        >
                            <AntDesign
                                name="close"
                                size={28}
                                color={Colors[colorScheme ?? "light"].text}
                            />
                        </Pressable>
                    </View>
                </View>

                {/* Separator line */}
                <View
                    style={{
                        borderColor:
                            Colors[colorScheme ?? "light"].tabIconDefault,
                        borderWidth: 0.5,
                        width: wp("96%"),
                        marginTop: hp("1.8%"),
                        marginBottom: hp("5%"),
                    }}
                ></View>

                {/* FlastList of details information for each appointment */}
                <View style={{ paddingBottom: hp("15%") }}>
                    <FlatList
                        data={A}
                        keyExtractor={(item) => item.appointmentId.toString()}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        renderItem={({ item }) => (
                            <AppointmentDetails
                                appointmentDetails={item}
                                onDelete={handleDeleteAppointment}
                            />
                        )}
                    />
                </View>
            </View>
        </View>
    );
};

export default AppointmentEachHourListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        borderRadius: 20,
        width: wp("99%"),
        height: hp("95%"),
        top: hp("2.5%"),
        alignItems: "center",
    },
});
