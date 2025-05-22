
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search, SlidersHorizontal } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error";
  category: "system" | "recognition" | "camera" | "user";
  message: string;
}

// Sample data for demo
const generateSampleLogs = (): LogEntry[] => {
  const logs: LogEntry[] = [];
  
  // Current date
  const now = new Date();
  
  // Sample messages
  const infoMessages = [
    "System started successfully",
    "Camera connection established",
    "Person recognized: Alex Johnson (87% confidence)",
    "Person recognized: Sarah Williams (93% confidence)",
    "New person added to database: Michael Chen",
    "Recognition service initialized",
    "Camera stream switched to HD resolution",
    "User login: admin@system.com",
    "Configuration updated",
    "Daily backup completed"
  ];
  
  const warningMessages = [
    "Camera connection unstable",
    "Low recognition confidence: Emily Rodriguez (65%)",
    "System resource usage high (CPU: 87%)",
    "Database approaching storage limit (85% used)",
    "Recognition service performance degraded"
  ];
  
  const errorMessages = [
    "Camera connection lost",
    "Failed to recognize person (below threshold)",
    "Database connection error",
    "Recognition service crashed",
    "Failed to save new person data"
  ];
  
  // Generate 50 random logs
  for (let i = 0; i < 50; i++) {
    const randomHours = Math.floor(Math.random() * 72); // Up to 3 days ago
    const timestamp = new Date(now.getTime() - randomHours * 60 * 60 * 1000);
    
    // Random level with weighted distribution
    const levelRand = Math.random();
    let level: "info" | "warning" | "error";
    let message: string;
    
    if (levelRand < 0.7) { // 70% info
      level = "info";
      message = infoMessages[Math.floor(Math.random() * infoMessages.length)];
    } else if (levelRand < 0.9) { // 20% warning
      level = "warning";
      message = warningMessages[Math.floor(Math.random() * warningMessages.length)];
    } else { // 10% error
      level = "error";
      message = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    }
    
    // Random category
    const categories: Array<"system" | "recognition" | "camera" | "user"> = ["system", "recognition", "camera", "user"];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    logs.push({
      id: `log-${i}`,
      timestamp: timestamp.toISOString(),
      level,
      category,
      message
    });
  }
  
  // Sort by timestamp (newest first)
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const sampleLogs = generateSampleLogs();

const LogsPage = () => {
  const [logs] = useState<LogEntry[]>(sampleLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Format timestamp for display
  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  };
  
  // Filter logs based on search and filters
  const filteredLogs = logs.filter(log => {
    // Search query filter
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Level filter
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    
    // Category filter
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });
  
  // Get level badge variant
  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "info": return "secondary";
      case "warning": return "warning";
      case "error": return "destructive";
      default: return "secondary";
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">System Logs</h1>
          <p className="text-muted-foreground">View and export system activity</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Export Logs</span>
        </Button>
      </header>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[120px]">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <span>Level</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[130px]">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <span>Category</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="recognition">Recognition</SelectItem>
                <SelectItem value="camera">Camera</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[100px]">Level</TableHead>
                <TableHead className="w-[120px]">Category</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map(log => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">
                    {formatTimestamp(log.timestamp)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getLevelBadgeVariant(log.level)}>
                      {log.level.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">
                    {log.category}
                  </TableCell>
                  <TableCell>
                    {log.message}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredLogs.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <p>No logs match your current filters</p>
          </div>
        )}
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        Showing {filteredLogs.length} of {logs.length} logs
      </div>
    </div>
  );
};

export default LogsPage;
