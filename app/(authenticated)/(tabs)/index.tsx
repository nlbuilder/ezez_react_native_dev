import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
    cancelAnimation,
    clamp,
    useSharedValue,
    withDecay,
    withClamp,
} from "react-native-reanimated";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AppointmentCard from "@/app/(authenticated)/components/appointment/components/AppointmentCard";
import {
    calculateOpenHours,
    filterAppointmentsByDate,
    formatDateToString,
    groupByRoundedTimeAndService,
    groupCustomersByRoundedTime,
} from "../utils/utils";
import { useGetAllAppointmentsAPI } from "../components/appointment/apis/getAllAppointmentsInfoAPI";
import { useDate } from "../components/appointment/context/DateContext";

const AppointmentCardList = () => {
    // code to handle the animation for the list of cards
    const [listHeight, setListHeight] = useState(0);
    const { height: screenHeight } = useWindowDimensions();

    const scrollY = useSharedValue(0);
    // use maxScrollY to define the maximum amount of scrollY
    // (i.e., the largest distance the card can be scrolled up or down)
    // (e.g., const maxScrollY = listHeight - screenHeight + 160)
    const maxScrollY = 2 * listHeight - screenHeight; // I found this is the optimal value for my case

    const pan = Gesture.Pan()
        .onBegin(() => {
            cancelAnimation(scrollY);
        })
        .onChange((event) => {
            // define changeY is the amount of change in the Y direction
            scrollY.value = clamp(scrollY.value - event.changeY, 0, maxScrollY);
        })
        .onEnd((event) => {
            // use withDecay here to create a smooth transition
            // when the user lifts their finger (i.e., slows down and stops)
            scrollY.value = withClamp(
                { min: 0, max: maxScrollY },
                withDecay({ velocity: -event.velocityY })
            );
        });

    //  *** code to handle the functionality of the list of cards as below ***

    // code to compute the length of hours between the start and finish time
    //(i.e., the number of hours the business is open)
    // define the start and finish time of the business
    const timeStart = "2024-10-15T12:30:00.000Z";
    const timeFinish = "2024-10-15T21:30:00.000Z";

    const {
        lengthOfHoursBetween,
        timeStartFormatted,
        timeFinishFormatted,
        timeList,
    } = calculateOpenHours(timeStart, timeFinish);

    // const appointmentCards = Array.from({ length: 10 }, (_, index) => index);
    const appointmentCards = Array.from(
        { length: lengthOfHoursBetween + 1 },
        (_, index) => index
    );

    const { date, setDate } = useDate();
    const dateString = formatDateToString(date.toISOString());

    const {
        allAppointmentInfo,
        isLoading: isGetAllAppointmentsInfoLoading,
        refetch: refetchAllAppointmentsInfo,
    } = useGetAllAppointmentsAPI();

    const allAppointmentsArray = Array.isArray(allAppointmentInfo)
        ? allAppointmentInfo
        : [];

    const filteredAppointmentsByDate = filterAppointmentsByDate(
        allAppointmentsArray,
        dateString
    );

    // console.log(filteredAppointmentsByDate);
    // console.log(timeList);

    const sumOfCustomerByRoundedTimeObject = groupCustomersByRoundedTime(
        filteredAppointmentsByDate
    );

    const sumOfCustomerByRoundedTimeList = Object.values(
        sumOfCustomerByRoundedTimeObject
    );

    const listOfCustomerSumByService = groupByRoundedTimeAndService(
        filteredAppointmentsByDate
    );

    // console.log(listOfCustomerSumByService);

    useEffect(() => {
        refetchAllAppointmentsInfo();
    }, [allAppointmentInfo, date]);

    return (
        <GestureDetector gesture={pan}>
            <View
                style={styles.container}
                onLayout={(event) =>
                    setListHeight(event.nativeEvent.layout.height)
                }
            >
                {appointmentCards.map((_, index) => (
                    <AppointmentCard
                        key={index}
                        index={index}
                        scrollY={scrollY}
                        time={timeList[index]}
                        sumOfCustomerByRoundedTime={
                            sumOfCustomerByRoundedTimeList[index]
                        }
                        listOfCustomerSumByService={
                            listOfCustomerSumByService[index]
                        }
                    />
                ))}
            </View>
        </GestureDetector>
    );
};

export default AppointmentCardList;

const styles = StyleSheet.create({
    container: {
        top: hp("10%"),
    },
});
