import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import Animated, {
    clamp,
    useAnimatedReaction,
    useSharedValue,
} from "react-native-reanimated";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { AppointmentCardProps } from "../types/types";
import AppointmentCardBody from "./AppointmentCardBody";
import Colors from "@/constants/styles/Colors";

const AppointmentCard = ({
    index,
    scrollY,
    time,
    sumOfCustomerByTime,
    sumOfCustomerByTimeAndService,
    totalCapacity,
}: AppointmentCardProps) => {
    const colorScheme = useColorScheme();

    // code to handle the animation of the card
    const [cardHeight, setCardHeight] = useState(0);

    // def a stackRate variable to control how much one card is stacked on top of the other
    // (e.g., if stackRate = 1 => the ontop card fully covers the below card)
    const stackRate = 0.7;

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

    const listOfAppointmentSum = sumOfCustomerByTimeAndService;
    // console.log("listOfAppointmentSum: ", listOfAppointmentSum);

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
                <View
                    style={[
                        styles.appointmentCard,
                        {
                            backgroundColor:
                                Colors[colorScheme ?? "light"].background,
                        },
                    ]}
                >
                    {/* header of the appointment card */}
                    <View
                        style={[
                            styles.appointmentCardHeader,
                            {
                                borderColor:
                                    Colors[colorScheme ?? "light"].separator,
                            },
                        ]}
                    >
                        <Text style={styles.title}>{time}</Text>
                        <View style={styles.appointmentCapacityView}>
                            <Text style={styles.title}>
                                {sumOfCustomerByTime}
                                {/* /{totalCapacity} */}
                            </Text>

                            <View style={{ alignItems: "center" }}>
                                {/* <Text style={[
                                        styles.lightText,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].lightText,
                                        },
                                    ]}>customer</Text> */}
                                <Text
                                    style={[
                                        styles.lightText,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].lightText,
                                        },
                                    ]}
                                >
                                    total
                                </Text>

                                {/* a divider */}
                                {/* <View
                                    style={[
                                        styles.divider,
                                        {
                                            backgroundColor:
                                                Colors[colorScheme ?? "light"]
                                                    .separator,
                                        },
                                    ]}
                                /> */}

                                <Text
                                    style={[
                                        styles.lightText,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].lightText,
                                        },
                                    ]}
                                >
                                    customers
                                </Text>
                                {/* <Text style={[
                                        styles.lightText,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].lightText,
                                        },
                                    ]}>capacity</Text> */}
                            </View>
                        </View>

                        {/* show appointment details */}
                        <Pressable
                            onPress={() => {
                                // setModalVisible(!modalVisible);
                                router.push({
                                    pathname:
                                        "./components/appointment/screens/AppointmentEachHourListScreen",
                                    params: {
                                        time: time,
                                    },
                                });
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
                    <View style={{ paddingVertical: "auto" }}>
                        <FlatList
                            data={listOfAppointmentSum}
                            renderItem={({ item }) => (
                                <AppointmentCardBody
                                    serviceTitle={item.serviceName}
                                    numberOfCustomers={item.customers}
                                />
                            )}
                            keyExtractor={(item) => item.serviceName}
                            numColumns={2} // display the services in two columns
                            columnWrapperStyle={{
                                justifyContent: "space-between",
                            }}
                            scrollEnabled={false} // disable the scroll of the FlatList
                        />
                    </View>
                </View>
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
        borderRadius: hp("2.5%"),
        // paddingBottom: hp("2%"),
        // move the card down a bit, to separate the top card from the Date Picker
        top: hp("1%"),
        height: hp("20%"),
        width: wp("96%"),
    },
    appointmentCardHeader: {
        // center the text horizontally
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        borderRadius: hp("2.5%"),
        height: hp("5.5%"),
        borderWidth: 1,
        margin: 2.5,
    },
    title: {
        paddingHorizontal: hp("2.5%"),
        fontSize: 16,
        fontWeight: "500",
    },
    lightText: {
        fontSize: 12,
    },
    appointmentCapacityView: {
        flexDirection: "row",
        alignItems: "center",

        paddingRight: wp("10%"),
    },
    divider: {
        height: 0.2,
        width: 50,
    },
});
