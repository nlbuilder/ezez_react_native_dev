import {
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    StatusBar,
} from "react-native";
import { View } from "@/constants/styles/Themed";
import React, { useEffect, useState } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "@/constants/styles/Colors";
import { CalibriText } from "@/constants/styles/StyledText";
import SignUpForm from "../components/authComponents/SignUpForm";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const SignUp = () => {
    // const [keyboardVisible, setKeyboardVisible] = useState(false);

    // useEffect(() => {
    //     const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
    //         setKeyboardVisible(true)
    //     );
    //     const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
    //         setKeyboardVisible(false)
    //     );

    //     return () => {
    //         showSubscription.remove();
    //         hideSubscription.remove();
    //     };
    // }, []);

    return (
        <>
            {/* <StatusBar hidden={keyboardVisible} /> */}

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
                            SignUp
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
                            <SignUpForm />
                        </View>
                    </View>

                    {/* Back button */}
                    {/* <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            position: "absolute",
                            // top: hp("28%"),
                            alignSelf: "flex-start",
                            left: wp("2.5%"),
                        }}
                    >
                        <Pressable
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                            onPress={() => {
                                router.push({
                                    pathname: "/(auth)/screens/Welcome",
                                });
                            }}
                        >
                            <AntDesign
                                name="arrowleft"
                                size={24}
                                color="black"
                                style={{ marginRight: 8 }}
                            />
                            <Text>Back</Text>
                        </Pressable>
                    </View> */}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
};

export default SignUp;

const styles = StyleSheet.create({});
