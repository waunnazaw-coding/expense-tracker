import { create } from "zustand";
import { produce } from "immer";
import { ToDoItem } from "@/types/index";

interface ToDoStore {
  todos: ToDoItem[];
  addLocalTodo: (todo: ToDoItem) => void;
  setTodos: (todos: ToDoItem[]) => void;
}

export const useToDoStore = create<ToDoStore>((set) => ({
  todos: [],
  addLocalTodo: (todo) =>
    set((state) => ({
      todos: produce(state.todos, (draft) => {
        draft.push(todo);
      }),
    })),
  setTodos: (todos) => set({ todos }),
}));
