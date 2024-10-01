import { useCallback, useState } from "react";
import { OAuth } from "@/components/OAuth";
import { Link, useRouter } from "expo-router";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Alert, Image, Text, View } from "react-native";
import { InputField } from "@/components/InputField";
import CustomButton from "@/components/customButton";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const signin = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const router = useRouter();

  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const [toastConfig, settoastConfig] = useState({
    type: "",
    text1: "",
    text2: "",
  });

  const showToast = (type: string, text1: string, text2: string) => {
    settoastConfig({
      type,
      text1,
      text2,
    });

    Toast.show({
      type,
      text1,
      text2,
    });
  };

  const onSigninPress = useCallback(async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        router.replace("/(root)/home");
      } else {
        Alert.alert("error", JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      showToast("success", JSON.stringify(err, null, 2), "");
      // Alert.alert('error', JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1   bg-white">
        <View className="flex-1 bg-white">
          <View className="relative w-full h-[250px]">
            <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
            <Text className="font-semibold text-2xl font-JakartaBold absolute bottom-5 left-5">
              Welcome
            </Text>
          </View>
          <View className="mx-4">
            <InputField
              label="Email"
              placeholder="Enter Your Name"
              icon={icons.email}
              value={form.email}
              onChangeText={(value) =>
                setform({
                  ...form,
                  email: value,
                })
              }
            />
            <InputField
              label="Password"
              placeholder="Enter Your Password"
              icon={icons.person}
              value={form.password}
              secureTextEntry={true}
              onChangeText={(value) =>
                setform({
                  ...form,
                  password: value,
                })
              }
            />
            <CustomButton
              title="Sign-up"
              className="mt-6 ml-2  bg-[#08b3f1]"
              onPress={() => {
                onSigninPress;
                showToast("success", "logged-in", "");
              }}
            />

            <OAuth />
            <Link href={`/(auth)/sign-up`} className="text-lg text-center  ">
              <Text>Don't have an account ?</Text>
              <Text className="text-primary-500">Create an account</Text>
            </Link>
          </View>
          {/* //FIXME: have  to add verfifcation modal inside here  */}
          {/* verification modal */}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default signin;
