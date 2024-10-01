import { View, Text, Image } from "react-native";
import React from "react";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "@/constants";

const GoogleTextInput = ({
  containerStyle,
  icon,
  handlePress,
  textInputBackgroundColor,
  initialLocation,
}: GoogleInputProps) => {
  const googlePlacesApikey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  return (
    <View
      className={`flex flex-row items-center  justify-center relative z-50 rounded-2xl ${containerStyle}   mb-5`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="find journey destination!"
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
            position: "relative",
            top: 0,
            width: "100%",
            zIndex: 99,
            borderRadius: 10,
            shadowColor: "d4d4d4",
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApikey,
          language: "en",
        }}
        renderLeftButton={() => (
          <View>
            <Image
              source={icon ? icon : icons.search}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation
            ? initialLocation
            : "where do you want to go",
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
