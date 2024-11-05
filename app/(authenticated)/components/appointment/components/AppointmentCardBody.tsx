// The order to follow is:
// 1. read the AppointmentCard.tsx file
// 2. read the AppointmentCardBody.tsx file

// The data of {serviceTitle, numberOfCustomers} is passed
// from the AppointmentCard.tsx to this AppointmentCardBody.tsx file.

// So, the future me, don't get confused!

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { AppointmentCardBodyProps } from "../types/types";

const AppointmentCardBody = ({
    serviceTitle,
    numberOfCustomers,
}: AppointmentCardBodyProps) => {
    return (
        <View style={styles.appointmentCardBody}>
            <Text style={{ fontSize: 14 }}>
                {serviceTitle} : {numberOfCustomers} pp
            </Text>
        </View>
    );
};

export default AppointmentCardBody;

const styles = StyleSheet.create({
    appointmentCardBody: {
        flex: 1,
        paddingTop: hp("2%"),
        alignItems: "center",
        justifyContent: "center",
    },
});
