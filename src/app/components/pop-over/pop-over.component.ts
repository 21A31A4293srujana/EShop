import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-over',
  standalone: true,
  imports: [OverlayPanelModule, ButtonModule, CommonModule, RouterLink],
  templateUrl: './pop-over.component.html',
  styleUrl: './pop-over.component.scss',
})
export class PopOverComponent implements OnInit {
  @ViewChild('op') op!: PopOverComponent;
  isAdmin: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAdminAuthenticate$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  toggle(event: Event) {
    this.op.toggle(event);
  }

  logout() {
    this.authService.logout();
  }
}
