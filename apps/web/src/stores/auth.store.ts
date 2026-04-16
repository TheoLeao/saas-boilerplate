import { create } from 'zustand';
import { api } from '@/lib/api';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  login: async (email, password) => {
    const res = await api.post<{ user: User }>('/auth/login', {
      email,
      password,
    });
    set({ user: res.user });
  },

  register: async (data) => {
    const res = await api.post<{ user: User }>('/auth/register', data);
    set({ user: res.user });
  },

  logout: async () => {
    await api.post('/auth/logout');
    set({ user: null });
  },

  fetchUser: async () => {
    try {
      const user = await api.get<User>('/auth/me');
      set({ user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },
}));
