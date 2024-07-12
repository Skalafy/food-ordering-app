import { View, Text,StyleSheet,TextInput,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/Button';
import { defaultImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from 'expo-router';
const CreateProductScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const { id } = useLocalSearchParams();
  const isUpdating = !!id;
  const onDelete = () => {
    console.warn("Delete!!!!!!!!")
  }
  const confirmDelete = () => {
    Alert.alert("Confirm ", 'Are you sure you want to delete this product?', [
      {
        text:"Cancel"
      },
      {
        text: "Delete",
        style: 'destructive',
        onPress:onDelete
      }
    ])
  }
  const resetField = () => {
    setName("")
    setPrice("")
  }
  const onSubmit = () => {
    if (isUpdating) {
      onUpdateCreate()
    } else {
      onCreate()
    }
  }
  const onUpdateCreate = () => {
    console.warn("Update Product");
    //save in database
    resetField();
  };
  const onCreate = () => {
    console.warn("Create Product")
    //save in database
    resetField()
  }
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: isUpdating? 'Update Product':'Create Product'}} />
      <Image source={{ uri: selectedImage||defaultImage }} style={styles.image} />
      <Text style={styles.textbutton} onPress={pickImageAsync}>Select Image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input} />

      <Text style={styles.label}>\Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType='numeric' />

      <Button text={isUpdating ? " Update" : "create"} onPress={onSubmit} />
      {isUpdating && (<Text style={{justifyContent:'center'}} onPress={confirmDelete}>Delete</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding:10
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom:20,
  },
  label: {
    color: 'gray',
    fontSize:16,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf:'center'
  },
  textbutton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical:10,
  }
})

export default CreateProductScreen