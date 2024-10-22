import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/constants/styles/Themed";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { router, useNavigation } from "expo-router";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
    signUpWithEmailPassword,
    signInWithEmailPassword,
    signInWithGoogle,
} from "../utils/utils";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Colors from "@/constants/styles/Colors";
import { CalibriText } from "@/constants/styles/StyledText";
import SignInForm from "../components/authComponents/SignInForm";
import SignUpForm from "../components/authComponents/SignUpForm";
import ResetForm from "../components/authComponents/ResetForm";

const Reset = () => {
    const navigation = useNavigation();
    const email = "xfactor@yahoo.com";
    const password = "123456";
    const name = "Hello";

    return (
        <>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    backgroundColor: "rgba(189, 195, 199, .8)",
                }}
            >
                <CalibriText
                    style={{
                        position: "absolute",
                        bottom: hp("69%"),
                        fontSize: 20,
                        fontWeight: 500,
                        alignSelf: "flex-start",
                        left: wp("15%"),
                    }}
                >
                    Reset
                </CalibriText>

                <View
                    style={{
                        backgroundColor: Colors.light.background,
                        width: wp("96%"),
                        height: hp("68%"),
                        position: "absolute",
                        bottom: 0,
                        borderRadius: 45,
                    }}
                ></View>

                <ResetForm />
            </View>
        </>
    );
};

export default Reset;

const styles = StyleSheet.create({});
