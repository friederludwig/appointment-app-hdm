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
