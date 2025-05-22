
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PersonData } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";

interface RecognitionEvent {
  personId: string;
  timestamp: Date;
  confidence: number;
}

interface RecognitionFeedProps {
  people: PersonData[];
  active: boolean;
}

export function RecognitionFeed({ people, active }: RecognitionFeedProps) {
  const [events, setEvents] = useState<RecognitionEvent[]>([]);

  // Demo function to add random recognition events
  useEffect(() => {
    if (!active || people.length === 0) return;

    const interval = setInterval(() => {
      // Randomly select a person to recognize
      const randomIndex = Math.floor(Math.random() * people.length);
      const person = people[randomIndex];
      
      // Create a new recognition event
      const newEvent: RecognitionEvent = {
        personId: person.id,
        timestamp: new Date(),
        confidence: Math.floor(70 + Math.random() * 29),
      };
      
      setEvents(prev => [newEvent, ...prev]);
      toast.success(`Recognized: ${person.name}`);
    }, 10000); // Every 10 seconds
    
    return () => clearInterval(interval);
  }, [active, people]);
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  return (
    <Card className="h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Recognition Feed</h3>
          <div className={`flex items-center gap-1.5 ${active ? 'text-green-500' : 'text-amber-500'}`}>
            <span className={`h-2 w-2 rounded-full ${active ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`}></span>
            <span className="text-xs">{active ? 'Active' : 'Paused'}</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1 -mx-2 px-2">
          {events.length > 0 ? (
            <div className="space-y-2">
              {events.map((event, index) => {
                const person = people.find(p => p.id === event.personId);
                if (!person) return null;
                
                return (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-2 border rounded-md bg-muted/30 animate-fade-in"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={person.photoUrl} 
                        alt={person.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">{person.name}</div>
                        <div className="text-xs text-muted-foreground">{formatTime(event.timestamp)}</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1 text-recognition-success">
                          <Check className="h-3 w-3" />
                          <span>{event.confidence}% match</span>
                        </div>
                        <span>•</span>
                        <span>{person.role}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-muted-foreground p-4">
              <p>No recognition events yet.<br />Events will appear here when people are detected.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
