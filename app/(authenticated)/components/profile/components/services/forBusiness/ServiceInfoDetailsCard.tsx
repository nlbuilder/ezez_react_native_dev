import { Text, useColorScheme, View } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/styles/Colors";

interface ServiceInfoDetailsCardProps {
    infoTitle: string;
    infoDetails: string;
}

const ServiceInfoDetailsCard: React.FC<ServiceInfoDetailsCardProps> = ({
    infoTitle,
    infoDetails,
}) => {
    const colorScheme = useColorScheme();

    return (
        <View>
            <View
                style={{
                    backgroundColor: Colors[colorScheme ?? "light"].background,

                    borderTopColor: Colors[colorScheme ?? "light"].separator,
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
                {/* title */}
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
                            Colors[colorScheme ?? "light"].separator,
                        borderBottomWidth: 1,
                        width: wp("50%"),
                        marginLeft: wp("10%"),
                        marginTop: hp("1%"),
                    }}
                ></View>

                {/* details */}
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

export default ServiceInfoDetailsCard;
