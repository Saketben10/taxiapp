import CustomButton from '@/components/customButton';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'

import { Link, router } from 'expo-router'
import { Text, View } from 'react-native'
import Toast from 'react-native-toast-message';

export default function Page() {
  const { user } = useUser();
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: 'to profile picture'
    })
  }
  return (
    <View className="flex-1 justify-center items-center bg-slate-500">
      <SignedIn>
        <Text className="text-2xl font-bold mb-4 text-white">
          hii {user?.emailAddresses[0].emailAddress}
        </Text>
        <Text className="text-xl mt-4 text-white">
          Name: {user?.firstName}
        </Text>
        <CustomButton title='profile' onPress={() => {
          showToast
          router.push('/(root)/(tabs)/profile')
        }} />

      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text className="text-lg font-bold py-2 px-4 bg-blue-500 text-white rounded-lg">
            Sign In
          </Text>
        </Link>
        <View className="mt-4">
          <Link href="/(auth)/sign-up">
            <Text className="text-lg font-bold py-2 px-4 bg-green-500 text-white rounded-lg">
              Sign Up
            </Text>
          </Link>
        </View>
      </SignedOut>
    </View>

  )
}