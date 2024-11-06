import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import { View } from "@/constants/styles/Themed";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "@/constants/styles/Colors";
import { CalibriText } from "@/constants/styles/StyledText";
import SignInForm from "../components/authComponents/SignInForm";
import BackgroundImage from "@/assets/images/backgroundImage.png";

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
                        }}
                    >
                        <Image
                            source={require("@/assets/images/backgroundImage.png")}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover",
                                position: "absolute",
                            }}
                        />
                        <CalibriText
                            style={{
                                position: "absolute",
                                bottom: hp("56%"),
                                fontSize: 20,
                                fontWeight: 500,
                                alignSelf: "flex-start",
                                left: wp("10%"),
                                color: "rgba(32, 3, 96, 1)",
                            }}
                        >
                            Welcome
                        </CalibriText>

                        <LinearGradient
                            colors={[
                                "rgba(131, 100, 232, .8)",
                                "rgba(69, 16, 106, 1)",
                            ]}
                            style={{
                                width: wp("98%"),
                                height: hp("55%"),
                                position: "absolute",
                                bottom: 0,
                                borderRadius: 45,
                            }}
                        >
                            <SignInForm />
                        </LinearGradient>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
};

export default Welcome;

const styles = StyleSheet.create({});
