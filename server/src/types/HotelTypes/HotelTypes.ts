export type Hotels = {
  id: number;
  chr_id: number;
};
export type ChrData = {
  name: string;
  address: string;
  minPrice: number;
  maxPrice: number;
};
export type UpdateResponse = {
  chrId: number;
  chrData: ChrData;
};
