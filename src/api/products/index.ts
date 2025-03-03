import { supabase } from "@/src/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useProduct = (id: number) => {
  console.log('id in function',id)
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id).single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertProduct = () => {
  const queryClient=useQueryClient()
  return useMutation({
    async mutationFn(data: any) {
      const { error, data:newProduct } = await supabase.from('products').insert({
        name: data.name,
        image: data.selectedImage,
        price: data.price,
      }).single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
     await queryClient.invalidateQueries(['products'])
    },
     
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      console.log("data",data)
      const { data: updatedProduct, error } = await supabase
        .from('products')
        .update({
          name: data.name,
          image: data.selectedImage,
          price: data.price,
        }).eq('id', data.id)
        .select()
        .single();
      console.log("UpdatedProduct", updatedProduct)
      if (error) {
        throw error;
      }
      
      return updatedProduct;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(['products']);
      await queryClient.invalidateQueries(['product',  id]);
    },
    onError(error) {
      console.log(error);
    },
  });
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id: number) {
      await supabase.from('products').delete().eq('id', id);
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['products'])
    }
  })
}

