import {
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "@/constants/styles/Colors";
import dummyTermsAndCondition from "@/dummy/dummyTermsAndConditions.json";

const TermsAndConditions = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const termsAndConditions = dummyTermsAndCondition;

    // handle the header when this screen is rendered
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Terms and Conditions",
            headerBackTitle: "Back",
            presentation: "card",

            headerTitleStyle: {
                borderColor: Colors[colorScheme ?? "light"].separator,
                borderWidth: 1,
            },
        });
    }, [navigation]);

    return (
        <ScrollView
            style={{
                height: hp("40%"),
                alignSelf: "center",
                paddingHorizontal: wp("8%"),
                paddingVertical: hp("5%"),
                backgroundColor: Colors[colorScheme ?? "light"].background,
            }}
        >
            <Text style={{ textAlign: "justify" }}>
                {termsAndConditions.content}
            </Text>
        </ScrollView>
    );
};

export default TermsAndConditions;

const styles = StyleSheet.create({});
