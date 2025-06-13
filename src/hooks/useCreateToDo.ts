import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axioInstance";
import { ToDoItem } from "@/types/index";

const createTodo = async (todo: ToDoItem): Promise<ToDoItem> => {
  const response = await api.post("/Task", todo);
  return response.data;
};

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation<ToDoItem, Error, ToDoItem>({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
