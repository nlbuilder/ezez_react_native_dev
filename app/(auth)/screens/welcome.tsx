import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/constants/styles/Themed";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
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

// this line is to keep the web browser showing inside the app
WebBrowser.maybeCompleteAuthSession();

const Welcome = () => {
    const email = "xfactor@yahoo.com";
    const password = "123456";
    const name = "Hello";

    const handleSignUpWithEmailPassword = async () => {
        const auth = await signUpWithEmailPassword(email, password, name);

        if (auth) {
            router.push({
                pathname: "/(auth)/screens/loading",
                params: {
                    businessId: auth.uid,
                    name: auth.displayName,
                    email: auth.email,
                },
            });
        }
    };

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
                    Welcome
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

                <SignInForm />
            </View>
        </>
    );
};

export default Welcome;

const styles = StyleSheet.create({});
