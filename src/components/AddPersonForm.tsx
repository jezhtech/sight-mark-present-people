
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PersonData } from "@/types/types";
import { Camera, Upload } from "lucide-react";

interface AddPersonFormProps {
  onAddPerson: (person: Omit<PersonData, "id">) => void;
  onCancel: () => void;
}

export function AddPersonForm({ onAddPerson, onCancel }: AddPersonFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real application, you would upload this to your server/storage
    // Here we're just creating a local URL for demo purposes
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !role || !photoUrl) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      onAddPerson({
        name,
        role,
        notes,
        photoUrl,
        lastSeen: "Never"
      });
      
      toast.success(`${name} has been added successfully`);
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="photo">Photo</Label>
        <div className="flex flex-col items-center justify-center">
          {photoUrl ? (
            <div className="relative w-32 h-32 mb-4">
              <img 
                src={photoUrl} 
                alt="Person" 
                className="w-full h-full object-cover rounded-md" 
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={() => setPhotoUrl("")}
              >
                ×
              </Button>
            </div>
          ) : (
            <div className="w-32 h-32 bg-muted rounded-md flex flex-col items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-xs text-muted-foreground">No photo</span>
            </div>
          )}
          
          <div className="flex gap-2">
            <Label 
              htmlFor="file-upload" 
              className="cursor-pointer flex items-center gap-2 border rounded-md px-4 py-2 bg-muted/50 hover:bg-muted transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Photo</span>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">Role/Position *</Label>
        <Input
          id="role"
          placeholder="Enter role or position"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          placeholder="Enter any additional information"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
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
          disabled={!name || !role || !photoUrl || isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Person"}
        </Button>
      </div>
    </form>
  );
}
