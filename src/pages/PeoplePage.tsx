
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { PersonList } from "@/components/PersonList";
import { AddPersonForm } from "@/components/AddPersonForm";
import { PersonDetails } from "@/components/PersonDetails";
import { PersonData } from "@/types/types";

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

const PeoplePage = () => {
  const [people, setPeople] = useState<PersonData[]>(initialPeople);
  const [recognizedIds, setRecognizedIds] = useState<string[]>(["p2"]);
  const [addPersonOpen, setAddPersonOpen] = useState(false);
  const [viewingPerson, setViewingPerson] = useState<PersonData | null>(null);
  
  const handleAddPerson = (personData: Omit<PersonData, "id">) => {
    const newPerson: PersonData = {
      ...personData,
      id: `p${Date.now()}`
    };
    
    setPeople(prev => [...prev, newPerson]);
    setAddPersonOpen(false);
  };
  
  const handleViewPerson = (personId: string) => {
    const person = people.find(p => p.id === personId);
    if (person) {
      setViewingPerson(person);
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">People Management</h1>
          <p className="text-muted-foreground">Manage registered individuals</p>
        </div>
        <Button 
          onClick={() => setAddPersonOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Person</span>
        </Button>
      </header>
      
      <div className="bg-white rounded-lg shadow p-6 min-h-[600px]">
        <PersonList 
          people={people} 
          recognizedIds={recognizedIds}
          onViewDetails={handleViewPerson}
        />
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

export default PeoplePage;
