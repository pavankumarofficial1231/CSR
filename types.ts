export interface Project {
  id: string;
  title: string;
  sector: string;
  description: string;
  fundsRequired: number;
  fundsRaised: number;
  creator: string;
  verified: boolean;
  donors: string[];
  daysLeft: number;
  image: string;
}

export interface Sector {
  id: string;
  name: string;
  icon: string;
  projectCount: number;
}

export enum UserRole {
  COMPANY = 'COMPANY',
  NGO = 'NGO'
}