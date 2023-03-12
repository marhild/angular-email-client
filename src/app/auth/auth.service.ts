import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface UsernameAvailableResponse {
  available: boolean;
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface signupResponse {
  ussername: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {

    return this.http.post<UsernameAvailableResponse>(this.rootUrl + '/auth/username', {
      username
    })

  }

  signup(credentials: SignupCredentials) {
    return this.http.post<signupResponse>(this.rootUrl + '/auth/signup', credentials)
  }
}
