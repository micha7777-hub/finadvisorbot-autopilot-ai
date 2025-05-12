
import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <main className="p-4 md:p-6 w-full max-w-7xl mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
