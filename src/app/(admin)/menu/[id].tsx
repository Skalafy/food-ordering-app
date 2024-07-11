import { View, Text,Image,StyleSheet, Pressable} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, Stack,useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { defaultImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types'

const product = () => {
  const sizes:PizzaSize[] = ["S", "M", "L", "XL"]
  const { addItem }  =useCart()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M")
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id.toString() === id)
  const addToCart = () => {
    if (!product) {
      return
    }
    addItem(product, selectedSize)
    router.push('/cart')
  }
  if(!product) return (<Text>Product not Found</Text>)
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultImage }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      {/* <Button onPress={addToCart} text="Add to cart"/> */}
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

  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'gainsboro'
  },
 
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical:10
  },
  title: {
    fontSize:20
  }
});
export default product


