export type PropertyType = {
  id: number;
  tenant: string;
  category: string;
  propertyName: string;
  description: string;
  imageUrl: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  rooms: { roomId: number; roomName: string; roomBasePrice: number }[];
};

export type PropertyAndRoomType = {
  id: number;
  tenant: string;
  category: string;
  propertyName: string;
  description: string;
  imageUrl: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  rooms?: RoomType[] | null;
};

export type RoomType = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  capacity: number;
  propertySummary: { propertyId: number; propertyName: string };
};

export type CategoryType = {
  id: number;
  name: string;
};

export type CurrentAvailablePropertyType = {
  id: number;
  tenant: string;
  category: string;
  propertyName: string;
  description: string;
  imageUrl: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  rooms?: AdjustedRatesType[] | null;
  unavailableRooms?: UnavailableRoomType[] | null;
};

export type AdjustedRatesType = {
  propertyId: number;
  propertyName: string;
  roomId: number;
  roomName: string;
  imageUrl: string;
  roomCapacity: number;
  roomDescription: string;
  basePrice: number;
  adjustedPrice: number;
  date: Date;
  isAvailable: boolean;
};

export type UnavailableRoomType = {
  propertyId: number;
  roomId: number;
  roomName: string;
  imageUrl: string;
  roomCapacity: number;
  basePrice: number;
};

export type LowestDailyRateType = {
  date: Date;
  lowestPrice: number;
  hasAdjustment: boolean;
};

export type AvailablePropertyType = {
  propertyId: number;
  tenant: string;
  propertyName: string;
  description: string;
  category: string;
  imageUrl: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  lowestBasePrice: number;
  lowestAdjustedPrice: number;
};

export type PropertyListingType = {
  totalPages: number;
  currentPage: number;
  totalElements: number;
  content: AvailablePropertyType[];
  //   {
  //   propertyId: number;
  //   tenant: string;
  //   propertyName: string;
  //   description: string;
  //   imageUrl: string;
  //   city: string;
  //   country: string;
  //   categoryName: string;
  //   longitude: number;
  //   latitude: number;
  //   lowestBasePrice: number;
  //   lowestAdjustedPrice: number;
  // }[];
};
