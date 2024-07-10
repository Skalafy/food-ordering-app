import { View, Text,Image,StyleSheet, Pressable} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'
import products from '@/assets/data/products'
import { defaultImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
 

const product = () => {
  const sizes = ["S", "M", "L", "XL"]

  const [selectedSize, setSelectedSize] = useState("M")
  
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id.toString() === id)
  const addToCart = () => {
    console.warn("Added to cart,",'size :',selectedSize)
  }
  if(!product) return (<Text>Product not Found</Text>)
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


