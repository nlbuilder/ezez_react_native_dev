import {
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Colors from "@/constants/styles/Colors";
import { router, useLocalSearchParams, useNavigation } from "expo-router";

import {
    getTimeZoneName,
    convertToLocalTime,
    parseTimeToDate,
} from "@/app/(authenticated)/utils/utils";
import { useUpdateBusinessHourAPI } from "../../../apis/updateBusinessHourAPI";
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
            presentation: "card",
        });
    }, [navigation]);

    const localParams = useLocalSearchParams();

    const startTime0 = Array.isArray(localParams.startTime)
        ? localParams.startTime[0]
        : localParams.startTime;
    const finishTime0 = Array.isArray(localParams.finishTime)
        ? localParams.finishTime[0]
        : localParams.finishTime;

    // get the time zone of the device
    const timeZoneName = getTimeZoneName();

    const startTimeDate = parseTimeToDate(startTime0, timeZoneName);

    const closingTime = parseTimeToDate(finishTime0, timeZoneName);

    // handlde the Time picker
    const [timeStart, setTimeStart] = useState(startTimeDate);
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

    // set the theme variant for the date and time pickers
    const themeVariantDateTimePicker = "light";

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

    // useEffect(() => {
    //     refetchGetBusinessHourInfo();
    // }, [timeStart, timeFinish]);

    return (
        <View
            style={[
                styles.container,
                {
                    flex: 1,
                    borderTopColor: Colors[colorScheme ?? "light"].separator,
                    borderTopWidth: 1,
                    // backgroundColor: Colors[colorScheme ?? "light"].separator,
                    backgroundColor: "rgba(189, 195, 199, 0.25)",
                },
            ]}
        >
            <View
                style={[
                    styles.content,
                    {
                        borderColor: Colors[colorScheme ?? "light"].separator,
                        backgroundColor:
                            Colors[colorScheme ?? "light"].background,
                    },
                ]}
            >
                {/* set timeStart */}
                <View style={[styles.Picker]}>
                    <DateTimePicker
                        value={timeStart}
                        mode={"time"}
                        onChange={onChangeTimeStart}
                        timeZoneName={timeZoneName} // set the time zone
                        themeVariant={themeVariantDateTimePicker}
                    />
                    <Text style={{ left: wp("10%") }}>Set Opening Time</Text>
                </View>

                <View style={[styles.Picker]}>
                    <DateTimePicker
                        value={timeFinish}
                        mode={"time"}
                        onChange={onChangeTimeFinish}
                        timeZoneName={timeZoneName} // set the time zone
                        themeVariant={themeVariantDateTimePicker}
                    />
                    <Text style={{ left: wp("12.5%") }}>Set Closing Time</Text>
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
                        handleSubmit();
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

            {/* confirm button */}
            {/* <View
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
            </View> */}
        </View>
    );
};

export default OpeningHourSetting;

const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    content: {
        marginTop: hp("5%"),
        width: wp("84%"),
        height: hp("15%"),
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: "center",
        justifyContent: "center",
    },
    Picker: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: wp("2.5%"),
        paddingTop: wp("2.5%"),
        paddingLeft: wp("5%"),
    },
    confirmButton: {
        alignSelf: "center",
        borderWidth: 1,
        height: hp("6%"),
        width: wp("84%"),
        borderRadius: 10,
        marginTop: hp("2.5%"),
    },
});
