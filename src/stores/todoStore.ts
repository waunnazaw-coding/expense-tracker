import { create } from "zustand";
import { produce } from "immer";
import { ToDoItem } from "@/types/index";

interface ToDoStore {
  // All todos (for non-paged views)
  todos: ToDoItem[];
  // Paged todos with metadata
  pagedTodos: ToDoItem[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  // State actions
  addLocalTodo: (todo: ToDoItem) => void;
  setTodos: (todos: ToDoItem[]) => void;
  setPagedTodos: (
    data: { tasks: ToDoItem[]; totalCount: number },
    page: number,
    size: number,
  ) => void;
  updateLocalTodo: (updatedTodo: ToDoItem) => void;
  deleteLocalTodo: (taskId: number) => void;
}

export const useToDoStore = create<ToDoStore>((set) => ({
  todos: [],
  pagedTodos: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: 12,

  // Add todo to both lists if it belongs to current page
  addLocalTodo: (todo) =>
    set((state) =>
      produce(state, (draft) => {
        draft.todos.push(todo);

        // Add to paged list if it fits current page
        const isInCurrentPage = draft.pagedTodos.length < draft.pageSize;
        if (isInCurrentPage) {
          draft.pagedTodos.push(todo);
          draft.totalCount += 1;
        }
      }),
    ),

  // Replace all todos
  setTodos: (todos) => set({ todos }),

  // Set paged results
  setPagedTodos: (data, page, size) =>
    set({
      pagedTodos: data.tasks,
      totalCount: data.totalCount,
      currentPage: page,
      pageSize: size,
    }),

  // Update todo in both lists
  updateLocalTodo: (updatedTodo) =>
    set((state) =>
      produce(state, (draft) => {
        // Update in all todos
        const allIndex = draft.todos.findIndex(
          (t) => t.taskId === updatedTodo.taskId,
        );
        if (allIndex !== -1) draft.todos[allIndex] = updatedTodo;

        // Update in paged todos
        const pagedIndex = draft.pagedTodos.findIndex(
          (t) => t.taskId === updatedTodo.taskId,
        );
        if (pagedIndex !== -1) draft.pagedTodos[pagedIndex] = updatedTodo;
      }),
    ),

  // Delete todo from both lists
  deleteLocalTodo: (taskId) =>
    set((state) =>
      produce(state, (draft) => {
        // Remove from all todos
        draft.todos = draft.todos.filter((t) => t.taskId !== taskId);
        // Remove from paged todos and adjust total count
        const wasInPaged = draft.pagedTodos.some((t) => t.taskId === taskId);
        draft.pagedTodos = draft.pagedTodos.filter((t) => t.taskId !== taskId);
        if (wasInPaged) draft.totalCount = Math.max(draft.totalCount - 1, 0);
      }),
    ),
  //test
}));
