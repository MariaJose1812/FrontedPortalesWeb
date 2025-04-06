// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

const Layout: React.FC = () => {
  return (
    <div>
      <TopBar />
      <main style={{ paddingTop: "100px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
