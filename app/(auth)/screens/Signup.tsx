import { StyleSheet } from "react-native";
import { View } from "@/constants/styles/Themed";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "@/constants/styles/Colors";
import { CalibriText } from "@/constants/styles/StyledText";
import SignUpForm from "../components/authComponents/SignUpForm";

const SignUp = () => {
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
                    SignUp
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

                <SignUpForm />
            </View>
        </>
    );
};

export default SignUp;

const styles = StyleSheet.create({});
