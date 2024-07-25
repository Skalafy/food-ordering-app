import { FlatList,Text } from "react-native";

import OrderListItem from "../../../components/OrderListItem";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useMyOrderList } from "@/src/api/orders";
export default function OrdersScreen() {
    const { data: orders, isLoading, error } = useMyOrderList();

    if (isLoading) {
      return <ActivityIndicator />;
    }
    if (error) return <Text> Failded to fetch</Text>;
  return (
    <>
      <Stack.Screen options={{ title: "Orders", headerTitleAlign: "center" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
