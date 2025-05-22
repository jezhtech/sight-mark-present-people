
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserRound, Clock, CheckCircle2 } from "lucide-react";
import { PersonData } from "@/types/types";

interface PersonCardProps {
  person: PersonData;
  recognized?: boolean;
  lastSeen?: string;
  matchConfidence?: number;
  onViewDetails?: (personId: string) => void;
}

export function PersonCard({ 
  person, 
  recognized = false, 
  lastSeen, 
  matchConfidence = 0,
  onViewDetails 
}: PersonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 ${
        recognized 
          ? "border-recognition-success shadow-lg shadow-recognition-success/20" 
          : "hover:shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-start">
          <div className="font-medium truncate">{person.name}</div>
          {recognized && (
            <Badge className="bg-recognition-success">
              Present
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-2 relative">
        <div className="relative aspect-square rounded-md overflow-hidden bg-muted mb-2">
          <img 
            src={person.photoUrl} 
            alt={person.name} 
            className="object-cover w-full h-full"
          />
          {recognized && (
            <div className="absolute top-2 right-2">
              <div className="bg-recognition-success text-white text-xs font-medium px-2 py-1 rounded-full">
                {matchConfidence}% match
              </div>
            </div>
          )}
          {recognized && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
              <div className="flex items-center gap-1 text-white text-xs">
                <CheckCircle2 className="h-3 w-3" />
                <span>Identified</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground gap-1 mb-1">
          <UserRound className="h-3 w-3" />
          <span>{person.role}</span>
        </div>
        
        {lastSeen && (
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <Clock className="h-3 w-3" />
            <span>Last seen {lastSeen}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className={`p-3 pt-0 opacity-${isHovered || recognized ? '100' : '0'} transition-opacity duration-200`}>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs"
          onClick={() => onViewDetails?.(person.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
