import React from "react";
import KnightLoading from "../_components/loaders/KnightLoading";

const loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <KnightLoading />
    </div>
  );
};

export default loading;
