
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonData } from "@/types/types";
import { PersonCard } from "@/components/PersonCard";
import { Search, UserRoundCheck, Users, UserRound } from "lucide-react";

interface PersonListProps {
  people: PersonData[];
  recognizedIds: string[];
  onViewDetails?: (personId: string) => void;
}

export function PersonList({ people, recognizedIds, onViewDetails }: PersonListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredPeople = people.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    person.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const recognizedPeople = filteredPeople.filter(person => 
    recognizedIds.includes(person.id)
  );
  
  const unrecognizedPeople = filteredPeople.filter(person => 
    !recognizedIds.includes(person.id)
  );
  
  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <Tabs defaultValue="all" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>All</span>
            <span className="bg-muted text-muted-foreground rounded-full px-1.5 text-xs">
              {filteredPeople.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="present" className="flex items-center gap-2">
            <UserRoundCheck className="h-4 w-4" />
            <span>Present</span>
            <span className="bg-muted text-muted-foreground rounded-full px-1.5 text-xs">
              {recognizedPeople.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="absent" className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            <span>Absent</span>
            <span className="bg-muted text-muted-foreground rounded-full px-1.5 text-xs">
              {unrecognizedPeople.length}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="flex-1 overflow-y-auto space-y-4">
          {filteredPeople.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPeople.map(person => (
                <PersonCard
                  key={person.id}
                  person={person}
                  recognized={recognizedIds.includes(person.id)}
                  lastSeen={person.lastSeen}
                  matchConfidence={recognizedIds.includes(person.id) ? Math.floor(70 + Math.random() * 29) : undefined}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
              <p>No people found matching your search.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="present" className="flex-1 overflow-y-auto space-y-4">
          {recognizedPeople.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recognizedPeople.map(person => (
                <PersonCard
                  key={person.id}
                  person={person}
                  recognized={true}
                  lastSeen="just now"
                  matchConfidence={Math.floor(70 + Math.random() * 29)}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
              <p>No people are currently recognized.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="absent" className="flex-1 overflow-y-auto space-y-4">
          {unrecognizedPeople.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unrecognizedPeople.map(person => (
                <PersonCard
                  key={person.id}
                  person={person}
                  recognized={false}
                  lastSeen={person.lastSeen}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
              <p>Everyone has been recognized!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
