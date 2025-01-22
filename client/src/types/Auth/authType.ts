export type UserType = {
  id: number;
  name: string;
  role: "admin" | "client";
};

export type AuthContextType = {
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => void;
  isAdmin: () => boolean;
};
