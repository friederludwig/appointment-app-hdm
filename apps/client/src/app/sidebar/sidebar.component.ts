import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
      route: '/appointments',
      title: 'Appointments',
    },
    {
      id: 1,
      route: '/appointment/create',
      title: 'New Appointment',
    },
  ];
}
