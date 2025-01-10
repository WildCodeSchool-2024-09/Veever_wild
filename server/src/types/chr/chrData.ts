export type chrData = {
  name: string;
  address: string;
  minPrice: number;
  maxPrice: number;
};

export type Restaurant = {
  id: number;
  chr_id: number;
};

export type UpdateChrData = {
  restaurantId: number;
  chrData: chrData;
};

export type UpdateResultChr =
  | { success: true; chrId: number; chrData: chrData }
  | { success: false };
