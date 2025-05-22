
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { 
  BarChart3, 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  ClipboardList, 
  LogOut, 
  Settings, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  
  const navItems = [
    { name: "Dashboard", icon: BarChart3, path: "/" },
    { name: "People", icon: Users, path: "/people" },
    { name: "Cameras", icon: Camera, path: "/cameras" },
    { name: "Logs", icon: ClipboardList, path: "/logs" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside 
        className={cn(
          "h-screen bg-white border-r border-border transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && (
            <h1 className="font-bold text-xl">FaceTrack Pro</h1>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    "hover:bg-muted transition-colors",
                    "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t mt-auto">
          <Button 
            variant="outline" 
            className={cn(
              "w-full justify-start",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
