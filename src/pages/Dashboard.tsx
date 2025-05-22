
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRoundCheck, Users, Camera, ClipboardCheck } from "lucide-react";
import { RecognitionFeed } from "@/components/RecognitionFeed";
import { CameraStream } from "@/components/CameraStream";
import { PersonData, CameraConfig } from "@/types/types";
import { useEffect, useState } from "react";

// Sample data for demo
const samplePeople: PersonData[] = [
  {
    id: "p1",
    name: "Alex Johnson",
    role: "Software Developer",
    photoUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    notes: "Backend team lead, works on API infrastructure",
    lastSeen: "Yesterday, 5:30 PM"
  },
  {
    id: "p2",
    name: "Sarah Williams",
    role: "UX Designer",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
    lastSeen: "Today, 9:15 AM"
  },
  {
    id: "p3",
    name: "Michael Chen",
    role: "Project Manager",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    notes: "Managing the new client project, contact for scheduling",
    lastSeen: "2 days ago"
  },
  {
    id: "p4",
    name: "Emily Rodriguez",
    role: "Marketing Specialist",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    lastSeen: "1 week ago"
  }
];

const sampleCameraConfig: CameraConfig = {
  id: "cam1",
  name: "Main Entrance",
  url: "rtsp://192.168.1.100:554/stream1",
  protocol: "rtsp",
  active: true
};

const Dashboard = () => {
  const [people] = useState<PersonData[]>(samplePeople);
  const [recognizedIds, setRecognizedIds] = useState<string[]>([]);
  const [recognitionActive] = useState(true);
  
  // Demo Effect: Gradually recognize people
  useEffect(() => {
    if (people.length === 0) return;
    
    const unrecognizedPeople = people.filter(p => !recognizedIds.includes(p.id));
    if (unrecognizedPeople.length === 0) return;
    
    const timeout = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * unrecognizedPeople.length);
      const personToRecognize = unrecognizedPeople[randomIndex];
      
      setRecognizedIds(prev => [...prev, personToRecognize.id]);
    }, 8000); // Every 8 seconds
    
    return () => clearTimeout(timeout);
  }, [people, recognizedIds]);

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to FaceTrack Pro system overview</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total People</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{people.length}</div>
            <p className="text-xs text-muted-foreground">Registered in database</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserRoundCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recognizedIds.length}</div>
            <p className="text-xs text-muted-foreground">People recognized today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Cameras streaming</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recognition Rate</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Average confidence score</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Camera Feed</CardTitle>
              <CardDescription>Main Entrance (RTSP)</CardDescription>
            </CardHeader>
            <CardContent>
              <CameraStream 
                streamUrl={sampleCameraConfig.url} 
                onStreamLoaded={() => {}}
                onStreamError={() => {}}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Recognition Activity</CardTitle>
              <CardDescription>Real-time recognition events</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <RecognitionFeed 
                people={people} 
                active={recognitionActive} 
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Present Today</CardTitle>
              <CardDescription>People recognized by the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recognizedIds.length > 0 ? (
                  people
                    .filter(person => recognizedIds.includes(person.id))
                    .map(person => (
                      <div key={person.id} className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
                          <img 
                            src={person.photoUrl} 
                            alt={person.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium leading-none">{person.name}</div>
                          <div className="text-sm text-muted-foreground">{person.role}</div>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">
                          {person.lastSeen}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="py-4 text-center text-muted-foreground">
                    <p>No one has been recognized yet today</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span className="font-medium">24%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span className="font-medium">1.2 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Storage</span>
                  <span className="font-medium">43 GB free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Uptime</span>
                  <span className="font-medium">3d 7h 23m</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
