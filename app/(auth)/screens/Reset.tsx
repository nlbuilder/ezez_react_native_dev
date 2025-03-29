import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import { View } from "@/constants/styles/Themed";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";

import { CalibriText } from "@/constants/styles/StyledText";
import ResetForm from "../components/authComponents/ResetForm";
import BackgroundImage from "@/assets/images/backgroundImage.png";

const Reset = () => {
    return (
        <>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                            backgroundColor: "rgba(189, 195, 199, .8)",
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
                                left: wp("15%"),
                                color: "rgba(32, 3, 96, 1)",
                            }}
                        >
                            Reset
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
                            <ResetForm />
                        </LinearGradient>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
};

export default Reset;

const styles = StyleSheet.create({});
