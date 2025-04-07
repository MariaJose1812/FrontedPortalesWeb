import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div>
      <TopBar />
      <main style={{ paddingTop: "80px" }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
