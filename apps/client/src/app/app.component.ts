import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/system/sidebar/sidebar.component';

@Component({
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
}
