import {
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";
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
import { StatusBar } from "expo-status-bar";

// this line is to keep the web browser showing inside the app
WebBrowser.maybeCompleteAuthSession();

const Welcome = () => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
            setKeyboardVisible(true)
        );
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
            setKeyboardVisible(false)
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <>
            <StatusBar hidden={keyboardVisible} />

            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                            backgroundColor: "rgba(189, 195, 199, 1)",
                        }}
                    >
                        <CalibriText
                            style={{
                                position: "absolute",
                                bottom: hp("56%"),
                                fontSize: 20,
                                fontWeight: 500,
                                alignSelf: "flex-start",
                                left: wp("10%"),
                            }}
                        >
                            Welcome
                        </CalibriText>

                        <View
                            style={{
                                backgroundColor: Colors.light.background,
                                width: wp("96%"),
                                height: hp("55%"),
                                position: "absolute",
                                bottom: 0,
                                borderRadius: 45,
                            }}
                        >
                            <SignInForm />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
};

export default Welcome;

const styles = StyleSheet.create({});
