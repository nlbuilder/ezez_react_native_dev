// AppointmentModal.tsx
import React, { useEffect, useLayoutEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
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
import { useGetAllAppointmentsAPI } from "../apis/getAllAppointmentsInfoAPI";
import {
    calculateOpenHours,
    filterAppointmentsByDate,
    formatDateToString,
    groupCustomersByTime,
    groupCustomersByTimeAndService,
    transformData,
} from "@/app/(authenticated)/utils/utils";
import { useDate } from "../context/DateContext";
import dummyServiceData from "@/dummy/dummyServiceData.json";

const AppointmentEachHourListScreen = ({ visible, onClose }: ModalProps) => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const localParams = useLocalSearchParams();
    const roundedTime = localParams.time as string;

    // hide the header when this screen is rendered
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const timeStart = "2024-10-15T12:30:00.000Z";
    const timeFinish = "2024-10-15T21:30:00.000Z";

    const {
        lengthOfHoursBetween,
        timeStartFormatted,
        timeFinishFormatted,
        timeList,
    } = calculateOpenHours(timeStart, timeFinish);

    const {
        allAppointmentInfo,
        isLoading: isGetAllAppointmentsInfoLoading,
        refetch: refetchAllAppointmentsInfo,
    } = useGetAllAppointmentsAPI();

    // make sure allAppointmentInfo is an array
    const allAppointmentsArray = Array.isArray(allAppointmentInfo)
        ? allAppointmentInfo
        : [];

    const { date } = useDate();
    const dateString = formatDateToString(date.toISOString());

    // filter the appointments by date
    const filteredAppointmentsByDate = filterAppointmentsByDate(
        allAppointmentsArray,
        dateString
    );

    // console.log(filteredAppointmentsByDate);

    // group the customers by rounded time (this function returns an object)
    const sumOfCustomerByTime = groupCustomersByTime(
        timeList,
        filteredAppointmentsByDate
    );

    // console.log(timeList);

    // this is to convert the object to an array
    // so that it can be used in the AppointmentCard component properly
    const sumOfCustomerByTimeArray = sumOfCustomerByTime.map(
        (item) => item.totalCustomers
    );

    const serviceList = dummyServiceData.map((item) => item.label);

    // this is to group the customers by time and service
    const sumOfCustomerByTimeAndService = groupCustomersByTimeAndService(
        filteredAppointmentsByDate,
        timeList,
        serviceList
    );

    const transformedSumOfCustomerByTimeAndService = transformData(
        sumOfCustomerByTimeAndService
    );

    // useEffect(() => {
    //     refetchAllAppointmentsInfo();
    // }, [
    //     allAppointmentInfo,
    //     sumOfCustomerByTimeArray,
    //     transformedSumOfCustomerByTimeAndService,
    // ]);

    const appointmentDetails = filteredAppointmentsByDate.filter(
        (appointment) => appointment.roundedTime === roundedTime
    );

    // const [appointmentDetails, setAppointmentDetails] = useState(
    //     dummyAppointmentDataByDate
    // );

    const handleDeleteAppointment = (id: string) => {
        // const updatedData = appointmentDetails.filter(
        //     (item) => item.appointmentId !== id
        // );
        // setAppointmentDetails(updatedData);
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
                        data={appointmentDetails}
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
