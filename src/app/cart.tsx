import { View, Text,Platform,FlatList} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import Button from '../components/Button';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';

const CartScreen = () => {
  const { items,total } = useCart()
  
  return (
    <View style={{padding:5}}>
      <FlatList data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />
        }
        contentContainerStyle={{ padding: 10, gap: 10 }} />
      <Text style={{marginTop:20,fontSize:20,fontWeight:500}}>Total: ${total}</Text>
      <Button text="Checkout"></Button>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

export default CartScreen