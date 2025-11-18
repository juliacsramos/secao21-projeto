import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly _httpClient = inject(HttpClient);

  login(username: string, password: string): Observable<{ token: string }> {
    return this._httpClient.post<{ token: string }>('http://localhost:3000/login', { 
      username, password 
    }).pipe(
      map((tokenResponse) => {
        localStorage.setItem('token', tokenResponse.token);
        return tokenResponse;
       })
    );
  }

}
