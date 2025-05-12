
import React from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BarChart, Search, Settings, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export const AppSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "My Portfolio",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Live Market Feed",
      url: "/market-feed",
      icon: Activity,
    },
    {
      title: "Stock Sentiment Search",
      url: "/sentiment-search",
      icon: Search,
    },
    {
      title: "AI Strategy Lab",
      url: "/strategy-lab",
      icon: BarChart,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-primary rounded-md p-1">
            <BarChart className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-bold text-sidebar-foreground">FinAdvisorBot</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={cn(
                    location.pathname === item.url && "bg-sidebar-accent"
                  )}>
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <div className="text-xs text-sidebar-foreground/70">
            FinAdvisorBot v1.0
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
