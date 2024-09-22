// AppointmentModal.tsx
import React, { useLayoutEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import AppointmentDetails from "@/app/components/appointment/components/AppointmentDetails";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

import Colors from "@/constants/styles/Colors";
import { ModalProps } from "../types";
import dummyAppointmentData from "@/dummy/dummyAppointmentData.json";
import { useNavigation } from "expo-router";

const AppointmentEachHourListScreen = ({ visible, onClose }: ModalProps) => {
    const navigation = useNavigation();

    // hide the header when this screen is rendered
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const colorScheme = useColorScheme();

    const [appointmentDetails, setAppointmentDetails] =
        useState(dummyAppointmentData);

    const handleDeleteAppointment = (id: string) => {
        const updatedData = appointmentDetails.filter((item) => item.id !== id);
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
            <View
                style={[
                    styles.content,
                    {
                        backgroundColor:
                            Colors[colorScheme ?? "light"].background,
                    },
                ]}
            >
                <View>
                    <Pressable
                        // onPress={onClose}
                        onPress={() => navigation.goBack()}
                        style={{
                            left: wp("42.5%"),
                            top: hp("1%"),
                            marginBottom: hp("1%"),
                        }}
                    >
                        <AntDesign
                            name="close"
                            size={28}
                            color={Colors[colorScheme ?? "light"].text}
                            style={{ marginRight: 10 }}
                        />
                    </Pressable>
                </View>

                <View style={{ marginBottom: hp("5%") }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: Colors[colorScheme ?? "light"].text,
                        }}
                    >
                        List of Appointments
                    </Text>
                </View>

                <View style={{ paddingBottom: hp("15%") }}>
                    <FlatList
                        data={appointmentDetails}
                        keyExtractor={(item) => item.id.toString()}
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
