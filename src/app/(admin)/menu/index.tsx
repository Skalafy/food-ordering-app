import { StyleSheet, Image, Text, View,FlatList } from "react-native";

import ProductList from "@/src/components/ProductListItem";
import { useProductList } from "@/src/api/products";
import { ActivityIndicator } from "react-native";



export default function TabOneScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) return <Text>Failed to fetch product</Text>;
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return <ProductList product={item} />;
        }}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}


