import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, User } from '@appointment-app-hdm/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  login(user: User): Observable<LoginResponse> {
    return new Observable((observer) => {
      this.httpClient
        .post<LoginResponse>('api/auth/login', {
          email: user.email,
          password: user.password,
        })
        .subscribe({
          next: (res: LoginResponse) => {
            localStorage.setItem('token', res.access_token);
            console.log('login');
            observer.next(res);
          },
          error: (err) => {
            observer.error(err);
          },
        });
    });
  }

  register(user: User): Observable<User> {
    return new Observable((observer) => {
      this.httpClient.post<User>('api/user', user).subscribe({
        next: (res: User) => {
          console.log(user.username, ' registered');
          observer.next(res);
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }
}
