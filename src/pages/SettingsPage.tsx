
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, RefreshCw } from "lucide-react";

const SettingsPage = () => {
  // System settings
  const [systemName, setSystemName] = useState("FaceTrack Pro");
  const [storagePath, setStoragePath] = useState("/var/data/facetrack");
  const [autoBackup, setAutoBackup] = useState(true);
  const [enableLogging, setEnableLogging] = useState(true);
  const [logRetention, setLogRetention] = useState(30);
  
  // Recognition settings
  const [minConfidence, setMinConfidence] = useState(70);
  const [recognitionModel, setRecognitionModel] = useState("standard");
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [matchThreshold, setMatchThreshold] = useState(85);
  const [processingMode, setProcessingMode] = useState("balanced");
  
  // Camera settings
  const [defaultProtocol, setDefaultProtocol] = useState("rtsp");
  const [streamQuality, setStreamQuality] = useState("auto");
  const [enableMotionDetection, setEnableMotionDetection] = useState(true);
  const [reconnectAttempts, setReconnectAttempts] = useState(3);
  
  // Handle save settings
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };
  
  // Handle reset to defaults
  const handleResetDefaults = () => {
    // Reset all settings to default values
    setSystemName("FaceTrack Pro");
    setStoragePath("/var/data/facetrack");
    setAutoBackup(true);
    setEnableLogging(true);
    setLogRetention(30);
    setMinConfidence(70);
    setRecognitionModel("standard");
    setEnableNotifications(true);
    setMatchThreshold(85);
    setProcessingMode("balanced");
    setDefaultProtocol("rtsp");
    setStreamQuality("auto");
    setEnableMotionDetection(true);
    setReconnectAttempts(3);
    
    toast.success("Settings restored to defaults");
  };
  
  return (
    <div className="container mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure application preferences</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleResetDefaults}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset Defaults</span>
          </Button>
          <Button 
            onClick={handleSaveSettings}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </Button>
        </div>
      </header>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="recognition">Recognition</TabsTrigger>
          <TabsTrigger value="camera">Camera</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Basic system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input
                    id="system-name"
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storage-path">Storage Path</Label>
                  <Input
                    id="storage-path"
                    value={storagePath}
                    onChange={(e) => setStoragePath(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Directory where all recognition data will be stored
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Maintenance</CardTitle>
                <CardDescription>System maintenance settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Backup</Label>
                    <p className="text-xs text-muted-foreground">
                      Backup system data daily
                    </p>
                  </div>
                  <Switch
                    checked={autoBackup}
                    onCheckedChange={setAutoBackup}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Logging</Label>
                    <p className="text-xs text-muted-foreground">
                      Record system events and activities
                    </p>
                  </div>
                  <Switch
                    checked={enableLogging}
                    onCheckedChange={setEnableLogging}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Log Retention (days)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="365"
                    value={logRetention}
                    onChange={(e) => setLogRetention(parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Run System Diagnostics
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recognition">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recognition Settings</CardTitle>
                <CardDescription>Configure face recognition parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Minimum Confidence Threshold ({minConfidence}%)</Label>
                  </div>
                  <Slider
                    value={[minConfidence]}
                    onValueChange={(values) => setMinConfidence(values[0])}
                    min={50}
                    max={99}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum required confidence score for a face to be recognized
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Recognition Model</Label>
                  <Select value={recognitionModel} onValueChange={setRecognitionModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fast">Fast (lower accuracy)</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="precise">Precise (slower)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Match Threshold ({matchThreshold}%)</Label>
                  </div>
                  <Slider
                    value={[matchThreshold]}
                    onValueChange={(values) => setMatchThreshold(values[0])}
                    min={60}
                    max={99}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum similarity score to consider a face a match
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Processing Options</CardTitle>
                <CardDescription>Advanced recognition settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Send alerts when faces are recognized
                    </p>
                  </div>
                  <Switch
                    checked={enableNotifications}
                    onCheckedChange={setEnableNotifications}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Processing Mode</Label>
                  <Select value={processingMode} onValueChange={setProcessingMode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance (low resource usage)</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="quality">Quality (high resource usage)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Retrain Recognition Model
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground w-full text-center">
                  Last model update: May 18, 2023
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="camera">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Camera Defaults</CardTitle>
                <CardDescription>Default settings for new cameras</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Protocol</Label>
                  <Select value={defaultProtocol} onValueChange={setDefaultProtocol}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select protocol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rtsp">RTSP</SelectItem>
                      <SelectItem value="rtmp">RTMP</SelectItem>
                      <SelectItem value="hls">HLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Stream Quality</Label>
                  <Select value={streamQuality} onValueChange={setStreamQuality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (480p)</SelectItem>
                      <SelectItem value="medium">Medium (720p)</SelectItem>
                      <SelectItem value="high">High (1080p)</SelectItem>
                      <SelectItem value="auto">Auto (adaptive)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Reconnect Attempts</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={reconnectAttempts}
                    onChange={(e) => setReconnectAttempts(parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of times to attempt reconnecting to a lost camera stream
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Camera Processing</CardTitle>
                <CardDescription>Camera feed processing options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Motion Detection</Label>
                    <p className="text-xs text-muted-foreground">
                      Only process frames with detected motion
                    </p>
                  </div>
                  <Switch
                    checked={enableMotionDetection}
                    onCheckedChange={setEnableMotionDetection}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Frame Processing Rate</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (5 FPS)</SelectItem>
                      <SelectItem value="medium">Medium (15 FPS)</SelectItem>
                      <SelectItem value="high">High (30 FPS)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Number of frames processed per second for recognition
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Test Camera Compatibility
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground w-full text-center">
                  Supported protocols: RTSP, RTMP, HLS, HTTP (MJPEG)
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
