import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastComponent } from './components/cart-toast/toast.component';
import { AuthService } from './services/auth/auth.service';
import { Subscription } from 'rxjs';
import { GenericToastComponent } from './components/generic-toast/generic-toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ToastComponent,
    GenericToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): Subscription | undefined {
    return this.authService.authenticateUser()?.subscribe({
      next: (response) => {},
      error: (error) => {
        console.log('Auth invalid: ', error);
      },
    });
  }
}
