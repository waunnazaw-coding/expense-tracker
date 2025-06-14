// import { useState, useEffect } from "react";
// import type { ToDoItem } from "@/types/index";
// import { useTodosPaged } from "@/hooks/useToDo";
// import { useToDoStore } from "@/stores/todoStore";
// import { Loader2, Calendar, CheckCircle, XCircle } from "lucide-react";

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardDescription,
//   CardFooter,
// } from "@/components/ui/card";

// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// import { Badge } from "@/components/ui/badge";

// export default function PagedToDoList() {
//   const [page, setPage] = useState(1);
//   const pageSize = 12;

//   const { data, isLoading, error } = useTodosPaged(page, pageSize);
//   const setPagedTodos = useToDoStore((state) => state.setPagedTodos);

//   useEffect(() => {
//     if (data) {
//       setPagedTodos(data, page, pageSize);
//     }
//   }, [data, page, pageSize, setPagedTodos]);

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= (data?. ?? 1)) {
//       setPage(newPage);
//     }
//   };

//   const renderPaginationItems = () => {
//     if (!data) return null;

//     const { tasks } = data;
//     const items = [];

//     // Previous button
//     items.push(
//       <PaginationItem key="prev">
//         <PaginationPrevious
//           onClick={() => handlePageChange(currentPage - 1)}
//           className={
//             currentPage === 1
//               ? "pointer-events-none opacity-50"
//               : "cursor-pointer"
//           }
//         />
//       </PaginationItem>,
//     );

//     // Page numbers
//     const showEllipsisStart = currentPage > 3;
//     const showEllipsisEnd = currentPage < totalPages - 2;

//     // First page
//     if (showEllipsisStart) {
//       items.push(
//         <PaginationItem key={1}>
//           <PaginationLink
//             onClick={() => handlePageChange(1)}
//             className="cursor-pointer"
//           >
//             1
//           </PaginationLink>
//         </PaginationItem>,
//       );
//       items.push(
//         <PaginationItem key="ellipsis-start">
//           <PaginationEllipsis />
//         </PaginationItem>,
//       );
//     }

//     // Current page and surrounding pages
//     const startPage = Math.max(1, currentPage - 1);
//     const endPage = Math.min(totalPages, currentPage + 1);

//     for (let i = startPage; i <= endPage; i++) {
//       items.push(
//         <PaginationItem key={i}>
//           <PaginationLink
//             onClick={() => handlePageChange(i)}
//             isActive={i === currentPage}
//             className="cursor-pointer"
//           >
//             {i}
//           </PaginationLink>
//         </PaginationItem>,
//       );
//     }

//     // Last page
//     if (showEllipsisEnd) {
//       items.push(
//         <PaginationItem key="ellipsis-end">
//           <PaginationEllipsis />
//         </PaginationItem>,
//       );
//       items.push(
//         <PaginationItem key={totalPages}>
//           <PaginationLink
//             onClick={() => handlePageChange(totalPages)}
//             className="cursor-pointer"
//           >
//             {totalPages}
//           </PaginationLink>
//         </PaginationItem>,
//       );
//     }

//     // Next button
//     items.push(
//       <PaginationItem key="next">
//         <PaginationNext
//           onClick={() => handlePageChange(currentPage + 1)}
//           className={
//             currentPage === totalPages
//               ? "pointer-events-none opacity-50"
//               : "cursor-pointer"
//           }
//         />
//       </PaginationItem>,
//     );

//     return items;
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col items-center justify-center h-64 space-y-4">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//           <p className="text-lg font-semibold text-muted-foreground">
//             Loading your tasks...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col items-center justify-center h-64 space-y-4">
//           <XCircle className="h-12 w-12 text-destructive" />
//           <div className="text-center">
//             <h3 className="text-lg font-semibold text-destructive mb-2">
//               Something went wrong
//             </h3>
//             <p className="text-muted-foreground">{error.message}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!data || data.tasks.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col items-center justify-center h-64 space-y-4">
//           <CheckCircle className="h-12 w-12 text-muted-foreground" />
//           <div className="text-center">
//             <h3 className="text-lg font-semibold text-muted-foreground mb-2">
//               No tasks found
//             </h3>
//             <p className="text-muted-foreground">You're all caught up!</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const { tasks, totalCount, currentPage, totalPages } = data;

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
//       {/* Header */}
//       <div className="text-center space-y-2">
//         <h2 className="text-3xl font-bold tracking-tight">To-Do List</h2>
//         <p className="text-muted-foreground">
//           Showing {tasks.length} of {totalCount} tasks (Page {currentPage} of{" "}
//           {totalPages})
//         </p>
//       </div>

//       {/* Tasks Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {tasks.map((todo: ToDoItem) => (
//           <Card
//             key={todo.taskId}
//             className="flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-200 border-l-4"
//             style={{
//               borderLeftColor: todo.isCompleted ? "#22c55e" : "#ef4444",
//             }}
//           >
//             <CardHeader className="pb-3">
//               <div className="flex items-start justify-between gap-2">
//                 <CardTitle className="text-lg font-semibold line-clamp-2 flex-1">
//                   {todo.title}
//                 </CardTitle>
//                 <Badge
//                   variant={todo.isCompleted ? "default" : "secondary"}
//                   className="shrink-0"
//                 >
//                   {todo.isCompleted ? "Done" : "Pending"}
//                 </Badge>
//               </div>
//             </CardHeader>

//             <CardContent className="flex-1 pb-3">
//               <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4">
//                 {todo.description || "No description provided"}
//               </CardDescription>

//               {todo.dueDate && (
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Calendar className="h-4 w-4" />
//                   <span>
//                     Due{" "}
//                     {new Date(todo.dueDate).toLocaleDateString(undefined, {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </span>
//                 </div>
//               )}
//             </CardContent>

//             <CardFooter className="pt-0">
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 {todo.isCompleted ? (
//                   <CheckCircle className="h-4 w-4 text-green-600" />
//                 ) : (
//                   <XCircle className="h-4 w-4 text-red-600" />
//                 )}
//                 <span
//                   className={
//                     todo.isCompleted ? "text-green-600" : "text-red-600"
//                   }
//                 >
//                   {todo.isCompleted ? "Completed" : "Incomplete"}
//                 </span>
//               </div>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center">
//           <Pagination>
//             <PaginationContent>{renderPaginationItems()}</PaginationContent>
//           </Pagination>
//         </div>
//       )}
//     </div>
//   );
// }

import React from "react";

const PageToDoListCard = () => {
  return <div></div>;
};

export default PageToDoListCard;
