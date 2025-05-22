
export interface PersonData {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  notes?: string;
  lastSeen: string;
}

export interface CameraConfig {
  id: string;
  name: string;
  url: string;
  protocol: string;
  active: boolean;
}
