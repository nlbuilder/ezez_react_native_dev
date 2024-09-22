import { StatusBar } from "expo-status-bar";
import {
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    useColorScheme,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Text, View } from "@/constants/styles/Themed";
import Colors from "@/constants/styles/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import DropdownModal from "@/app/utils/modals/DropDownModal";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import dummyServiceData from "@/dummy/dummyServiceData.json";
import { router, useNavigation } from "expo-router";

export default function EditAppointmentScreen() {
    const navigation = useNavigation();

    const colorScheme = useColorScheme();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");

    // DropDownPicker for selecting a service
    const [serviceItems, setServiceItems] = useState(dummyServiceData);

    const [date, setDate] = useState(new Date());
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

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
            <View style={styles.content}>
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
                            value={date}
                            mode={"date"}
                            onChange={onChangeDate}
                        />

                        <DateTimePicker
                            value={date}
                            mode={"time"}
                            onChange={onChangeDate}
                            minuteInterval={15}
                        />
                    </View>

                    <View style={{ marginLeft: wp("22%") }}>
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
                                placeholder="Phone number"
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
                                placeholder="Full name"
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
                                placeholder={serviceItems[0].label}
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
                                placeholder="Number of people"
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

                {/* confirm and candel buttons */}
                <View
                    style={{
                        marginLeft: wp("50%"),
                        marginTop: hp("8%"),
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
