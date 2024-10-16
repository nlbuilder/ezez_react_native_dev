import { Text, TextInput, useColorScheme, View } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/styles/Colors";

interface BusinessInfoCardProps {
    infoTitle: string;
    infoDetails: string;
    onChange: (value: string) => void;
}

const EditBusinessInfoCard: React.FC<BusinessInfoCardProps> = ({
    infoTitle,
    infoDetails,
    onChange,
}) => {
    const colorScheme = useColorScheme();
    const [infoDetailsValue, setInfoDetailsValue] = React.useState(infoDetails);

    return (
        <View>
            <View
                style={{
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                    borderBottomColor:
                        colorScheme === "dark"
                            ? "white"
                            : "rgba(189, 195, 199, 0.8)",
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
                        opacity: 0.8,
                    }}
                >
                    {infoTitle}
                </Text>

                {/* separator between key and item */}
                {/* <View
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
                ></View> */}

                <View
                    style={{
                        borderColor:
                            Colors[colorScheme ?? "light"].tabIconDefault,
                        borderWidth: 1.25,
                        width: wp("80%"),
                        height: hp("4.5%"),
                        borderRadius: 10,
                        left: wp("5%"),
                        justifyContent: "center",
                        marginTop: hp("1%"),
                        opacity: 0.8,
                    }}
                >
                    <TextInput
                        placeholder={infoDetailsValue}
                        placeholderTextColor={
                            colorScheme === "dark"
                                ? "white"
                                : "rgba(189, 195, 199, 0.8)"
                        }
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                            marginLeft: wp("6%"),
                            fontWeight: "400",
                        }}
                        value={infoDetailsValue}
                        onChangeText={(value) => {
                            setInfoDetailsValue(value);
                            onChange(value);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default EditBusinessInfoCard;
