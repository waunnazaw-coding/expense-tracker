// src/router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import withSuspense from "@/lib/withSuspense";
import RootLayoutPage from "@/pages/RootLayoutPage";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import DashboardPage from "@/pages/DashboardPage";
import ExpensesPage from "@/pages/ExpensePage";
import ExpenseNewPage from "@/pages/ExpenseNewPage";
import ExpenseEditPage from "@/pages/ExpenseEditPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import ToDoPage from "@/pages/ToDoPage";
import ToDoNewPage from "@/pages/ToDoNewPage";
import PagedToDoList from "@/components/todo/PageToDoListCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<RootLayoutPage />),
    errorElement: withSuspense(<ErrorPage />),
    children: [
      {
        index: true,
        element: withSuspense(<HomePage />),
      },
      {
        path: "login",
        element: withSuspense(<LoginPage />),
      },
      {
        path: "signup",
        element: withSuspense(<SignUpPage />),
      },
      {
        path: "dashboard",
        element: withSuspense(<DashboardPage />),
      },
      {
        path: "todo",
        element: withSuspense(<ToDoPage />),
      },
      {
        path: "todo-new",
        element: withSuspense(<ToDoNewPage />),
      },
      {
        path: "pagination-todo",
        element: withSuspense(<PagedToDoList />),
      },
      {
        path: "expenses",
        children: [
          {
            index: true,
            element: withSuspense(<ExpensesPage />),
          },
          {
            path: "new",
            element: withSuspense(<ExpenseNewPage />),
          },
          {
            path: ":expenseId/edit",
            element: withSuspense(<ExpenseEditPage />),
          },
        ],
      },
      {
        path: "profile",
        element: withSuspense(<ProfilePage />),
      },
      {
        path: "settings",
        element: withSuspense(<SettingsPage />),
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
