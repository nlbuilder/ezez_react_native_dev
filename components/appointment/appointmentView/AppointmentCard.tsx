import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import Animated, {
    clamp,
    Easing,
    runOnJS,
    useAnimatedReaction,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import React, { useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import AppointmentDetails from "@/components/appointment/appointmentView/AppointmentDetails";
import { AppointmentCardProps } from "../types";
import AppointmentCardBody from "./AppointmentCardBody";
import AppointmentModal from "@/app/appointment/AppointmentModal";

const AppointmentCard = ({
    index,
    scrollY,
    activeCardIndex,
}: AppointmentCardProps) => {
    const [cardHeight, setCardHeight] = useState(0);
    const { height: screenHeight } = useWindowDimensions();
    const [modalVisible, setModalVisible] = useState(false);

    // def a stackRate variable to control how much one card is stacked on top of the other
    // (e.g., if stackRate = 1 => the ontop card fully covers the below cards)
    const stackRate = 0.72;

    // def a putDownDistanceRate variable to control how far the non-active cards (i.e., unselected cards)
    //  are moved to the bottom when one card is active (i.e., selected)
    const putDownDistanceRate = 0.9; // I found this is the optimal value for my case

    // def a stackRateBottom variable to control how much a non-active card is stacked on top of the other
    // this stacking happens at the bottom of the screen not the stack at the top mentioned above
    const stackRateBottom = 0.95;

    const translateY = useSharedValue(0);

    const displayAppointmentDetails = useSharedValue<"none" | "flex">("none");

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

    // use an animated reaction to handle the active card
    useAnimatedReaction(
        () => activeCardIndex.value,
        (current, previous) => {
            if (current === previous) {
                return;
            }
            if (activeCardIndex.value === null) {
                // No card selected, move to list view
                translateY.value = withTiming(
                    clamp(-scrollY.value, -index * cardHeight * stackRate, 0)
                );

                displayAppointmentDetails.value = "none";
            } else if (activeCardIndex.value === index) {
                // This card becomes active, show it on top
                translateY.value = withTiming(-index * cardHeight, {
                    easing: Easing.out(Easing.quad),
                    duration: 500,
                });

                displayAppointmentDetails.value = "flex";
            } else {
                // if one card is active, move the rest to the bottom
                translateY.value = withTiming(
                    // the computation below controls how far the non-active cards are moved to the bottom
                    -index * cardHeight * stackRateBottom +
                        screenHeight * putDownDistanceRate,
                    {
                        easing: Easing.out(Easing.quad),
                        duration: 500,
                    }
                );

                displayAppointmentDetails.value = "none";
            }
        }
    );

    // def an animated style to control the display of the appointment details
    const appointmentDetailsStyle = useAnimatedStyle(() => {
        return {
            display: displayAppointmentDetails.value,
        };
    });

    // useDerivedValue is used to calculate the translateY value
    // and then use the translateY value to handle the scrolling naturally
    // const translateY = useDerivedValue(() =>
    //     clamp(-scrollY.value, -index * cardHeight * 0.75, 0)
    // );

    // def a tap gesture to activate a card
    // (i.e., the card that is tapped and becomes active)
    const tap = Gesture.Tap().onEnd(() => {
        if (activeCardIndex.value === null) {
            activeCardIndex.value = index;
            console.log("activeCardIndex.value: ", activeCardIndex.value);
        } else {
            activeCardIndex.value = null;
            // runOnJS(setModalVisible)(!modalVisible);
        }
    });

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

    const dummyData = [
        {
            date: "2022-12-31",
            time: "10:00 AM",
            numberOfCustomers: 10,
            serviceTitle: "Service123456",
            customerPhoneNumber: "1234567890",
            note: "",
        },
        {
            date: "2022-12-31",
            time: "11:00",
            numberOfCustomers: 1,
            serviceTitle: "Service2",
            customerPhoneNumber: "1234567890",
            note: "Note",
        },
        {
            date: "2022-12-31",
            time: "12:00",
            numberOfCustomers: 1,
            serviceTitle: "Service3",
            customerPhoneNumber: "1234567890",
            note: "Note",
        },
        {
            date: "2022-12-31",
            time: "14:00",
            numberOfCustomers: 1,
            serviceTitle: "Service4",
            customerPhoneNumber: "1234567890",
            note: "Note",
        },
    ];

    return (
        // <Pressable onPress={() => setModalVisible(!modalVisible)}>
        //     <AppointmentModal
        //         visible={modalVisible}
        //         onClose={() => setModalVisible(false)}
        //     />

        <GestureDetector gesture={tap}>
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
                                    {totalAppointment} / {totalCapacity}
                                </Text>
                                <Text style={styles.lightText}>
                                    appointments / capacity
                                </Text>
                            </View>
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

                    {/* show details of a selected hour (i.e., the card is active */}
                    {/* <Animated.View
                        style={[
                            styles.appointmentDetails,
                            appointmentDetailsStyle,
                        ]}
                    >
                        <FlatList
                            data={dummyData}
                            keyExtractor={(item, index) => index.toString()} // add keyExtractor
                            renderItem={({ item }) => (
                                <AppointmentDetails
                                    time={item.time}
                                    note={item.note}
                                    serviceTitle={item.serviceTitle}
                                    numberOfCustomers={item.numberOfCustomers}
                                    customerPhoneNumber={
                                        item.customerPhoneNumber
                                    }
                                />
                            )}
                        />
                    </Animated.View> */}
                </Animated.View>
            </View>
        </GestureDetector>

        // </Pressable>
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

        borderRadius: hp("2.5%"),
        height: hp("4.5%"),
        borderWidth: 1,
        margin: 2,
        borderColor: "rgba(0, 0, 0, .25)",
    },
    title: {
        paddingHorizontal: hp("2.5%"),
        fontSize: 16,
        fontWeight: "500",
    },
    lightText: {
        color: "rgba(0, 0, 0, .25)",
    },
    appointmentCapacityView: {
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: hp("2%"),
    },
    appointmentDetails: {
        position: "absolute", // absolutely position the details under the card
        top: hp("25%"),
        width: "100%",
    },
});
