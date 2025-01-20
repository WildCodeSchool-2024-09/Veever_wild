export type Activities = {
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
  activityId: number;
  chrData: ChrData;
};
