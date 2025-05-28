// src/features/auth/authTypes.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
