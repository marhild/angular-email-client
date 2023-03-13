import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SigninCredentials {
  username: string;
  password: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  
  // null: app does not yet know login status
  signedin$ =  new BehaviorSubject<boolean | null>(null);

  constructor(private http: HttpClient) { }


  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  // check if user is signed in
  checkAuth() {
    return this.http
      .get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({authenticated}) => {
          this.signedin$.next(authenticated);
        })
      );
  }

  signout() {
    return this.http.post<any>(`${this.rootUrl}/auth/signout`, {})
    .pipe(
      tap(() => {
        // signed out 
        this.signedin$.next(false);
      })
    )
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<any>(`${this.rootUrl}/auth/signin`, credentials)
    .pipe(
      // if error then will skip tap()
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }

}
