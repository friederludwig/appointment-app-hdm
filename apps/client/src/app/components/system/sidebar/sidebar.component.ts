import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  navigation = [
    {
      id: 0,
      route: '/appointment/create',
      title: 'New Appointment',
    },
    {
      id: 1,
      route: '/appointments',
      title: 'Appointments',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
