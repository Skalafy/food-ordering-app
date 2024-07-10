import { StyleSheet, Image, Text, View,FlatList } from "react-native";
import products from "../../../../assets/data/products";
import ProductList from "@/src/components/ProductListItem";



export default function TabOneScreen() {
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


