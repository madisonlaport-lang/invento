export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  plan: 'starter' | 'pro' | 'agency';
}

export interface Photo {
  id: string;
  url: string;
  takenAt: string;
  linkedId: string;
  linkedType: 'room' | 'item';
}

export type ItemCondition = 'neuf' | 'bon' | 'use' | 'endommage';

export const CONDITION_LABELS: Record<ItemCondition, string> = {
  neuf: 'Neuf',
  bon: 'Bon état',
  use: 'Usé',
  endommage: 'Endommagé',
};

export const CONDITION_COLORS: Record<ItemCondition, string> = {
  neuf: 'bg-emerald-100 text-emerald-700',
  bon: 'bg-sky-100 text-sky-700',
  use: 'bg-amber-100 text-amber-700',
  endommage: 'bg-red-100 text-red-700',
};

export interface Item {
  id: string;
  roomId: string;
  name: string;
  description: string;
  condition: ItemCondition;
  estimatedValue?: number;
  photos: Photo[];
}

export interface Room {
  id: string;
  propertyId: string;
  name: string;
  icon: string;
  items: Item[];
  photos: Photo[];
}

export type PropertyType = 'airbnb' | 'meuble' | 'etat_lieux' | 'other';

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  airbnb: 'Location courte durée (Airbnb)',
  meuble: 'Location meublée',
  etat_lieux: 'État des lieux',
  other: 'Autre',
};

export interface Property {
  id: string;
  userId: string;
  name: string;
  address: string;
  type: PropertyType;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'completed';
  rooms: Room[];
}

export const DEFAULT_ROOMS: Array<{ name: string; icon: string }> = [
  { name: 'Entrée', icon: 'ri-door-open-line' },
  { name: 'Salon', icon: 'ri-sofa-line' },
  { name: 'Cuisine', icon: 'ri-restaurant-line' },
  { name: 'Chambre', icon: 'ri-hotel-bed-line' },
  { name: 'Salle de bain', icon: 'ri-drop-line' },
  { name: 'WC', icon: 'ri-water-flash-line' },
  { name: 'Couloir', icon: 'ri-arrow-right-line' },
  { name: 'Garage', icon: 'ri-parking-line' },
  { name: 'Jardin / Terrasse', icon: 'ri-plant-line' },
];
