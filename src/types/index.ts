// Define types for the application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'client' | 'team_member';
  avatar?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  contact: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectStage {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  startDate: string;
  endDate: string;
  progress: number;
  tasks: Task[];
  photos: PhotoItem[];
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  stageId: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  read: boolean;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  client: User;
  owner: User;
  team: TeamMember[];
  stages: ProjectStage[];
  progress: number;
  budget: number;
  expenses: Expense[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}