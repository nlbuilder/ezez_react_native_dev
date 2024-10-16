import {
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { router, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "@/constants/styles/Colors";

const Settings = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    // handle the header when this screen is rendered
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Settings",
            headerBackTitle: "Back",
            presentation: "card",
        });
    }, [navigation]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors[colorScheme ?? "light"].background,
            }}
        >
            <Text
                style={{
                    marginTop: wp("5%"),
                    marginBottom: 5,
                    marginLeft: wp("10%"),
                    color: Colors[colorScheme ?? "light"].text,
                }}
            >
                Danger Zone
            </Text>

            <View
                style={{
                    width: wp("86%"),
                    height: hp("10%"),
                    borderColor: "rgba(192,88,88,1)",
                    borderWidth: 1,
                    borderRadius: 15,
                    alignSelf: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "red", margin: wp("5%") }}>
                        Delete business account
                    </Text>

                    <Pressable
                        onPress={() => {
                            router.push({
                                pathname:
                                    "/(authenticated)/components/profile/screens/forBusiness/DeleteBusiness",
                            });
                        }}
                    >
                        <MaterialCommunityIcons
                            name="delete-forever"
                            size={24}
                            color="red"
                            style={{
                                marginLeft: wp("20%"),
                            }}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({});
