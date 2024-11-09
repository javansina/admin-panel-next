import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "@/configs/api";

export const useRegister = () => {
  const mutationFn = (data) => api.post("auth/register", data);

  return useMutation({ mutationFn });
};

export const useLogin = () => {
  const mutationFn = (data) => api.post("auth/login", data);

  return useMutation({ mutationFn });
};

export const useCreateProducts = () => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => api.post("products", data);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["all-products"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutationFn = (id) => api.delete(`products/${id}`);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["all-products"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

export const usePutProduct = (id) => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => api.put(`products/${id}`, data);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["all-products"] });
  };

  return useMutation({ mutationFn, onSuccess });
};
