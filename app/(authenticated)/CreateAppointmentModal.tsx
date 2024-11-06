import { StatusBar } from "expo-status-bar";
import {
    Platform,
    Pressable,
    StyleSheet,
    useColorScheme,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
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
import uuid from "react-native-uuid";

import { useAuth } from "../(auth)/components/hooks/useAuth";
import { useCreateAppointmentAPI } from "./components/appointment/apis/createAppointmentAPI";
import { useGetAllServicesAPI } from "./components/profile/apis/getAllServicesAPI";
import {
    convertTo12HourFormat,
    convertToLocalTime,
    getTimeZoneName,
    roundToPreviousHour,
} from "./utils/utils";
import { validateAppointmentDetails } from "../validations/validations";
import { useGetBusinessHourAPI } from "./components/profile/apis/getBusinessHourAPI";

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
    const [addMoreServices, setAddMoreServices] = useState(false);

    //  date picker
    const [date, setDate] = useState(new Date());
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
            // console.log("Date changed to: ", selectedDate);
        }
    };

    // time picker
    const [time, setTime] = useState(new Date());
    const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        if (selectedTime) {
            setTime(selectedTime);
            // console.log("Time changed to: ", selectedTime);
        }
    };

    // get the time zone of the device
    const timeZoneName = getTimeZoneName();

    // set the theme variant for the date and time pickers
    const themeVariantDateTimePicker = "light";

    // get the businessHour info
    const { businessHourInfo, refetch: refetchBusinessHourInfo } =
        useGetBusinessHourAPI();

    const startTime =
        (Array.isArray(businessHourInfo) && businessHourInfo[0]?.startTime) ||
        "10:00 AM";
    const finishTime =
        (Array.isArray(businessHourInfo) && businessHourInfo[0]?.finishTime) ||
        "7:00 PM";

    const appointmentTime = convertTo12HourFormat(time.toTimeString());

    const timeNow = convertTo12HourFormat(new Date().toTimeString());

    const handleCreateAppointment = async () => {
        const { isValid, message } = validateAppointmentDetails(
            date.toDateString(),
            appointmentTime,
            startTime,
            finishTime,
            timeNow,
            phoneNumber,
            customerName,
            numberOfPeople,
            note
            // chosenService
        );

        if (!isValid) {
            Alert.alert("Invalid input", message);
            return;
        }

        const newAppointmentData = {
            appointmentId: uuid.v4() as string,
            businessId: businessId,
            customerId: "1",
            serviceId: "1",
            dateString: date.toDateString(),
            dateDate: date,
            timeString: time.toTimeString(),
            timeDate: time,
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

    const handleAddMoreService = () => {
        setAddMoreServices(true);

        console.log("Add more services: ", addMoreServices);
    };

    return (
        <>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                alignItems: "center",
                                left: wp("5.5%"),
                                marginTop: hp("1.5%"),
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
                                    themeVariant={themeVariantDateTimePicker}
                                />

                                <DateTimePicker
                                    value={time}
                                    mode={"time"}
                                    onChange={onChangeTime}
                                    minuteInterval={5}
                                    timeZoneName={timeZoneName} // set the time zone
                                    themeVariant={themeVariantDateTimePicker}
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
                                marginTop: hp("1.5%"),
                            }}
                        >
                            <View style={{ alignItems: "center" }}>
                                <Text
                                    style={[
                                        styles.formTitle,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        },
                                    ]}
                                >
                                    Phone number
                                </Text>
                                <View style={styles.appointmentForm}>
                                    <TextInput
                                        placeholder="Phone number"
                                        placeholderTextColor={
                                            Colors[colorScheme ?? "light"]
                                                .placeholder
                                        }
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            color: "black",
                                        }}
                                        value={phoneNumber}
                                        onChangeText={(value) =>
                                            setPhoneNumber(value)
                                        }
                                        keyboardType="phone-pad"
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text
                                    style={[
                                        styles.formTitle,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        },
                                    ]}
                                >
                                    Customer's name
                                </Text>
                                <View style={styles.appointmentForm}>
                                    <TextInput
                                        placeholder="Full name"
                                        placeholderTextColor={
                                            Colors[colorScheme ?? "light"]
                                                .placeholder
                                        }
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            color: "black",
                                        }}
                                        value={customerName}
                                        onChangeText={(value) =>
                                            setCustomerName(value)
                                        }
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
                                marginTop: hp("1.5%"),
                            }}
                        >
                            <View
                                style={{
                                    width: wp("40%"),
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={[
                                        styles.formTitle,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        },
                                    ]}
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
                                    style={[
                                        styles.formTitle,
                                        {
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        },
                                    ]}
                                >
                                    Number of people
                                </Text>

                                <View style={styles.appointmentForm}>
                                    <TextInput
                                        placeholder={"0"}
                                        placeholderTextColor={
                                            Colors[colorScheme ?? "light"]
                                                .placeholder
                                        }
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            color: "black",
                                        }}
                                        value={numberOfPeople.toString()}
                                        onChangeText={(value) =>
                                            setNumberOfPeople(value)
                                        }
                                        keyboardType="number-pad"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* note */}
                        <View style={{ width: wp("84%") }}>
                            <Text
                                style={[
                                    styles.formTitle,
                                    {
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
                                        left: wp("2.5%"),
                                        marginTop: hp("1.5%"),
                                    },
                                ]}
                            >
                                Request
                            </Text>
                            <View
                                style={[
                                    styles.appointmentForm,
                                    { width: wp("84%") },
                                ]}
                            >
                                <TextInput
                                    placeholder="Enter a note"
                                    placeholderTextColor={
                                        Colors[colorScheme ?? "light"]
                                            .placeholder
                                    }
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        color: "black",
                                    }}
                                    value={note}
                                    onChangeText={(value) => setNote(value)}
                                />
                            </View>
                        </View>

                        {/* Confirm button */}
                        <View
                            style={[
                                styles.confirmButton,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .mainButtonBackgroundColor,
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .mainButtonBorderColor,
                                },
                            ]}
                        >
                            <Pressable
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "center",
                                }}
                                onPress={() => {
                                    handleCreateAppointment();
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: Colors[colorScheme ?? "light"]
                                            .textButtonColor,
                                    }}
                                >
                                    Confirm and Continue
                                </Text>
                            </Pressable>
                        </View>

                        {/* confirm buttons */}
                        {/* <View
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
                                        color: Colors[colorScheme ?? "light"]
                                            .text,
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
                        </View> */}

                        <StatusBar
                            style={Platform.OS === "ios" ? "light" : "auto"}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
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
    confirmButton: {
        borderWidth: 1,
        height: hp("6%"),
        width: wp("84%"),
        borderRadius: 10,
        marginTop: hp("2%"),
    },
});
