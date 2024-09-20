
import { Redirect } from "expo-router";
import { useAuth } from '@clerk/clerk-expo'

const Page = () => {

  const { isSignedIn } = useAuth();


  if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />
  else {

    return <Redirect href="/(auth)/welcome" />;
  }
};

export default Page;