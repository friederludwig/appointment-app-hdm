import { OpeningHoursPerBranch } from '@appointment-app-hdm/api-interfaces';
import { Injectable } from '@nestjs/common';

export const openingHoursPerBranch: OpeningHoursPerBranch = {
  Berlin: {
    openingHoursStart: '08:00',
    openingHoursEnd: '16:00',
  },
  Dortmund: {
    openingHoursStart: '07:00',
    openingHoursEnd: '20:00',
  },
};

@Injectable()
export class BranchService {
  getAll(): OpeningHoursPerBranch {
    return openingHoursPerBranch;
  }
}
