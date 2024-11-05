// The order to follow is:
// 1. read the BusinessInfo.tsx file in the screens folder
// 2. read this BusinessInfoCard.tsx file
// 3. read the EditBusinessInfoCard.tsx file

// The infoTitle and infoDetails are the props that are passed
// from the BusinessInfo.tsx file to this BusinessInfoCard.tsx file

// So, the future me, don't get confused!

import { Text, useColorScheme, View } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "@/constants/styles/Colors";

interface BusinessInfoCardProps {
    infoTitle: string;
    infoDetails: string;
}

const BusinessInfoCard: React.FC<BusinessInfoCardProps> = ({
    infoTitle,
    infoDetails,
}) => {
    const colorScheme = useColorScheme();

    return (
        <View>
            <View
                style={{
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                    borderBottomColor: Colors[colorScheme ?? "light"].separator,
                    borderBottomWidth: 1,
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
                        // opacity: 0.8,
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

export default BusinessInfoCard;
