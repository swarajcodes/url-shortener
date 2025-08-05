import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4">
        <Header />
        <Outlet />
      </main>
      <footer className="py-8 text-center bg-card border-t border-border">
        <p className="text-muted-foreground">Made with 🖤 by Swaraj</p>
      </footer>
    </div>
  );
};

export default AppLayout;
