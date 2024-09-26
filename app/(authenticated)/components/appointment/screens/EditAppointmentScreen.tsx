import { StatusBar } from "expo-status-bar";
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
import DropdownModal from "@/app/(authenticated)/utils/modals/DropDownModal";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import dummyServiceData from "@/dummy/dummyServiceData.json";
import { router, useLocalSearchParams, useNavigation } from "expo-router";

export default function EditAppointmentScreen() {
    const { data } = useLocalSearchParams();
    const appointmentDetails = data ? JSON.parse(data as string) : {};

    const navigation = useNavigation();

    const colorScheme = useColorScheme();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");

    // DropDownPicker for selecting a service
    const [serviceItems, setServiceItems] = useState(dummyServiceData);

    // editng date object
    const [dateObject, setDateObject] = useState(
        new Date(appointmentDetails.date)
    );
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDateObject(selectedDate);
        }
    };

    // editing time object
    const [hours, minutes] = appointmentDetails.time.split(":").map(Number);
    const timeObject0 = new Date();
    timeObject0.setHours(hours, minutes, 0, 0);
    const [timeObject, setTimeObject] = useState(timeObject0);
    const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        if (selectedTime) {
            setTimeObject(selectedTime);
        }
    };

    console.log(appointmentDetails);

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
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
            {/* Title  */}
            <View style={styles.content}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View style={{}}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "500",
                                color: Colors[colorScheme ?? "light"].text,
                                left: wp("4%"),
                            }}
                        >
                            Edit appointment
                        </Text>
                    </View>

                    <View style={{ left: wp("24.5%") }}>
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

                {/* Separator */}
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

                {/* Date and time pickers */}
                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                        alignItems: "center",
                        left: wp("5.5%"),
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <DateTimePicker
                            value={dateObject}
                            mode={"date"}
                            onChange={onChangeDate}
                        />

                        <DateTimePicker
                            value={timeObject}
                            mode={"time"}
                            onChange={onChangeTime}
                        />
                    </View>
                </View>

                {/* Phone number and Full name forms */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: wp("84%"),
                        marginTop: hp("5%"),
                    }}
                >
                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={{
                                marginBottom: hp(".5%"),
                            }}
                        >
                            Phone number
                        </Text>
                        <View
                            style={{
                                backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                                borderColor:
                                    Colors[colorScheme ?? "light"]
                                        .tabIconDefault,
                                borderWidth: 1,
                                width: wp("40%"),
                                height: hp("6%"),
                                borderRadius: 10,
                                paddingLeft: 10,
                            }}
                        >
                            <TextInput
                                placeholder={
                                    appointmentDetails.customerPhoneNumber
                                }
                                placeholderTextColor={
                                    "rgba(189, 195, 199, 0.8)"
                                }
                                style={{ height: "100%", color: "white" }}
                                value={phoneNumber}
                                onChangeText={(value) => setPhoneNumber(value)}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={{
                                marginBottom: hp(".5%"),
                            }}
                        >
                            Full name
                        </Text>
                        <View
                            style={{
                                backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                                borderColor:
                                    Colors[colorScheme ?? "light"]
                                        .tabIconDefault,
                                borderWidth: 1,
                                width: wp("40%"),
                                height: hp("6%"),
                                borderRadius: 10,
                                paddingLeft: 10,
                            }}
                        >
                            <TextInput
                                placeholder={
                                    appointmentDetails.customerFullName
                                }
                                placeholderTextColor={
                                    "rgba(189, 195, 199, 0.8)"
                                }
                                style={{ height: "100%", color: "white" }}
                                value={fullName}
                                onChangeText={(value) => setFullName(value)}
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
                        marginTop: hp("2.5%"),
                    }}
                >
                    <View
                        style={{
                            width: wp("40%"),
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ marginBottom: hp(".5%") }}>Service</Text>

                        <View>
                            <DropdownModal
                                data={serviceItems}
                                onChange={(value) => {
                                    console.log(value);
                                }}
                                placeholder={appointmentDetails.serviceTitle}
                            />
                        </View>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Text style={{ marginBottom: hp(".5%") }}>
                            Number of people
                        </Text>

                        <View
                            style={{
                                backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                                borderColor:
                                    Colors[colorScheme ?? "light"]
                                        .tabIconDefault,
                                borderWidth: 1,
                                width: wp("40%"),
                                height: hp("6%"),
                                borderRadius: 10,
                                paddingLeft: 10,
                            }}
                        >
                            <TextInput
                                placeholder={appointmentDetails.numberOfCustomers.toString()}
                                placeholderTextColor={
                                    "rgba(189, 195, 199, 0.8)"
                                }
                                style={{ height: "100%", color: "white" }}
                                value={fullName}
                                onChangeText={(value) => setFullName(value)}
                            />
                        </View>
                    </View>
                </View>

                {/* confirm button */}
                <View
                    style={{
                        marginLeft: wp("50%"),
                        marginTop: hp("5%"),
                    }}
                >
                    <Pressable
                        onPress={() => {
                            console.log("confirm button pressed");
                        }}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                paddingHorizontal: wp("2.5%"),
                                opacity: 0.5,
                                color: Colors[colorScheme ?? "light"]
                                    .tabIconSelected,
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
            </View>
        </SafeAreaView>
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
    content: {
        borderRadius: 20,
        width: wp("99%"),
        height: hp("95%"),
        paddingTop: hp("2%"),
        alignItems: "center",
    },
});
