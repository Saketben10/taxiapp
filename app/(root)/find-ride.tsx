import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";

const findRide = () => {
  const {
    destinationAddress,
    userAddress,
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  return (
    <View className="h-full flex justify-center items-center">
      <Text className="text- 2xl"> you are here: {userAddress}</Text>
      <Text className="text- 2xl">
        {" "}
        you want to go here : {destinationAddress}
      </Text>
    </View>
  );
};

export default findRide;
