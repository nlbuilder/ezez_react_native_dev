import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BusinessProfile = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>business Profile</Text>
        </View>
    );
};

export default BusinessProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
