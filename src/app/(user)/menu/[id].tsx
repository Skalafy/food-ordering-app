import { View, Text,Image,StyleSheet, Pressable} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, Stack,useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { defaultImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types'
import { useProduct } from '@/src/api/products'
import { ActivityIndicator } from 'react-native'

 
const product = () => {
  const sizes:PizzaSize[] = ["S", "M", "L", "XL"]
  const { addItem }  =useCart()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M")
  const router = useRouter();
 
  const { id: idString } = useLocalSearchParams();
  

  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  console.log("id", id);

  const { data: product, error, isLoading } = useProduct(id);
  console.log('product',product)


  const addToCart = () => {
    if (!product) {
      return
    }
    addItem(product, selectedSize)
    router.push('/cart')
  }
   if (isLoading) {
     return <ActivityIndicator />;
   }

   if (error) return <Text>Failed to fetch product</Text>;
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultImage }}
        style={styles.image}
      />
      <Text>select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor:
                  size === selectedSize ? "lightblue" : 'gainsboro'
              },
            ]}
          >
            <Text style={styles.sizeText}>{size}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart"/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop:'auto'
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'gainsboro'
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical:10
  },
});
export default product


