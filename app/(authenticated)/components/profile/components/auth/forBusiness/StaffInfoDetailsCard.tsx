import { Text, useColorScheme, View } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/styles/Colors";

interface StaffInfoDetailsCardProps {
    infoTitle: string;
    infoDetails: string;
}

const StaffInfoDetailsCard: React.FC<StaffInfoDetailsCardProps> = ({
    infoTitle,
    infoDetails,
}) => {
    const colorScheme = useColorScheme();

    return (
        <View>
            <View
                style={{
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                    borderTopColor:
                        colorScheme === "dark"
                            ? "white"
                            : "rgba(189, 195, 199, 0.8)",
                    borderTopWidth: 1,
                    borderBottomColor:
                        colorScheme === "dark"
                            ? "white"
                            : "rgba(189, 195, 199, 0.8)",
                    // borderBottomWidth: 1,
                    justifyContent: "center",
                    alignSelf: "center",
                    height: hp("10%"),
                    width: wp("90%"),
                }}
            >
                <Text
                    style={{
                        color: Colors[colorScheme ?? "light"].text,
                        marginLeft: wp("10%"),
                        opacity: 0.8,
                    }}
                >
                    {infoTitle}
                </Text>

                {/* separator between key and item */}
                <View
                    style={{
                        borderBottomColor:
                            colorScheme === "dark"
                                ? "white"
                                : "rgba(189, 195, 199, 0.5)",
                        borderBottomWidth: 1,
                        width: wp("50%"),
                        marginLeft: wp("10%"),
                        marginTop: hp("1%"),
                    }}
                ></View>

                <Text
                    style={{
                        color: Colors[colorScheme ?? "light"].text,
                        marginLeft: wp("10%"),
                        marginTop: hp("1%"),
                        fontWeight: "400",
                    }}
                >
                    {infoDetails}
                </Text>
            </View>
        </View>
    );
};

export default StaffInfoDetailsCard;
