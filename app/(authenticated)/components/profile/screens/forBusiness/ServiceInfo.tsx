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
import ServiceInfoBriefCard from "../../components/services/forBusiness/ServiceInfoBriefCard";
import { useGetAllServicesAPI } from "../../apis/getAllServicesAPI";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import { useToast } from "@/app/(authenticated)/utils/toasts/toastContext";

const ServiceInfo = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const { message, clearToast } = useToast();

    const auth = useAuth();
    const businessId = auth?.user?.uid;

    const {
        allServicesInfo,
        refetch: refetchGetAllServicesInfo,
        isLoading: isGetAllServicesInfoLoading,
    } = useGetAllServicesAPI();

    const serviceDataBrief = Array.isArray(allServicesInfo)
        ? allServicesInfo.map((item) => ({
              businessId: item.businessId,
              serviceId: item.serviceId,
              photoURL: item.photoURL,
              serviceName: item.serviceName,
              price: item.price,
          }))
        : [];

    // handle the header when this screen is rendered
    useEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back",
            headerTitle: "List of Services",
            presentation: "card",

            headerRight: () => (
                // add service button
                <Pressable
                    onPress={() =>
                        router.push({
                            pathname:
                                "/(authenticated)/components/profile/screens/forBusiness/AddService",
                            params: {
                                businessId: businessId,
                            },
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
                            name={"pluscircleo"}
                            size={24}
                            color={
                                Colors[colorScheme ?? "light"].tabIconSelected
                            }
                        />
                    </View>
                </Pressable>
            ),
        });

        // refetchGetAllServicesInfo();
    }, [navigation, colorScheme, allServicesInfo]);

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

    if (isGetAllServicesInfoLoading) {
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

    if (!allServicesInfo) {
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
                    No service added yet.
                </Text>
            </View>
        );
    }

    return (
        <View>
            {/* handle the Flastlist */}
            <FlatList
                data={Array.isArray(serviceDataBrief) ? serviceDataBrief : []}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                renderItem={({ item }) => (
                    <ServiceInfoBriefCard
                        serviceId={item.serviceId ?? ""}
                        photoUrl={item.photoURL ?? ""}
                        serviceName={item.serviceName ?? ""}
                        price={item.price ?? ""}
                    />
                )}
            />

            <Toast />
        </View>
    );
};

export default ServiceInfo;
