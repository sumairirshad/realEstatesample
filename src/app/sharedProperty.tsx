

export type ListingType = "rent" | "sell"; 

export type APIProperty = {
  id: number;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  carspots: number;
  imageUrl: string;
  listingType: number; 
  isFavourite: boolean;
  descritption:string;
};

export type PropertyCardData = Omit<APIProperty, "listingType"> & {
  listingType: ListingType; 
}
