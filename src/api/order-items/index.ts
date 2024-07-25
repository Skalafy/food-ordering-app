import { useQueryClient,useMutation,useQuery } from "@tanstack/react-query";
import { useAuth } from "@/src/providers/AuthProvider";
import { InsertTables,Tables } from "@/src/types";
import { supabase } from "@/src/lib/supabase";


export const useInsertOrderItems = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    async mutationFn(items: InsertTables<'order_items'>[]) {
          const { error, data: newProduct } = await supabase.from('order_items').insert(items)
              .select();
        

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
   
     
  })
}