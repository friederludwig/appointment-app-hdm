export interface Appointment {
  id?: number;
  date: string;
  time: string;
  status: string;
  vehicleRegNo: string;
  vehicleOwner: string;
  branch: string;
  assignment: string;
}

export interface OpeningHours {
  openingHoursStart: string;
  openingHoursEnd: string;
}

export type OpeningHoursPerBranch = Record<string, OpeningHours>;

export interface User {
  id?: number;
  email: string;
  username: string;
  password?: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
