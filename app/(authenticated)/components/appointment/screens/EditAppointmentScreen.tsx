import {
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    StyleSheet,
    TouchableWithoutFeedback,
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

// import dummyServiceData from "@/dummy/dummyServiceData.json";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
    getTimeZoneName,
    parseTimeStringToDate,
    roundToPreviousHour,
} from "@/app/(authenticated)/utils/utils";
import { useGetAllServicesAPI } from "../../profile/apis/getAllServicesAPI";
import { useUpdateAppointmentAPI } from "../apis/updateAppointmentInfoAPI";
import { validateAppointmentDetails } from "@/app/validations/validations";

export default function EditAppointmentScreen() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const localParams = useLocalSearchParams();

    // get the appointment details from the local params
    // passing from the AppointmentDetails component
    const appointmentDetails = localParams.data
        ? JSON.parse(localParams.data as string)
        : {};

    // handle the Date picker
    const [date, setDate] = useState(new Date(appointmentDetails.dateString));
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
            // console.log("Date changed to: ", selectedDate);
        }
    };

    console.log(appointmentDetails.timeString);

    // handle the Time picker
    const [time, setTime] = useState(
        parseTimeStringToDate(appointmentDetails.timeString)
    );

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

    const [phoneNumber, setPhoneNumber] = useState(
        appointmentDetails.customerPhoneNumber
    );
    const [customerName, setCustomerName] = useState(
        appointmentDetails.customerName
    );
    const [numberOfPeople, setNumberOfPeople] = useState(
        appointmentDetails.numberOfCustomers.toString()
    );
    const [note, setNote] = useState(appointmentDetails.note);

    const { updateAppointmentInfo, isLoading: isUpdateAppointmentInfoLoading } =
        useUpdateAppointmentAPI();

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

    // prepare options for the DropDownPicker for selecting a service
    const [serviceItems, setServiceItems] = useState(serviceList);
    const [chosenService, setChosenService] = useState(
        appointmentDetails.serviceName
    );

    const handleEditAppointment = async () => {
        const isValid = validateAppointmentDetails(
            phoneNumber,
            customerName,
            numberOfPeople,
            note
            // chosenService
        );

        if (!isValid) {
            console.log("Invalid appointment details");

            return;
        }

        const updateAppointmentData = {
            appointmentId: appointmentDetails.appointmentId,
            businessId: appointmentDetails.businessId,
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
        <>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView
                        style={[
                            styles.container,
                            {
                                backgroundColor:
                                    Colors[colorScheme ?? "light"]
                                        .tabIconDefault,
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
                                        // disabled={true}
                                        themeVariant={
                                            themeVariantDateTimePicker
                                        }
                                    />

                                    <DateTimePicker
                                        value={time}
                                        mode={"time"}
                                        onChange={onChangeTime}
                                        minuteInterval={5}
                                        timeZoneName={timeZoneName} // set the time zone
                                        themeVariant={
                                            themeVariantDateTimePicker
                                        }
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
                                            placeholder={
                                                appointmentDetails.customerPhoneNumber
                                            }
                                            placeholderTextColor={
                                                Colors[colorScheme ?? "light"]
                                                    .text
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
                                            placeholder={
                                                appointmentDetails.customerName
                                            }
                                            placeholderTextColor={
                                                Colors[colorScheme ?? "light"]
                                                    .text
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
                                        placeholder={
                                            appointmentDetails.serviceName
                                        }
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
                                            placeholder={appointmentDetails.numberOfCustomers.toString()}
                                            placeholderTextColor={
                                                Colors[colorScheme ?? "light"]
                                                    .text
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
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
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
                                        placeholder={appointmentDetails.note}
                                        placeholderTextColor={
                                            Colors[colorScheme ?? "light"].text
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
                                        handleEditAppointment();
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].textButtonColor,
                                        }}
                                    >
                                        Confirm and Continue
                                    </Text>
                                </Pressable>
                            </View>

                            {/* confirm and candel buttons */}
                            {/* <View
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
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        }}
                                    >
                                        Confirm
                                    </Text>

                                    <AntDesign
                                        name="check"
                                        size={28}
                                        color={
                                            Colors[colorScheme ?? "light"].tint
                                        }
                                        style={{ marginRight: 10 }}
                                    />
                                </Pressable>
                            </View> */}

                            {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
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
    confirmButton: {
        borderWidth: 1,
        height: hp("6%"),
        width: wp("84%"),
        borderRadius: 10,
        marginTop: hp("2%"),
    },
});
