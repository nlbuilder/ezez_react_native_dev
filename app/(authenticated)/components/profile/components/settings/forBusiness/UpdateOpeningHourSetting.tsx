import {
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Colors from "@/constants/styles/Colors";
import { router, useNavigation } from "expo-router";

import {
    getTimeZoneName,
    convertToLocalTime,
    parseTimeToDate,
} from "@/app/(authenticated)/utils/utils";
import { useUpdateBusinessHourAPI } from "../../../apis/updateBusinessHourAPI";
import { useGetBusinessHourAPI } from "../../../apis/getBusinessHourAPI";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";

const OpeningHourSetting = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const { user } = useAuth();
    const businessId = user?.uid as string;

    // handle the header when this screen is rendered
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Edit Opening Hours",
            headerBackTitle: "Back",
            // presentation: "modal",
        });
    }, [navigation]);

    // get the time zone of the device
    const timeZoneName = getTimeZoneName();

    // make use of the getBusinessHour API
    const { businessHourInfo, refetch: refetchGetBusinessHourInfo } =
        useGetBusinessHourAPI();

    const openingTime = parseTimeToDate(
        (businessHourInfo?.startTime as string) || "10:00",
        timeZoneName
    );

    const closingTime = parseTimeToDate(
        (businessHourInfo?.finishTime as string) || "19:00",
        timeZoneName
    );

    // handlde the Time picker
    const [timeStart, setTimeStart] = useState(openingTime);
    const onChangeTimeStart = (
        event: DateTimePickerEvent,
        selectedTime?: Date
    ) => {
        if (selectedTime) {
            setTimeStart(selectedTime);
        }
    };

    const [timeFinish, setTimeFinish] = useState(closingTime);
    const onChangeTimeFinish = (
        event: DateTimePickerEvent,
        selectedTime?: Date
    ) => {
        if (selectedTime) {
            setTimeFinish(selectedTime);
        }
    };

    const startTime = convertToLocalTime(timeStart.toISOString(), timeZoneName);
    const finishTime = convertToLocalTime(
        timeFinish.toISOString(),
        timeZoneName
    );

    // make use of the updateBusinessHour API
    const { updateBusinessHourInfo } = useUpdateBusinessHourAPI();

    // def a function to handle the submit button
    const handleSubmit = async () => {
        const updatedBusinessHourInfo = {
            businessId: businessId,
            startTime: startTime,
            finishTime: finishTime,
        };

        try {
            // call the API to update the business hour
            const update = await updateBusinessHourInfo(
                updatedBusinessHourInfo
            );

            // navigate to the previous screen
            if (update) {
                router.back();
            }
        } catch (error) {
            console.error(
                "Error updating business hour [updateOpeningHourSetting screen]: ",
                error
            );
        }
    };

    useEffect(() => {
        refetchGetBusinessHourInfo();
    }, [timeStart, timeFinish]);

    return (
        <View
            style={{
                // flex: 1,
                backgroundColor: Colors[colorScheme ?? "light"].background,

                height: hp("36%"),
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
            }}
        >
            {/* Opening hours setting */}
            <View
                style={{
                    marginTop: wp("5%"),
                    marginBottom: 5,
                    marginHorizontal: wp("10%"),
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: Colors[colorScheme ?? "light"].text,
                        fontSize: 16,
                        fontWeight: 400,
                        paddingVertical: wp("5%"),
                    }}
                >
                    Opening Hours
                </Text>
            </View>
            <View
                style={{
                    width: wp("86%"),
                    height: hp("15%"),
                    borderColor: "rgba(189, 195, 199, 0.8)",
                    borderWidth: 1,
                    borderRadius: 15,
                    alignSelf: "center",
                    justifyContent: "center",
                }}
            >
                {/* set timeStart */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: wp("2.5%"),
                        paddingTop: wp("2.5%"),
                        paddingLeft: wp("2%"),
                    }}
                >
                    <DateTimePicker
                        value={timeStart}
                        mode={"time"}
                        onChange={onChangeTimeStart}
                        timeZoneName={timeZoneName} // set the time zone
                    />
                    <Text style={{ left: wp("10%") }}>Set Opening Time</Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingVertical: wp("2.5%"),
                        paddingLeft: wp("2.5%"),
                    }}
                >
                    <DateTimePicker
                        value={timeFinish}
                        mode={"time"}
                        onChange={onChangeTimeFinish}
                        timeZoneName={timeZoneName} // set the time zone
                    />
                    <Text style={{ left: wp("12.5%") }}>Set Closing Time</Text>
                </View>
            </View>

            {/* confirm button */}
            <View
                style={{
                    paddingVertical: wp("5%"),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    right: wp("10%"),
                }}
            >
                <Text style={{ right: wp("2%") }}>Confirm</Text>
                <Pressable
                    onPress={() => {
                        handleSubmit();
                    }}
                    style={{ padding: 10 }}
                >
                    <AntDesign
                        name="check"
                        size={28}
                        color={Colors[colorScheme ?? "light"].tint}
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default OpeningHourSetting;

const styles = StyleSheet.create({});
