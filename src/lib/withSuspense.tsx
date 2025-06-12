// src/utils/withSuspense.tsx
import React, { Suspense } from "react";

const withSuspense = (
  Component: React.ReactNode,
  fallback = <div>Loading...</div>
) => {
  return <Suspense fallback={fallback}>{Component}</Suspense>;
};

export default withSuspense;
