
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

export const AppHeader: React.FC = () => {
  const location = useLocation();
  
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
        </div>
      </div>
    </header>
  );
};
