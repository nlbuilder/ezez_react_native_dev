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
import DropdownModal from "./utils/modals/DropDownModal";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import dummyServiceData from "@/dummy/dummyServiceData.json";

export default function CreateAppointmentModal() {
    const colorScheme = useColorScheme();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");

    // DropDownPicker for selecting a service
    const [serviceItems, setServiceItems] = useState(dummyServiceData);

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
            setDate(selectedTime);
            console.log("Time changed to: ", selectedTime);
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
                                Colors[colorScheme ?? "light"].tabIconDefault,
                            borderWidth: 1,
                            width: wp("40%"),
                            height: hp("6%"),
                            borderRadius: 10,
                            paddingLeft: 10,
                        }}
                    >
                        <TextInput
                            placeholder="Phone number"
                            placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
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
                                Colors[colorScheme ?? "light"].tabIconDefault,
                            borderWidth: 1,
                            width: wp("40%"),
                            height: hp("6%"),
                            borderRadius: 10,
                            paddingLeft: 10,
                        }}
                    >
                        <TextInput
                            placeholder="Full name"
                            placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
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

                    <DropdownModal
                        data={serviceItems}
                        onChange={(value) => {
                            console.log(value);
                        }}
                        placeholder={serviceItems[0].label}
                    />
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
                                Colors[colorScheme ?? "light"].tabIconDefault,
                            borderWidth: 1,
                            width: wp("40%"),
                            height: hp("6%"),
                            borderRadius: 10,
                            paddingLeft: 10,
                        }}
                    >
                        <TextInput
                            placeholder="Number of people"
                            placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
                            style={{ height: "100%", color: "white" }}
                            value={fullName}
                            onChangeText={(value) => setFullName(value)}
                        />
                    </View>
                </View>
            </View>

            {/* confirm and candel buttons */}
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
                            color: Colors[colorScheme ?? "light"].tint,
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
});
