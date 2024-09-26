import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
    clamp,
    useAnimatedReaction,
    useSharedValue,
} from "react-native-reanimated";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState } from "react";

import { AppointmentCardProps } from "../types";
import AppointmentCardBody from "./AppointmentCardBody";
import AppointmentEachHourListModal from "@/app/components/appointment/screens/AppointmentEachHourListModal";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";

const AppointmentCard = ({ index, scrollY }: AppointmentCardProps) => {
    const [cardHeight, setCardHeight] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    // def a stackRate variable to control how much one card is stacked on top of the other
    // (e.g., if stackRate = 1 => the ontop card fully covers the below cards)
    const stackRate = 0.72;

    const translateY = useSharedValue(0);

    // use an animated reaction to handle the scrolling (i.e., the stack of cards)
    useAnimatedReaction(
        () => scrollY.value,
        (current) => {
            translateY.value = clamp(
                -current,
                -index * cardHeight * stackRate,
                0
            );
        }
    );

    // declare business logic variables
    const totalAppointment = 5;
    const totalCapacity = 10;
    const listOfAppointmentSum = [
        { service: "Service1", customers: 10 },
        { service: "Service2", customers: 20 },
        { service: "Service3", customers: 20 },
        { service: "Service4", customers: 20 },
        { service: "Service5", customers: 20 },
    ];

    return (
        <View style={styles.container}>
            <Animated.View
                onLayout={(event) =>
                    setCardHeight(event.nativeEvent.layout.height)
                }
                style={[
                    {
                        transform: [
                            {
                                // use translateY to handle scrolling up and down naturally
                                translateY: translateY,
                            },
                        ],
                    },
                ]}
            >
                <View style={styles.appointmentCard}>
                    {/* header of the appointment card */}
                    <View style={[styles.appointmentCardHeader]}>
                        <Text style={styles.title}>{index + 10}:00</Text>
                        <View style={styles.appointmentCapacityView}>
                            <Text style={styles.title}>
                                {totalAppointment}/{totalCapacity}
                            </Text>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.lightText}>customer</Text>
                                <View style={styles.divider} />
                                <Text style={styles.lightText}>capacity</Text>
                            </View>
                        </View>

                        {/* show appointment details */}

                        <Pressable
                            onPress={() => {
                                // setModalVisible(!modalVisible);
                                router.navigate(
                                    "/components/appointment/screens/AppointmentEachHourListScreen"
                                );
                            }}
                        >
                            <AntDesign
                                name="infocirlce"
                                size={26}
                                color={"grey"}
                                style={{ marginRight: wp("2.5%") }}
                            />
                        </Pressable>
                    </View>

                    {/* body of the appointment card */}
                    <View style={{ marginVertical: "auto" }}>
                        <FlatList
                            data={listOfAppointmentSum}
                            renderItem={({ item }) => (
                                <AppointmentCardBody
                                    serviceTitle={item.service}
                                    numberOfCustomers={item.customers}
                                />
                            )}
                            keyExtractor={(item) => item.service}
                            numColumns={2} // display the services in two columns
                            columnWrapperStyle={{
                                justifyContent: "space-between",
                            }}
                            scrollEnabled={false} // disable the scroll of the FlatList
                        />
                    </View>
                </View>

                {/* show the list of appointment details for each hour */}
                {/* <AppointmentEachHourListModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                /> */}
            </Animated.View>
        </View>
    );
};

export default AppointmentCard;

const styles = StyleSheet.create({
    container: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

        // center the card horizontally
        alignItems: "center",
    },
    appointmentCard: {
        backgroundColor: "rgba(246,255,255, 1)",
        borderRadius: hp("2.5%"),
        height: hp("20%"),
        width: wp("96%"),
        marginVertical: 5,
    },
    appointmentCardHeader: {
        // center the text horizontally
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        borderRadius: hp("2.5%"),
        height: hp("4.5%"),
        borderWidth: 1,
        margin: 2.5,
        borderColor: "rgba(0, 0, 0, .25)",
    },
    title: {
        paddingHorizontal: hp("2.5%"),
        fontSize: 16,
        fontWeight: "500",
    },
    lightText: {
        fontSize: 12,
        color: "rgba(0, 0, 0, .20)",
    },
    appointmentCapacityView: {
        flexDirection: "row",
        alignItems: "center",

        paddingRight: wp("10%"),
    },
    divider: {
        height: 0.2,
        backgroundColor: "rgba(0, 0, 0, .20)",
        width: 50,
    },
    appointmentDetails: {
        position: "absolute", // absolutely position the details under the card
        top: hp("25%"),
        width: "100%",
    },
});
