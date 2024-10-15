import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesService } from '../../../services/branches/branches.service';
import { Router } from '@angular/router';
import { Branch } from '@appointment-app-hdm/api-interfaces';
import { Observable } from 'rxjs';
import { BranchFormComponent } from '../branch-form/branch-form.component';

@Component({
  selector: 'app-branch-detail-route',
  standalone: true,
  imports: [CommonModule, BranchFormComponent],
  templateUrl: './branch-detail-route.component.html',
  styleUrl: './branch-detail-route.component.scss',
})
export class BranchDetailRouteComponent implements OnInit {
  @Input() id!: number;
  branch$!: Observable<Branch>;

  constructor(
    private branchesService: BranchesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.branch$ = this.branchesService.getById(this.id);
  }

  onUpdate(updatedBranch: Partial<Branch>) {
    if (updatedBranch.id) {
      this.branchesService
        .updateById(updatedBranch.id, updatedBranch)
        .subscribe();
    }
  }

  onDelete(id: number) {
    this.branchesService.deleteById(id).subscribe(() => {
      this.router.navigate(['/branches']);
    });
  }
}
