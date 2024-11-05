// The order to follow is:
// 1. read the StaffInfo.tsx file in the screens folder
// 2. read this StaffInfoBriefCard.tsx file
// 3. read the StaffInfoDetails.tsx file

// The businessStaffId, photoUrl, name, and phoneNumber are the props that are passed
// from the StaffInfo.tsx file to this StaffInfoBriefCard.tsx file

// The businessStaffId in this file is passed to the StaffInfoDetails.tsx file (in the screens folder)
// when the user clicks on the info circle icon
// The busisnessStaffId is a unique identifier for each staff member

// So, the future me, don't get confused!

import { Text, useColorScheme, View, Image, Pressable } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

import Colors from "@/constants/styles/Colors";

interface StaffInfoForBusinessCardProps {
    businessStaffId: string;
    photoUrl: string;
    name: string;
    phoneNumber: string;
}

const StaffInfoForBusinessCard: React.FC<StaffInfoForBusinessCardProps> = ({
    businessStaffId,
    photoUrl,
    name,
    phoneNumber,
}) => {
    const colorScheme = useColorScheme();
    const tempStaffPhoto = require("@/assets/images/staffImage.png");

    const handleViewStaffInfoDetails = () => {
        router.navigate({
            pathname:
                "/(authenticated)/components/profile/screens/forBusiness/StaffInfoDetails",
            params: {
                businessStaffId: businessStaffId,
            },
        });
    };

    return (
        <View>
            <View
                style={{
                    borderTopColor: Colors[colorScheme ?? "light"].separator,
                    borderTopWidth: 1,
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                    borderBottomColor: Colors[colorScheme ?? "light"].separator,
                    borderBottomWidth: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: hp("12.5%"),
                    width: wp("100%"),
                    flexDirection: "row",
                }}
            >
                <View>
                    <Image
                        source={
                            photoUrl === ""
                                ? tempStaffPhoto // use the local image when photoUrl is empty
                                : { uri: photoUrl } // use the remote URL if it's provided
                        }
                        style={{
                            width: wp("20%"),
                            height: wp("20%"),
                            borderColor:
                                Colors[colorScheme ?? "light"].tabIconDefault,
                            borderWidth: 1,
                            borderRadius: 100,
                            marginLeft: wp("5%"),
                        }}
                    />
                </View>

                <View>
                    <Text
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                            opacity: 0.8,
                        }}
                    >
                        {name}
                    </Text>

                    {/* separator between key and item */}
                    <View
                        style={{
                            borderBottomColor:
                                Colors[colorScheme ?? "light"].separator,
                            borderBottomWidth: 1,
                            width: wp("50%"),
                            marginTop: hp("1%"),
                        }}
                    ></View>

                    <Text
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                            marginTop: hp("1%"),
                            fontWeight: "400",
                        }}
                    >
                        {phoneNumber}
                    </Text>
                </View>
                <Pressable
                    onPress={() => {
                        handleViewStaffInfoDetails();
                    }}
                >
                    <AntDesign
                        name="infocirlce"
                        size={26}
                        color={"grey"}
                        style={{ marginRight: wp("5%") }}
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default StaffInfoForBusinessCard;
