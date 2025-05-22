
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CameraSetupForm } from "@/components/CameraSetupForm";
import { CameraStream } from "@/components/CameraStream";
import { Camera, PlusCircle, Settings, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { CameraConfig } from "@/types/types";

// Sample data for demo
const initialCameras: CameraConfig[] = [
  {
    id: "cam1",
    name: "Main Entrance",
    url: "rtsp://192.168.1.100:554/stream1",
    protocol: "rtsp",
    active: true
  },
  {
    id: "cam2",
    name: "Lobby",
    url: "rtsp://192.168.1.101:554/stream2",
    protocol: "rtsp",
    active: false
  }
];

const CamerasPage = () => {
  const [cameras, setCameras] = useState<CameraConfig[]>(initialCameras);
  const [setupCameraOpen, setSetupCameraOpen] = useState(false);
  
  const handleSetupCamera = (config: { name: string; url: string; protocol: string }) => {
    const newCamera: CameraConfig = {
      ...config,
      id: `cam${Date.now()}`,
      active: true
    };
    
    setCameras(prev => [...prev, newCamera]);
    setSetupCameraOpen(false);
    toast.success(`Camera "${config.name}" has been added`);
  };
  
  const toggleCameraActive = (cameraId: string) => {
    setCameras(prev => 
      prev.map(cam => 
        cam.id === cameraId ? { ...cam, active: !cam.active } : cam
      )
    );
    
    const camera = cameras.find(c => c.id === cameraId);
    if (camera) {
      toast(camera.active ? 
        `Camera "${camera.name}" deactivated` : 
        `Camera "${camera.name}" activated`
      );
    }
  };
  
  const deleteCamera = (cameraId: string) => {
    const camera = cameras.find(c => c.id === cameraId);
    if (!camera) return;
    
    setCameras(prev => prev.filter(cam => cam.id !== cameraId));
    toast.success(`Camera "${camera.name}" has been removed`);
  };
  
  return (
    <div className="container mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Camera Management</h1>
          <p className="text-muted-foreground">Configure and monitor camera feeds</p>
        </div>
        <Button 
          onClick={() => setSetupCameraOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Camera</span>
        </Button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map(camera => (
          <Card key={camera.id} className={!camera.active ? "opacity-75" : undefined}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  {camera.name}
                </CardTitle>
                <Switch 
                  checked={camera.active} 
                  onCheckedChange={() => toggleCameraActive(camera.id)} 
                />
              </div>
              <CardDescription>
                {camera.protocol.toUpperCase()} • {camera.active ? "Active" : "Inactive"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <CameraStream 
                streamUrl={camera.active ? camera.url : ""} 
                onStreamLoaded={() => {}}
                onStreamError={() => {}}
              />
            </CardContent>
            <CardFooter className="flex justify-between pt-6">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => deleteCamera(camera.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {cameras.length === 0 && (
        <div className="flex flex-col items-center justify-center bg-muted/30 rounded-lg p-12 text-center">
          <Camera className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Cameras Added</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            You haven't added any cameras yet. Add your first camera to start monitoring and recognition.
          </p>
          <Button onClick={() => setSetupCameraOpen(true)}>
            Add Your First Camera
          </Button>
        </div>
      )}
      
      {/* Dialogs */}
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
    </div>
  );
};

export default CamerasPage;
