
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center max-w-md px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        <Button 
          asChild
          className="flex items-center gap-2"
        >
          <a href="/">
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
