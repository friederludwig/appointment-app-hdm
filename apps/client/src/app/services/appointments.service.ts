import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Appointment,
  OpeningHoursPerBranch,
} from '@appointment-app-hdm/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Appointment[]>(`/api/appointment`);
  }

  getById(id: number) {
    return this.httpClient.get<Appointment>(`/api/appointment/${id}`);
  }
  updateById(id: number, updateData: Partial<Appointment>) {
    return this.httpClient.patch<Appointment>(
      `/api/appointment/${id}`,
      updateData
    );
  }
  deleteById(id: number) {
    return this.httpClient.delete<boolean>(`/api/appointment/${id}`);
  }
  getOpeningHoursPerBranch() {
    return this.httpClient.get<OpeningHoursPerBranch>('/api/branches');
  }
}
