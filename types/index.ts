export type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address?: string;
  contact_number?: string;
  birthday?: string;
  profile_image?: string;
  bio?: string;
}

export type TErrorResponse = {
  status: number;
  message: string;
};

export const PRIORITY = {
  EXTREME: "extreme",
  MODERATE: "moderate",
  LOW: "low",
} as const;

export type TPriority = typeof PRIORITY[keyof typeof PRIORITY];

export type TTask = {
  id?: number;
  title: string;
  description: string;
  is_completed?: boolean;
  priority?: string;
  position?: number;
  todo_date?: string | null;
  created_at?: Date;
  updated_at?: Date;
};

