import { useQuery } from "@tanstack/react-query";
import api from "@/configs/api";

export const useGetAllProducts = (page = 1) => {
  const queryFn = () => api.get(`products?page=${page}&limit=10`);
  const queryKey = ["all-products", page];
  return useQuery({ queryKey, queryFn });
};

export const useGetProductById = (id) => {
  const queryFn = () => api.get(`/products/${id}`);
  const queryKey = [`products/${id}`];
  return useQuery({
    queryKey,
    queryFn,
  });
};
