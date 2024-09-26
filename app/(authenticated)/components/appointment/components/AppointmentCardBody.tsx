import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { AppointmentCardBodyProps } from "../types/types";

const AppointmentCardBody = ({
    serviceTitle,
    numberOfCustomers,
}: AppointmentCardBodyProps) => {
    return (
        <View style={styles.item}>
            <Text style={{ fontSize: 14 }}>
                {serviceTitle} : {numberOfCustomers} pp
            </Text>
        </View>
    );
};

export default AppointmentCardBody;

const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: hp("1%"),
        alignItems: "center",
    },
});
