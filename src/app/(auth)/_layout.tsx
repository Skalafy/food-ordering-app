import { Redirect, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { Pressable } from "react-native";
import { Text } from "@/src/components/Themed";
import { useAuth } from "@/src/providers/AuthProvider";

export default function Layout() {

  const { session } = useAuth();
  if (session) {
    return <Redirect href={'/'}/>
  }
  return (

    <Stack>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
