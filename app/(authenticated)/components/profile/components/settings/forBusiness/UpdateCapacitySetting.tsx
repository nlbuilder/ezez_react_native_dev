import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

import Colors from "@/constants/styles/Colors";

const UpdateCapacitySetting = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Edit Capacity",
            headerBackTitle: "Back",
            // presentation: "modal",
        });
    }, [navigation]);

    return (
        <View>
            <Text>UpdateCapacitySetting</Text>
        </View>
    );
};

export default UpdateCapacitySetting;

const styles = StyleSheet.create({});
