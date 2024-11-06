import {
    Pressable,
    useColorScheme,
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { router, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";

import Colors from "@/constants/styles/Colors";
import { useGetBusinessInfoAPI } from "@/app/(authenticated)/components/profile/apis/getBusinessInfoAPI";
import StaffInfoBriefCard from "@/app/(authenticated)/components/profile/components/auth/forBusiness/StaffInfoBriefCard";
import { useToast } from "@/app/(authenticated)/utils/toasts/toastContext";

const StaffInfo = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const { message, clearToast } = useToast();

    const {
        currentBusinessInfo,
        refetch,
        isLoading: isGetBusinessInfoLoading,
    } = useGetBusinessInfoAPI();

    const staffDataBrief = Array.isArray(currentBusinessInfo?.listOfStaff)
        ? currentBusinessInfo?.listOfStaff.map((item) => ({
              businessStaffId: item.businessStaffId,
              photoURL: item.photoURL,
              name: item.name,
              phoneNumber: item.phoneNumber,
              email: item.email,
              role: item.role,
          }))
        : [];

    // handle the header when this screen is rendered
    useEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back",
            headerTitle: "List of Staffs",
            presentation: "card",
            headerTitleStyle: {
                borderColor: Colors[colorScheme ?? "light"].separator,
                borderWidth: 1,
            },

            headerRight: () => (
                // add staff button
                <Pressable
                    onPress={() =>
                        router.navigate({
                            pathname:
                                "/(authenticated)/components/profile/screens/forBusiness/AddStaffInfo",
                        })
                    }
                >
                    <View
                        style={{
                            alignSelf: "flex-end",
                            paddingHorizontal: 15,
                        }}
                    >
                        <AntDesign
                            name={"adduser"}
                            size={24}
                            color={
                                Colors[colorScheme ?? "light"].tabIconSelected
                            }
                        />
                    </View>
                </Pressable>
            ),
        });

        refetch();
    }, [navigation, colorScheme, currentBusinessInfo]);

    // show toast message if there is any
    useEffect(() => {
        if (message) {
            Toast.show({
                type: "success",
                text1: "Success",
                text2: message,
                position: "bottom",
                bottomOffset: hp("2%"),
            });

            clearToast();
        }
    }, [message]);

    if (isGetBusinessInfoLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                }}
            >
                <ActivityIndicator
                    size="small"
                    color={Colors[colorScheme ?? "light"].tabIconDefault}
                />
            </View>
        );
    }

    if (
        currentBusinessInfo?.listOfStaff?.length === 0 ||
        !currentBusinessInfo?.listOfStaff?.length
    ) {
        return (
            <View
                style={{
                    flex: 1,

                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                }}
            >
                <Text
                    style={{
                        color: Colors[colorScheme ?? "light"].text,
                        fontSize: 14,
                        marginBottom: hp("20%"),
                    }}
                >
                    No staff added yet.
                </Text>
            </View>
        );
    }

    return (
        <View style={{}}>
            {/* handle the Flastlist */}
            <FlatList
                data={Array.isArray(staffDataBrief) ? staffDataBrief : []}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                renderItem={({ item }) => (
                    <StaffInfoBriefCard
                        businessStaffId={item.businessStaffId ?? ""}
                        photoUrl={item.photoURL ?? ""}
                        name={item.name ?? ""}
                        phoneNumber={item.phoneNumber ?? ""}
                    />
                )}
            />
            <Toast />
        </View>
    );
};

export default StaffInfo;
