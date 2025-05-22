
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

interface CameraStreamProps {
  streamUrl: string;
  onStreamLoaded?: () => void;
  onStreamError?: () => void;
}

export function CameraStream({ streamUrl, onStreamLoaded, onStreamError }: CameraStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!streamUrl || !videoRef.current) return;

    // For this demo, we'll simulate an RTSP stream with a video element
    // In a real implementation, you would use a library like hls.js, dash.js, 
    // or a WebRTC solution to connect to the actual RTSP/RTMP stream
    
    const video = videoRef.current;
    
    // Simulate loading delay
    const timeout = setTimeout(() => {
      if (streamUrl.includes('error')) {
        setError("Failed to connect to camera stream");
        onStreamError?.();
        toast.error("Failed to connect to camera stream");
      } else {
        setIsLoading(false);
        onStreamLoaded?.();
        toast.success("Camera stream connected");
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [streamUrl, onStreamLoaded, onStreamError]);

  // In a real app, you would use a proper RTSP/RTMP library here
  return (
    <Card className="overflow-hidden border-2 bg-black relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white z-10">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 rounded-full border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent animate-spin mb-2"></div>
            <p>Connecting to stream...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white z-10">
          <div className="flex flex-col items-center text-red-500">
            <p className="text-lg font-semibold">{error}</p>
            <p className="text-sm text-gray-400">Please check your connection settings</p>
          </div>
        </div>
      )}
      
      <CardContent className="p-0">
        {streamUrl && !error ? (
          // In a real app, this would be connected to an actual RTSP stream
          <video 
            ref={videoRef}
            className="w-full h-full object-cover aspect-video"
            autoPlay 
            muted 
            loop 
            playsInline
            src="/peopleVideo.mp4" // This would be replaced with actual stream handling
          />
        ) : (
          <div className="w-full aspect-video bg-gray-900 flex items-center justify-center text-gray-400">
            No camera stream configured
          </div>
        )}
      </CardContent>
    </Card>
  );
}
