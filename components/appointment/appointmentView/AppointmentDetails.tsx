import {
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import React from "react";
import { AppointmentDetailsProps } from "../types";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "@/constants/styles/Colors";
import { AntDesign } from "@expo/vector-icons";

const AppointmentDetails = ({
    time,
    serviceTitle,
    numberOfCustomers,
    customerPhoneNumber,
    note,
}: AppointmentDetailsProps) => {
    const colorScheme = useColorScheme();

    return (
        <View
            style={{
                backgroundColor: "transparent",
                borderRadius: hp("2.5%"),
                borderWidth: 1,
                borderColor: Colors[colorScheme ?? "light"].tabIconDefault,
                height: hp("10%"),
                width: wp("96%"),
                alignItems: "center",
                justifyContent: "center",
                marginBottom: hp("1%"),
            }}
        >
            {/* Top Row - 3 Columns */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 12,
                }}
            >
                <View
                    style={{
                        width: wp("30%"),
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                        }}
                    >
                        {time}
                    </Text>
                </View>
                <View
                    style={{
                        width: wp("30%"),
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                        }}
                    >
                        {note}
                    </Text>
                </View>
                <View style={{ width: wp("30%"), alignItems: "center" }}>
                    <Pressable>
                        <AntDesign
                            name="edit"
                            size={24}
                            color={Colors[colorScheme ?? "light"].tint}
                        />
                    </Pressable>
                </View>
            </View>

            {/* Bottom Row - 3 Columns */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        width: wp("30%"),
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                        }}
                    >
                        {serviceTitle}
                    </Text>
                </View>
                <View
                    style={{
                        width: wp("30%"),
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                        }}
                    >
                        {numberOfCustomers} people
                    </Text>
                </View>
                <View
                    style={{
                        width: wp("30%"),
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                        }}
                    >
                        Tel. {customerPhoneNumber}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default AppointmentDetails;

const styles = StyleSheet.create({
    regularText: {},
});
