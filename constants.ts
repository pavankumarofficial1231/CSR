import { Project, Sector } from './types';

export const SECTORS: Sector[] = [
  { id: 'edu', name: 'Education', icon: 'BookOpen', projectCount: 120 },
  { id: 'agri', name: 'Agriculture', icon: 'Wheat', projectCount: 85 },
  { id: 'health', name: 'Health', icon: 'Heart', projectCount: 200 },
  { id: 'env', name: 'Environment', icon: 'Leaf', projectCount: 150 },
  { id: 'women', name: 'Women Empowerment', icon: 'Users', projectCount: 90 },
  { id: 'tech', name: 'Tech for Good', icon: 'Cpu', projectCount: 45 },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Digital Literacy for Rural Schools',
    sector: 'edu',
    description: 'Providing laptops and internet connectivity to 50 government schools in rural Maharashtra.',
    fundsRequired: 5000000,
    fundsRaised: 3200000,
    creator: 'Pratham Education',
    verified: true,
    donors: ['Tata Group', 'Infosys Foundation'],
    daysLeft: 45,
    image: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: 'p2',
    title: 'Sustainable Farming Kits',
    sector: 'agri',
    description: 'Distributing organic farming starter kits to small-scale farmers in Punjab.',
    fundsRequired: 2500000,
    fundsRaised: 500000,
    creator: 'Green Earth NGO',
    verified: true,
    donors: ['Anonymous'],
    daysLeft: 60,
    image: 'https://picsum.photos/800/400?random=2'
  },
  {
    id: 'p3',
    title: 'Clean Water Initiative',
    sector: 'health',
    description: 'Installing RO water purifiers in drought-affected villages.',
    fundsRequired: 1500000,
    fundsRaised: 1500000,
    creator: 'WaterForLife',
    verified: true,
    donors: ['Dell', 'TVS'],
    daysLeft: 0,
    image: 'https://picsum.photos/800/400?random=3'
  }
];

export const PARTNERS = [
  "Tata Group", "Infosys", "BYJU’S", "Dell", "TVS", "Amazon", "Wipro", "Reliance Foundation"
];