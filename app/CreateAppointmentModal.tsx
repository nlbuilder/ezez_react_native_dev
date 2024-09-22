import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, useColorScheme } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DropDownPicker from "react-native-dropdown-picker";

import { Text, View } from "@/constants/styles/Themed";
import Colors from "@/constants/styles/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import DropdownModal from "./utils/modals/DropDownModal";

import dummyServiceData from "@/dummy/dummyServiceData.json";

export default function CreateAppointmentModal() {
    const colorScheme = useColorScheme();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");

    // DropDownPicker for selecting a service
    const [serviceItems, setServiceItems] = useState(dummyServiceData);

    const [addService, setAddService] = useState(false);

    const pressAddServiceHandler = () => {
        setAddService(!addService);
    };

    return (
        <View style={styles.container}>
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

            {/* service selection and Number of People */}
            {addService === true && (
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
            )}

            {/* add more button */}
            {/* <View
                style={{
                    marginLeft: wp("50%"),
                    marginTop: hp("5%"),
                }}
            >
                <Pressable
                    onPress={() => {
                        pressAddServiceHandler();
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
                        More
                    </Text>

                    <AntDesign
                        name="plus"
                        size={28}
                        color={Colors[colorScheme ?? "light"].tint}
                        style={{ marginRight: 10 }}
                    />
                </Pressable>
            </View> */}

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
