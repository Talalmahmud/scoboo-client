import SearchPage from "@/components/custompages/search-page";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default page;
