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