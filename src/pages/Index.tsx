
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CameraStream } from "@/components/CameraStream";
import { PersonList } from "@/components/PersonList";
import { AddPersonForm } from "@/components/AddPersonForm";
import { PersonDetails } from "@/components/PersonDetails";
import { CameraSetupForm } from "@/components/CameraSetupForm";
import { RecognitionFeed } from "@/components/RecognitionFeed";
import { PersonData, CameraConfig } from "@/types/types";
import { Play, Pause, PlusCircle, Settings, Camera } from "lucide-react";

// Sample data for demo
const initialPeople: PersonData[] = [
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

const Index = () => {
  const [people, setPeople] = useState<PersonData[]>(initialPeople);
  const [recognizedIds, setRecognizedIds] = useState<string[]>([]);
  const [cameraConfig, setCameraConfig] = useState<CameraConfig | null>(null);
  const [recognitionActive, setRecognitionActive] = useState(false);
  
  // Dialog states
  const [addPersonOpen, setAddPersonOpen] = useState(false);
  const [setupCameraOpen, setSetupCameraOpen] = useState(false);
  const [viewingPerson, setViewingPerson] = useState<PersonData | null>(null);
  
  // Demo Effect: Gradually recognize people over time
  useEffect(() => {
    if (!recognitionActive || people.length === 0) return;
    
    const unrecognizedPeople = people.filter(p => !recognizedIds.includes(p.id));
    if (unrecognizedPeople.length === 0) return;
    
    const timeout = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * unrecognizedPeople.length);
      const personToRecognize = unrecognizedPeople[randomIndex];
      
      setRecognizedIds(prev => [...prev, personToRecognize.id]);
    }, 8000); // Every 8 seconds
    
    return () => clearTimeout(timeout);
  }, [people, recognizedIds, recognitionActive]);
  
  // Handlers
  const handleAddPerson = (personData: Omit<PersonData, "id">) => {
    const newPerson: PersonData = {
      ...personData,
      id: `p${Date.now()}`
    };
    
    setPeople(prev => [...prev, newPerson]);
    setAddPersonOpen(false);
  };
  
  const handleSetupCamera = (config: { name: string; url: string; protocol: string }) => {
    const newConfig: CameraConfig = {
      ...config,
      id: `cam${Date.now()}`,
      active: true
    };
    
    setCameraConfig(newConfig);
    setSetupCameraOpen(false);
  };
  
  const handleViewPerson = (personId: string) => {
    const person = people.find(p => p.id === personId);
    if (person) {
      setViewingPerson(person);
    }
  };
  
  const toggleRecognition = () => {
    if (!cameraConfig) {
      toast.error("Please set up a camera first");
      setSetupCameraOpen(true);
      return;
    }
    
    setRecognitionActive(prev => !prev);
    toast(recognitionActive ? "Recognition paused" : "Recognition started");
  };
  
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto py-6">
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Face Recognition System</h1>
            <div className="flex items-center gap-2">
              {cameraConfig ? (
                <Button 
                  onClick={toggleRecognition}
                  variant={recognitionActive ? "outline" : "default"}
                  className="flex items-center gap-2"
                >
                  {recognitionActive ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Pause Recognition</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Start Recognition</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  onClick={() => setSetupCameraOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  <span>Set Up Camera</span>
                </Button>
              )}
              <Button 
                variant="outline"
                size="icon"
                onClick={() => setSetupCameraOpen(true)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground mt-1">
            Manage attendance and identify people in real-time
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera Stream */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Camera Feed</h2>
              <p className="text-muted-foreground text-sm mb-4">
                {cameraConfig 
                  ? `Viewing: ${cameraConfig.name} (${cameraConfig.protocol.toUpperCase()})`
                  : "No camera configured. Please set up your camera to begin."
                }
              </p>
              <CameraStream 
                streamUrl={cameraConfig?.url || ""} 
                onStreamLoaded={() => toast.success("Camera stream loaded")}
                onStreamError={() => toast.error("Failed to connect to camera stream")}
              />
            </div>
            
            {/* Recognition Feed */}
            <div className="h-64">
              <RecognitionFeed 
                people={people} 
                active={recognitionActive} 
              />
            </div>
          </div>
          
          {/* People Management */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">People</h2>
              <Button 
                size="sm" 
                onClick={() => setAddPersonOpen(true)}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Person</span>
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 min-h-[500px]">
              <PersonList 
                people={people} 
                recognizedIds={recognizedIds}
                onViewDetails={handleViewPerson}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <Dialog open={addPersonOpen} onOpenChange={setAddPersonOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Person</DialogTitle>
          </DialogHeader>
          <AddPersonForm 
            onAddPerson={handleAddPerson} 
            onCancel={() => setAddPersonOpen(false)} 
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={setupCameraOpen} onOpenChange={setSetupCameraOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set Up Camera</DialogTitle>
          </DialogHeader>
          <CameraSetupForm 
            onSetupCamera={handleSetupCamera}
            onCancel={() => setSetupCameraOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!viewingPerson} onOpenChange={(open) => !open && setViewingPerson(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Person Details</DialogTitle>
          </DialogHeader>
          {viewingPerson && (
            <PersonDetails 
              person={viewingPerson} 
              onClose={() => setViewingPerson(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
