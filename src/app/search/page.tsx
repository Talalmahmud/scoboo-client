import SearchPage from "@/components/pages/search-page";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default page;
