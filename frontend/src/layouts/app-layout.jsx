import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Grid Background */}
      <div
        className={cn(
          "fixed inset-0 z-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for faded look */}
      <div className="fixed inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Content */}
      <main className="relative z-10 flex-1 container mx-auto px-4">
        <Header />
        <Outlet />
      </main>
      <footer className="relative z-10 py-6 text-center border-border font-serif font-semibold">
        <p className="text-muted-foreground opacity-30">
          Made with 🖤 by Swaraj
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;
