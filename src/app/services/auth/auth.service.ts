import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiURL;

  private userSubject = new Subject<UserAuth>();
  user$ = this.userSubject.asObservable();

  private isUserAuthenticateSubject = new BehaviorSubject<boolean>(false);
  isUserAuthenticate$ = this.isUserAuthenticateSubject.asObservable();

  private isAdminAuthenticateSubject = new BehaviorSubject<boolean>(false);
  isAdminAuthenticate$ = this.isAdminAuthenticateSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<UserAuth | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private fb: FormBuilder
  ) {
    // Check if user is already logged in on service initialization
    const token = localStorage.getItem('auth-token');
    if (token) {
      this.authenticateUser()?.subscribe();
    }
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  createRegisterForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]{10,}$/)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
        country: ['', Validators.required]
      })
    });
  }

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      withCredentials: false
    };
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, body, httpOptions)
      .pipe(
        tap((value) => {
          localStorage.setItem('auth-token', value.token);
          this.authenticateUser()?.subscribe(() => {});
        }),
        catchError(this.handleError)
      );
  }

  signup(email: string, password: string, name: string): Observable<any> {
    console.log('Signup process started');
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: "0000000000",
      address: {
        street: "Default Street",
        city: "Default City",
        state: "Default State",
        zipCode: "00000",
        country: "Default Country"
      }
    };
    
    console.log('Signup request body:', body);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      withCredentials: false
    };
    
    return this.http.post<{token: string}>(`${this.apiUrl}/auth/register`, body, httpOptions).pipe(
      tap((response) => {
        console.log('Signup response:', response);
        if (response && response.token) {
          console.log('Token received, storing in localStorage');
          localStorage.setItem('auth-token', response.token);
          
          // Immediately set user as authenticated
          this.isUserAuthenticateSubject.next(true);
          
          this.authenticateUser()?.subscribe({
            next: (user) => {
              console.log('User authenticated after signup:', user);
              this.router.navigate(['/profile']);
            },
            error: (error) => {
              console.error('Authentication error after signup:', error);
              // Still navigate to profile even if authentication fails
              this.router.navigate(['/profile']);
            }
          });
        }
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.currentUserSubject.next(null);
    this.isUserAuthenticateSubject.next(false);
    this.isAdminAuthenticateSubject.next(false);
    this.router.navigate(['/home']);
  }

  authenticateUser(): Observable<UserAuth> | null {
    const token = localStorage.getItem('auth-token');
    console.log('Authenticating user with token:', token ? 'Token exists' : 'No token');
    
    if (!token) {
      this.currentUserSubject.next(null);
      this.isUserAuthenticateSubject.next(false);
      this.isAdminAuthenticateSubject.next(false);
      return null;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    // Try the authenticate endpoint first
    console.log('Sending authenticate request to:', `${this.apiUrl}/authenticate`);
    
    return this.http
      .post<UserAuth>(`${this.apiUrl}/authenticate`, { token }, httpOptions)
      .pipe(
        tap((user: UserAuth) => {
          console.log('User authenticated successfully:', user);
          this.currentUserSubject.next(user);
          
          // Set authentication state based on user role
          if (user.role === 'USER') {
            this.isUserAuthenticateSubject.next(true);
            this.isAdminAuthenticateSubject.next(false);
          } else if (user.role === 'ADMIN') {
            this.isAdminAuthenticateSubject.next(true);
            this.isUserAuthenticateSubject.next(false);
          } else {
            // For any other role, set as user
            this.isUserAuthenticateSubject.next(true);
            this.isAdminAuthenticateSubject.next(false);
          }
        }),
        catchError((error) => {
          console.error('Authentication error:', error);
          
          // If the authenticate endpoint fails, try the auth/validate endpoint as a fallback
          if (error.status === 404) {
            console.log('Authenticate endpoint not found, trying auth/validate endpoint');
            return this.http
              .post<UserAuth>(`${this.apiUrl}/auth/validate`, { token }, httpOptions)
              .pipe(
                tap((user: UserAuth) => {
                  console.log('User validated successfully:', user);
                  this.currentUserSubject.next(user);
                  
                  // Set authentication state based on user role
                  if (user.role === 'USER') {
                    this.isUserAuthenticateSubject.next(true);
                    this.isAdminAuthenticateSubject.next(false);
                  } else if (user.role === 'ADMIN') {
                    this.isAdminAuthenticateSubject.next(true);
                    this.isUserAuthenticateSubject.next(false);
                  } else {
                    // For any other role, set as user
                    this.isUserAuthenticateSubject.next(true);
                    this.isAdminAuthenticateSubject.next(false);
                  }
                }),
                catchError((validateError) => {
                  console.error('Validation error:', validateError);
                  this.currentUserSubject.next(null);
                  this.isUserAuthenticateSubject.next(false);
                  this.isAdminAuthenticateSubject.next(false);
                  localStorage.removeItem('auth-token');
                  return throwError(() => validateError);
                })
              );
          }
          
          this.currentUserSubject.next(null);
          this.isUserAuthenticateSubject.next(false);
          this.isAdminAuthenticateSubject.next(false);
          localStorage.removeItem('auth-token');
          return throwError(() => error);
        })
      );
  }

  deleteAccount(): Observable<string> | null {
    const token: String | null = localStorage.getItem('auth-token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    if (token) {
      return this.http
        .post<string>(this.apiUrl + '/delete', token, httpOptions)
        .pipe(
          tap((message) => {
            return message;
          }),
          catchError(this.handleError)
        );
    }
    return null;
  }

  forgotPassword(email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      withCredentials: false
    };
    return this.http
      .post(`${this.apiUrl}/auth/forgot-password`, { email }, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.status === 0) {
      // Network error - backend is not running or not accessible
      errorMessage = 'Unable to connect to the server. Please make sure the backend service is running.';
    } else if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Server returned code ${error.status}`;
    }
    
    console.error('Auth error:', error);
    return throwError(() => new Error(errorMessage));
  }
}

interface UserAuth {
  id: string;
  email: string;
  username: string;
  role: string;
}
