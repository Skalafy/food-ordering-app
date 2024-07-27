import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import { defaultImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { useDeleteProduct, useInsertProduct, useProduct } from "@/src/api/products";
import { useUpdateProduct } from "@/src/api/products";
import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/src/lib/supabase";
import { decode } from 'base64-arraybuffer'


const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString?.[0]);
  
  const isUpdating = !!idString;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { data: updatingProduct } = useProduct(id)

  const router = useRouter();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setSelectedImage(updatingProduct.image)
   }
 },[updatingProduct])

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetField();
        router.replace('/(admin)')
      }
    })
  };
  const confirmDelete = () => {
    Alert.alert("Confirm ", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };
  const resetField = () => {
    setName("");
    setPrice("");
  };
  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };
  const onUpdate = async() => {
    console.warn("Update Product");
    //save in database
    const imagePath = await uploadImage();
    
    updateProduct(
      { id, name, price: parseFloat(price), selectedImage:imagePath},
      {
        onSuccess: () => {
          resetField();
          router.back();
        },
      }
    );
    
  };
  const onCreate = async() => {
    console.warn("Create Product");
    //save in database
    const imagePath = await uploadImage();
    
    insertProduct(
      { name, price: parseFloat(price), selectedImage:imagePath },
      {
        onSuccess: () => {
          resetField();
          router.back();
        },
      }
    );
    resetField();
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const uploadImage = async () => {
    if (!selectedImage?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(selectedImage, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });
    
    if (data) {
     
      return data.path;
    }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      <Image
        source={{ uri: selectedImage || defaultImage }}
        style={styles.image}
      />
      <Text style={styles.textbutton} onPress={pickImageAsync}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <Text style={styles.label}>\Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Button text={isUpdating ? " Update" : "create"} onPress={onSubmit} />
      {isUpdating && (
        <Text style={styles.textbutton} onPress={confirmDelete}>
          Delete
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textbutton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default CreateProductScreen;
