
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CameraSetupFormProps {
  onSetupCamera: (config: { name: string; url: string; protocol: string }) => void;
  onCancel: () => void;
}

export function CameraSetupForm({ onSetupCamera, onCancel }: CameraSetupFormProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [protocol, setProtocol] = useState("rtsp");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !url) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      onSetupCamera({
        name,
        url,
        protocol
      });
      
      toast.success(`Camera "${name}" has been set up`);
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Camera Name *</Label>
        <Input
          id="name"
          placeholder="Enter a name for this camera"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="protocol">Protocol *</Label>
        <Select
          value={protocol}
          onValueChange={setProtocol}
        >
          <SelectTrigger id="protocol">
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
        <Label htmlFor="url">Stream URL *</Label>
        <Input
          id="url"
          placeholder={`Enter ${protocol.toUpperCase()} URL (e.g., ${protocol}://192.168.1.100:554/stream)`}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          Enter the full URL including {protocol.toUpperCase()} protocol and port if needed
        </p>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={!name || !url || isSubmitting}
        >
          {isSubmitting ? "Setting Up..." : "Set Up Camera"}
        </Button>
      </div>
    </form>
  );
}
