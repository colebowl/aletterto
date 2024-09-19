import React from "react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen container mx-auto p-4 bg-white dark:bg-slate-800 mb-10">
      {children}
    </div>
  );
};

export default Wrapper;
