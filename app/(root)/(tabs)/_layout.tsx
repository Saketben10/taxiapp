import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
  >
    <View
      className={`rounded-full w-14 h-12 items-center justify-center ${focused ? "bg-[#f6f6f6]" : ""}`}
    >
      <Image
        source={source}
        tintColor={`${focused ? "#1abc9c" : "white"}`}
        resizeMode="contain"
        className="w-7 h-7"
      />
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1abc9c",
          //   borderRadius: 20,
          paddingBottom: 0, // ios only
          //   overflow: "hidden",
          //   marginHorizontal: 20,
          //   marginBottom: 20,
          height: 80,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          //   flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "ride",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="confirm-ride"
        options={{
          title: "ride",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.to} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="book-ride"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.lock} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
