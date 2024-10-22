import { StatusBar } from "expo-status-bar";
import {
    Platform,
    Pressable,
    StyleSheet,
    useColorScheme,
    Text,
    View,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/styles/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import DropDownPickerModal from "./utils/modals/DropDownPickerModal";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";

import { useAuth } from "../(auth)/components/hooks/useAuth";
import { useCreateAppointmentAPI } from "./components/appointment/apis/createAppointmentAPI";
import { useGetAllServicesAPI } from "./components/profile/apis/getAllServicesAPI";
import { getTimeZoneName, roundToPreviousHour } from "./utils/utils";
import { validateAppointmentDetails } from "./utils/validations/validations";

export default function CreateAppointmentModal() {
    const colorScheme = useColorScheme();
    const auth = useAuth();
    const businessId = auth?.user?.uid as string;

    const { createAppointment, isLoading: isCreateAppointmentLoading } =
        useCreateAppointmentAPI();

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

    // console.log("serviceList: ", serviceList);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [note, setNote] = useState("");

    // prepare options for the DropDownPicker for selecting a service
    const [serviceItems, setServiceItems] = useState(serviceList);
    const [chosenService, setChosenService] = useState(serviceItems[0].value);

    const [date, setDate] = useState(new Date());
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
            console.log("Date changed to: ", selectedDate);
        }
    };

    const [time, setTime] = useState(new Date());
    const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        if (selectedTime) {
            setTime(selectedTime);
            console.log("Time changed to: ", selectedTime);
        }
    };

    // get the time zone of the device
    const timeZoneName = getTimeZoneName();

    const handleCreateAppointment = async () => {
        const isValid = validateAppointmentDetails(
            phoneNumber,
            customerName,
            numberOfPeople,
            note,
            chosenService
        );

        if (!isValid) {
            return;
        }

        const newAppointmentData = {
            appointmentId: new Date().getTime().toString(),
            businessId: businessId,
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
            const newAppointment = await createAppointment(newAppointmentData);

            if (newAppointment) {
                console.log("Appointment created: ", newAppointment);

                refetchGetAllServices();

                router.back();
            }
        } catch (error) {
            console.error("Error creating appointment: ", error);
        }
    };

    return (
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
                    />

                    <DateTimePicker
                        value={time}
                        mode={"time"}
                        onChange={onChangeTime}
                        minuteInterval={5}
                        timeZoneName={timeZoneName} // set the time zone
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
                            placeholder="Phone number"
                            placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
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
                            placeholder="Full name"
                            placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
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
                        placeholder={serviceItems[0].value}
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
                            placeholder={"0"}
                            placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
                            style={{ height: "100%", color: "black" }}
                            value={numberOfPeople.toString()}
                            onChangeText={(value) => setNumberOfPeople(value)}
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
                <View style={[styles.appointmentForm, { width: wp("84%") }]}>
                    <TextInput
                        placeholder="Enter a note"
                        placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
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
                        handleCreateAppointment();
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

            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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
