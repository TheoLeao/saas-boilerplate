// ─── Enums ───────────────────────────────────────────────

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum Plan {
  FREE = 'FREE',
  PRO = 'PRO',
  BUSINESS = 'BUSINESS',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  PAST_DUE = 'PAST_DUE',
  CANCELED = 'CANCELED',
  TRIALING = 'TRIALING',
}

// ─── API Contracts ───────────────────────────────────────

export interface ApiUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: Role;
  createdAt: string;
}

export interface ApiSubscription {
  id: string;
  plan: Plan;
  status: SubscriptionStatus;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd: boolean;
}

export interface ApiUserWithSubscription extends ApiUser {
  subscription?: ApiSubscription;
}

// ─── Auth ────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: ApiUser;
  token: string;
}

// ─── Common ──────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}
