
import { PersonData } from "@/types/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, UserRound } from "lucide-react";

interface PersonDetailsProps {
  person: PersonData;
  onClose: () => void;
  onEdit?: (personId: string) => void;
}

export function PersonDetails({ person, onClose, onEdit }: PersonDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto overflow-hidden rounded-full mb-4">
          <img 
            src={person.photoUrl} 
            alt={person.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold">{person.name}</h2>
        <p className="text-muted-foreground">{person.role}</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Last seen:</span>
          <span>{person.lastSeen}</span>
        </div>
        
        {person.notes && (
          <div>
            <h3 className="text-sm font-medium mb-1">Notes</h3>
            <ScrollArea className="h-24 rounded-md border p-4">
              <p className="text-sm">{person.notes}</p>
            </ScrollArea>
          </div>
        )}
        
        <h3 className="text-sm font-medium pt-2">Attendance History</h3>
        <div className="border rounded-md">
          <div className="grid grid-cols-3 gap-4 p-3 border-b bg-muted/50 text-xs font-medium">
            <div>Date</div>
            <div>Time In</div>
            <div>Time Out</div>
          </div>
          <ScrollArea className="h-36">
            {/* This would be populated from actual attendance records in a real app */}
            <div className="text-sm">
              <div className="grid grid-cols-3 gap-4 p-3 border-b hover:bg-muted/20">
                <div>Today</div>
                <div>09:15 AM</div>
                <div>--</div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-3 border-b hover:bg-muted/20">
                <div>Yesterday</div>
                <div>08:58 AM</div>
                <div>05:32 PM</div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-3 border-b hover:bg-muted/20">
                <div>May 20, 2025</div>
                <div>09:02 AM</div>
                <div>06:15 PM</div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-3 border-b hover:bg-muted/20">
                <div>May 19, 2025</div>
                <div>08:45 AM</div>
                <div>05:30 PM</div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={onClose}
        >
          Close
        </Button>
        {onEdit && (
          <Button 
            onClick={() => onEdit(person.id)}
          >
            Edit Details
          </Button>
        )}
      </div>
    </div>
  );
}
