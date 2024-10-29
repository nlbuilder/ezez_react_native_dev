import {
    ActivityIndicator,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
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
    generateTimeList,
    filterAppointmentsByDate,
    formatDateToString,
    groupCustomersByTimeAndService,
    groupCustomersByTime,
    transformData,
} from "../utils/utils";
import { useGetAllAppointmentsAPI } from "../components/appointment/apis/getAllAppointmentsInfoAPI";
import { useDate } from "../components/appointment/context/DateContext";
// import dummyServiceData from "@/dummy/dummyServiceData.json";
import { useGetBusinessHourAPI } from "../components/profile/apis/getBusinessHourAPI";
import { useGetAllServicesAPI } from "../components/profile/apis/getAllServicesAPI";

const AppointmentCardList = () => {
    // *** code to handle the animation for the list of cards ***

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
    // get the businessHour info
    const { businessHourInfo, refetch: refetchBusinessHourInfo } =
        useGetBusinessHourAPI();

    const startTime =
        (Array.isArray(businessHourInfo) && businessHourInfo[0]?.startTime) ||
        "10:00 AM";
    const finishTime =
        (Array.isArray(businessHourInfo) && businessHourInfo[0]?.finishTime) ||
        "7:00 PM";

    const timeList = generateTimeList(startTime, finishTime);

    // this is the code to handle the date from DateTimePicker
    // it provides the date to use in the filtering appointments by date
    const { date, setDate } = useDate();

    const dateString = formatDateToString(date.toISOString());

    const {
        allAppointmentInfo,
        isLoading: isGetAllAppointmentsInfoLoading,
        refetch: refetchAllAppointmentsInfo,
    } = useGetAllAppointmentsAPI();

    // make sure allAppointmentInfo is an array
    const allAppointmentsArray = Array.isArray(allAppointmentInfo)
        ? allAppointmentInfo
        : [];

    // filter the appointments by date
    const filteredAppointmentsByDate = filterAppointmentsByDate(
        allAppointmentsArray,
        dateString
    );

    // group the customers by rounded time (this function returns an object)
    const sumOfCustomerByTime = groupCustomersByTime(
        timeList,
        filteredAppointmentsByDate
    );

    // this is to convert the object to an array
    // so that it can be used in the AppointmentCard component properly
    const sumOfCustomerByTimeArray = sumOfCustomerByTime.map(
        (item) => item.totalCustomers
    );

    const { allServicesInfo } = useGetAllServicesAPI();

    // console.log("allServicesInfo", allServicesInfo);

    // const serviceList = dummyServiceData.map((item) => item.label);
    // console.log("serviceList", serviceList);

    const serviceList = Array.isArray(allServicesInfo)
        ? allServicesInfo.map((item) => ({
              label: item.serviceName,
              value: item.serviceName,
          })) || []
        : [];

    const serviceListArray = serviceList.map((item) => item.label);

    // this is to group the customers by time and service
    const sumOfCustomerByTimeAndService = groupCustomersByTimeAndService(
        filteredAppointmentsByDate,
        timeList,
        serviceListArray
    );

    const transformedSumOfCustomerByTimeAndService = transformData(
        sumOfCustomerByTimeAndService
    );

    useEffect(() => {
        refetchAllAppointmentsInfo();
        refetchBusinessHourInfo();
    }, [
        allAppointmentInfo,
        date,
        sumOfCustomerByTimeArray,
        transformedSumOfCustomerByTimeAndService,
        startTime,
        finishTime,
        timeList,
    ]);

    if (isGetAllAppointmentsInfoLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="small" color="grey" />
            </View>
        );
    }

    return (
        <GestureDetector gesture={pan}>
            <View
                style={styles.container}
                onLayout={(event) =>
                    setListHeight(event.nativeEvent.layout.height)
                }
            >
                {timeList.map((time, index) => (
                    <AppointmentCard
                        key={time}
                        index={index}
                        scrollY={scrollY}
                        time={timeList[index]}
                        sumOfCustomerByTime={sumOfCustomerByTimeArray[index]}
                        sumOfCustomerByTimeAndService={
                            transformedSumOfCustomerByTimeAndService[index]
                        }
                        totalCapacity={10}
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
