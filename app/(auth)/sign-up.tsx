import { useOAuth, useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import Toast from 'react-native-toast-message';

import { OAuth } from "@/components/OAuth";
import { icons, images } from "@/app/constants";
import { fetchAPI } from "@/lib/fetch";
import CustomButton from "@/components/customButton";
import { InputField } from "@/components/InputField";


const SignUp = () => {

  const [toastConfig, settoastConfig] = useState({
    type: '',
    text1: '',
    text2: ''

  })
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [check, setCheck] = useState('');
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: '',
    code: "",
    modal: 'no'

  });

  const showToast = (type: string, text1: string, text2: string) => {
    settoastConfig({
      type,
      text1,
      text2
    })

    Toast.show({
      type,
      text1,
      text2
    })
  }

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });


      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
      showToast('success', "account created successfully", "")
    } catch (err: any) {

      Alert.alert('Error', err.errors[0].longMessage)

    }
  };
  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {
        await fetchAPI("", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
          modal: 'yes'
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {

      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[185px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[190px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            onPress={() => {
              onSignUpPress
              showToast('info', 'wait for sign in', '');
            }}
            className=" p-2 mr-4 mt-3"
          />
          <OAuth />
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-2"
          >
            Already have an account?{" "}
            <Text className="text-primary-500">Log In</Text>
          </Link>

        </View>
        <ReactNativeModal isVisible={verification.state === "pending"}

          onModalHide={() => {
            if (verification.modal === "yes") return setShowSuccessModal(true)
          }}
        >

          <View className="bg-white px-7 py-9 rounded-2xl min-h-[370px] ">
            <Text className="text-2xl font-JakartaSemiBold mb-2 ">verification</Text>
            <Text className="font-Jakarta mb-5 ">
              we have sent a verification code to {form.email}

            </Text>
            <InputField label='code' className="" keyboardType="numeric" onChangeText={(myCode) => {
              setVerification({ ...verification, code: myCode })
            }} icon={icons.lock} placeholder="12345" value={verification.code} >
            </InputField>
            <CustomButton
              title="verify email"
              onPress={onPressVerify}
              className=" mx-2 bg-[#00b894] p-3 "
            />


            {verification.error && (


              <View className="flex flex-row mt-4" >

                <Text className="text-red-500 text-sm mt-1">
                  {verification.error}
                </Text>
                <Image source={icons.warning} className="w-[30px] h-[30px] mx-2   " />
              </View>


            )}
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowSuccessModal(true);
                router.push('/(root)/(tabs)/home')

              }}
              className="mt-5  bg-[#586f6b]"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};
export default SignUp;