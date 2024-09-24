import { View, Text, Image } from "react-native";
import React from "react";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({
  containerStyle,
  icon,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center  justify-center relative z-50 rounded-2xl ${containerStyle}   mb-5`}
    >
      <Text>search</Text>
    </View>
  );
};

export default GoogleTextInput;
