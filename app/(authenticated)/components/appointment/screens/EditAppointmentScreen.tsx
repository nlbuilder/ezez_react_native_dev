import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    useColorScheme,
} from "react-native";
import { Text, View } from "@/constants/styles/Themed";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/styles/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import DropDownPickerModal from "@/app/(authenticated)/utils/modals/DropDownPickerModal";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import dummyServiceData from "@/dummy/dummyServiceData.json";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
    convertToLocalTime,
    getTimeZoneName,
    parseTimeStringToDate,
    roundToPreviousHour,
} from "@/app/(authenticated)/utils/utils";
import { useGetAllServicesAPI } from "../../profile/apis/getAllServicesAPI";
import { useUpdateAppointmentAPI } from "../apis/updateAppointmentInfoAPI";

export default function EditAppointmentScreen() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const localParams = useLocalSearchParams();

    // get the appointment details from the local params
    // passing from the AppointmentDetails component
    const appointmentDetails = localParams.data
        ? JSON.parse(localParams.data as string)
        : {};

    console.log(appointmentDetails.date);
    // handle the Date picker
    const [date, setDate] = useState(new Date(appointmentDetails.date));
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
            console.log("Date changed to: ", selectedDate);
        }
    };

    // get the time zone of the device
    const timeZoneName = getTimeZoneName();

    // handle the Time picker
    const [time, setTime] = useState(
        parseTimeStringToDate(appointmentDetails.time)
    );
    const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        if (selectedTime) {
            setTime(selectedTime);
            console.log("Time changed to: ", selectedTime);
        }
    };

    const [phoneNumber, setPhoneNumber] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [note, setNote] = useState("");

    // prepare options for the DropDownPicker for selecting a service
    const [serviceItems, setServiceItems] = useState(dummyServiceData);
    const [chosenService, setChosenService] = useState(serviceItems[0].value);

    const { updateAppointmentInfo, isLoading: isUpdateAppointmentInfoLoading } =
        useUpdateAppointmentAPI();

    const {
        allServicesInfo,
        isLoading: isGetAllServicesLoading,
        refetch: refetchGetAllServices,
    } = useGetAllServicesAPI();

    const handleEditAppointment = async () => {
        const updateAppointmentData = {
            appointmentId: appointmentDetails.appointmentId,
            businessId: appointmentDetails.businessId,
            customerId: "1",
            serviceId: "1",
            date: date.toDateString(),
            time: time.toTimeString(),
            roundedTime: roundToPreviousHour(time),
            serviceName: chosenService,
            numberOfCustomers: Number(numberOfPeople),
            customerPhoneNumber: phoneNumber,
            customerName: customerName,
            note: note,
            status: "booked",
        };

        try {
            const updateAppointment = await updateAppointmentInfo(
                updateAppointmentData
            );
            if (updateAppointment) {
                refetchGetAllServices();

                router.back();
            }
        } catch (error) {
            console.error(
                "Error edit appointment [frontend error message]: ",
                error
            );
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "Edit Appointment",
            headerBackTitle: "Back",
            headerTitleAlign: "center",
        });
    }, [navigation]);

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor:
                        Colors[colorScheme ?? "light"].tabIconDefault,
                },
            ]}
        >
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                        alignItems: "center",
                        left: wp("5.5%"),
                        marginTop: hp("2%"),
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <DateTimePicker
                            value={date}
                            mode={"date"}
                            onChange={onChangeDate}
                            // disabled={true}
                        />

                        <DateTimePicker
                            value={time}
                            mode={"time"}
                            onChange={onChangeTime}
                            minuteInterval={5}
                            timeZoneName={timeZoneName} // set the time zone
                            // disabled={true}
                        />
                    </View>
                </View>

                {/* Phone number and customer name forms */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: wp("84%"),
                        marginTop: hp("2%"),
                    }}
                >
                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={{
                                marginBottom: hp(".5%"),
                                color: Colors[colorScheme ?? "light"].text,
                            }}
                        >
                            Phone number
                        </Text>
                        <View style={styles.appointmentForm}>
                            <TextInput
                                placeholder={
                                    appointmentDetails.customerPhoneNumber
                                }
                                placeholderTextColor={
                                    Colors[colorScheme ?? "light"].text
                                }
                                style={{ height: "100%", color: "black" }}
                                value={phoneNumber}
                                onChangeText={(value) => setPhoneNumber(value)}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={{
                                marginBottom: hp(".5%"),
                                color: Colors[colorScheme ?? "light"].text,
                            }}
                        >
                            Customer's name
                        </Text>
                        <View style={styles.appointmentForm}>
                            <TextInput
                                placeholder={appointmentDetails.customerName}
                                placeholderTextColor={
                                    Colors[colorScheme ?? "light"].text
                                }
                                style={{ height: "100%", color: "black" }}
                                value={customerName}
                                onChangeText={(value) => setCustomerName(value)}
                            />
                        </View>
                    </View>
                </View>

                {/* service selection and Number of People */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: wp("84%"),
                        marginTop: hp("2%"),
                    }}
                >
                    <View
                        style={{
                            width: wp("40%"),
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                marginBottom: hp(".5%"),
                                color: Colors[colorScheme ?? "light"].text,
                            }}
                        >
                            Service
                        </Text>

                        <DropDownPickerModal
                            data={serviceItems}
                            onChange={(value) => {
                                setChosenService(value.value);
                            }}
                            placeholder={appointmentDetails.serviceName}
                        />
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={{
                                marginBottom: hp(".5%"),
                                color: Colors[colorScheme ?? "light"].text,
                            }}
                        >
                            Number of people
                        </Text>

                        <View style={styles.appointmentForm}>
                            <TextInput
                                placeholder={appointmentDetails.numberOfCustomers.toString()}
                                placeholderTextColor={
                                    Colors[colorScheme ?? "light"].text
                                }
                                style={{ height: "100%", color: "black" }}
                                value={numberOfPeople.toString()}
                                onChangeText={(value) =>
                                    setNumberOfPeople(value)
                                }
                            />
                        </View>
                    </View>
                </View>

                {/* note */}
                <View style={{ width: wp("84%") }}>
                    <Text
                        style={{
                            marginBottom: hp(".5%"),
                            color: Colors[colorScheme ?? "light"].text,
                            marginTop: hp("2%"),
                            left: wp("2%"),
                        }}
                    >
                        Request
                    </Text>
                    <View
                        style={[styles.appointmentForm, { width: wp("84%") }]}
                    >
                        <TextInput
                            placeholder={appointmentDetails.note}
                            placeholderTextColor={
                                Colors[colorScheme ?? "light"].text
                            }
                            style={{ height: "100%", color: "black" }}
                            value={note}
                            onChangeText={(value) => setNote(value)}
                        />
                    </View>
                </View>

                {/* confirm and candel buttons */}
                <View
                    style={{
                        marginLeft: wp("50%"),
                        marginTop: hp("2.5%"),
                    }}
                >
                    <Pressable
                        onPress={() => {
                            handleEditAppointment();
                        }}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                paddingHorizontal: wp("2.5%"),
                                color: Colors[colorScheme ?? "light"].text,
                            }}
                        >
                            Confirm
                        </Text>

                        <AntDesign
                            name="check"
                            size={28}
                            color={Colors[colorScheme ?? "light"].tint}
                            style={{ marginRight: 10 }}
                        />
                    </Pressable>
                </View>

                {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: "center",
        width: wp("100%"),
        height: hp("48%"),
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    content: {
        borderRadius: 20,
        width: wp("99%"),
        height: hp("95%"),
        paddingTop: hp("2%"),
        alignItems: "center",
    },
    appointmentForm: {
        backgroundColor: Colors.light.background,
        borderColor: Colors.light.tabIconDefault,
        borderWidth: 1,
        width: wp("40%"),
        height: hp("6%"),
        borderRadius: 10,
        paddingLeft: 10,
    },
    formTitle: {
        marginBottom: hp(".5%"),
    },
});
