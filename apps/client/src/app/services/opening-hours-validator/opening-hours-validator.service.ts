import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { isTimeInInterval } from '@appointment-app-hdm/shared';
import { first, map } from 'rxjs';
import { BranchesService } from '../branches/branches.service';

@Injectable({
  providedIn: 'root',
})
export class OpeningHoursValidatorService {
  constructor(private readonly branchessService: BranchesService) {}

  openingHoursValidator(
    timeControlName: string,
    branchIdControlName: string
  ): AsyncValidatorFn {
    return (group: AbstractControl) => {
      const time = group.get(timeControlName)?.value;
      const branchId = group.get(branchIdControlName)?.value as string;
      return this.branchessService.getAll().pipe(
        first(),
        map((perBranch) => perBranch[branchId]),
        map((openingHoursOfBranch) => {
          console.log('validate::', openingHoursOfBranch);
          if (time == null || openingHoursOfBranch == null) {
            return { openingHours: 'Could not find time or opening hours' };
          }

          return isTimeInInterval(
            time,
            openingHoursOfBranch.openingHoursStart,
            openingHoursOfBranch.openingHoursEnd
          )
            ? null
            : {
                openingHours: `time is outside of the business hours (${openingHoursOfBranch.openingHoursStart} – ${openingHoursOfBranch.openingHoursEnd})`,
              };
        })
      );
    };
  }
}
