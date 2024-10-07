import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpeningHoursPerBranch } from '@appointment-app-hdm/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  constructor(private httpClient: HttpClient) {}
  getAll() {
    return this.httpClient.get<OpeningHoursPerBranch>('/api/branches');
  }
}
