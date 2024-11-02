import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import React from "react";

import Colors from "@/constants/styles/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const PlusButton = ({ onPress }: { onPress: () => void }) => {
    const colorScheme = useColorScheme();

    return (
        <View style={{ flexDirection: "row" }}>
            <Pressable
                style={[
                    styles.plusButton,
                    {
                        backgroundColor:
                            Colors[colorScheme ?? "light"].background,
                    },
                ]}
                onPress={onPress}
            >
                <AntDesign
                    name="pluscircle"
                    size={52}
                    color={Colors[colorScheme ?? "light"].tint}
                />
            </Pressable>
        </View>
    );
};

export default PlusButton;

const styles = StyleSheet.create({
    plusButton: {
        bottom: hp(3),
        width: wp(15.5),
        height: hp(6.9),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
});
