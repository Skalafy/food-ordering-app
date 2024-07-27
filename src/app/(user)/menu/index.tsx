import { StyleSheet, Image, Text, View,FlatList, AccessibilityInfo, ActivityIndicator } from "react-native";
import products from "../../../../assets/data/products";
import ProductList from "@/src/components/ProductListItem";
import { useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useProductList } from "@/src/api/products";


export default function TabOneScreen() {
  const { data: products, error, isLoading } = useProductList();
 

  if (isLoading) {
    return <ActivityIndicator />;
  }
  
  if(error) return <Text>Failed to fetch product</Text>
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


