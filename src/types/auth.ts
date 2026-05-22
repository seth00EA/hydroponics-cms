export type UserRole = "owner" | "staff" | "customer";

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
};

export type AuthSession = {
  userId: string;
  email: string;
  profile: Profile;
};
