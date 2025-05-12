
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AppHeader: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-background border-b p-4 sticky top-0 z-30">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <Link to="/" className="font-bold text-xl text-primary">
            FinAdvisorBot
          </Link>
          <nav className="hidden md:flex space-x-1">
            <Button
              variant={location.pathname === "/" ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/">Portfolio</Link>
            </Button>
            <Button
              variant={location.pathname === "/market-feed" ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/market-feed">Market Feed</Link>
            </Button>
            <Button
              variant={location.pathname === "/sentiment-search" ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/sentiment-search">Sentiment Search</Link>
            </Button>
            <Button
              variant={location.pathname === "/strategy-lab" ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/strategy-lab">Strategy Lab</Link>
            </Button>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={location.pathname === "/settings" ? "secondary" : "outline"}
            size="sm"
            asChild
          >
            <Link to="/settings">Settings</Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.name}
                <p className="text-xs font-normal text-muted-foreground">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
