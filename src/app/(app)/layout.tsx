import React from "react";
import Header from "./_components/Header";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      {children}
    </div>
  );
};

export default AppLayout;
