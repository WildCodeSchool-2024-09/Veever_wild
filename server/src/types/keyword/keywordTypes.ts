export type Keyword = {
  id: number;
  name: string;
};

export type Illustration = {
  id: number;
  link: string;
};

export type ClientKeyword = {
  id: number;
  client_id: number;
  keyword_id: number;
};
