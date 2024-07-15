import { Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { Pressable } from "react-native";
import { Text } from "@/src/components/Themed";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
         <Text>HI</Text>
        )
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
