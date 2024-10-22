// AppointmentModal.tsx
import React, { useEffect, useLayoutEffect } from "react";
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
    filterAppointmentsByDate,
    formatDateToString,
    generateTimeList,
    groupCustomersByTime,
    groupCustomersByTimeAndService,
    transformData,
} from "@/app/(authenticated)/utils/utils";
import { useDate } from "../context/DateContext";
import dummyServiceData from "@/dummy/dummyServiceData.json";
import { useGetBusinessHourAPI } from "../../profile/apis/getBusinessHourAPI";
import { useGetAllServicesAPI } from "../../profile/apis/getAllServicesAPI";

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

    // get the businessHour info
    const {
        businessHourInfo,
        isLoading: isGetBusinessHourLoading,
        refetch: refetchBusinessHour,
    } = useGetBusinessHourAPI();

    const startTime =
        Array.isArray(businessHourInfo) && businessHourInfo[0]?.startTime;
    const finishTime =
        Array.isArray(businessHourInfo) && businessHourInfo[0]?.finishTime;

    const timeList = generateTimeList(startTime, finishTime);

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

    const {
        allServicesInfo,
        isLoading: isGetAllServicesLoading,
        refetch: refetchGetAllServices,
    } = useGetAllServicesAPI();

    const serviceList = Array.isArray(allServicesInfo)
        ? allServicesInfo.map((item) => ({
              label: item.serviceName,
              value: item.serviceName,
          })) || []
        : [];

    const serviceListArray = serviceList.map((item) => item.label);

    // console.log("serviceList: ", serviceList);

    // console.log("serviceListArray: ", serviceListArray);

    // const serviceList = dummyServiceData.map((item) => item.label);

    // console.log("serviceList: ", serviceList);

    // this is to group the customers by time and service
    const sumOfCustomerByTimeAndService = groupCustomersByTimeAndService(
        filteredAppointmentsByDate,
        timeList,
        // serviceList
        serviceListArray
    );

    // filter the appointments by roundedTime
    // to get the appointment details for this specific roundedTime
    const appointmentDetails = filteredAppointmentsByDate.filter(
        (item) => item.roundedTime === roundedTime
    );

    // filter the sumOfCustomerByTimeAndService by roundedTime
    const filteredSumOfCustomerByTimeAndService =
        sumOfCustomerByTimeAndService.filter(
            (item) => item.roundedTime === roundedTime
        );

    // transform the data to be used in the summary section
    const transformedSumOfCustomerByTimeAndService = transformData(
        filteredSumOfCustomerByTimeAndService.flat()
    );

    // assign the transformed data to the listOfAppointmentSum
    // I did this on purpose to make the code more readable,
    // also it is easier when I need to revise the code in the future
    const listOfAppointmentSum =
        transformedSumOfCustomerByTimeAndService.flat();

    useEffect(() => {
        refetchAllAppointmentsInfo();
    }, [
        allAppointmentInfo,
        appointmentDetails,
        transformedSumOfCustomerByTimeAndService,
    ]);

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
                        marginTop: hp("2%"),
                    }}
                >
                    {/* Title */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{ right: 45, fontSize: 14, fontWeight: 400 }}
                        >
                            {roundedTime}
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "500",
                                color: Colors[colorScheme ?? "light"].text,
                                right: 10,
                            }}
                        >
                            List of Appointments
                        </Text>
                    </View>

                    {/* close button */}
                    <View style={{ left: wp("12.5%") }}>
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
                        marginBottom: hp("2.5%"),
                    }}
                ></View>

                {/* Summary of appointments */}
                <View style={styles.summaryContainer}>
                    {listOfAppointmentSum.map((item, index) => (
                        <View key={index} style={styles.summaryItem}>
                            <Text style={styles.summaryServiceName}>
                                {item.serviceName}
                            </Text>
                            <View style={styles.summaryInfo}>
                                <Text style={styles.summaryCustomers}>
                                    {item.customers}
                                </Text>
                                <Text>pp</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* FlastList of details information for each appointment */}
                <View style={{ paddingTop: hp("5%") }}>
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
    summaryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        opacity: 0.68,
    },
    summaryItem: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    summaryServiceName: {
        marginBottom: 5,
    },
    summaryInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    summaryCustomers: {
        marginRight: 5,
    },
});
