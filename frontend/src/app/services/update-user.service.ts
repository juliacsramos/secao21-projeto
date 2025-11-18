import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  private readonly _httpClient = inject(HttpClient);
  
  updateUser(userInfos: { name: string; email: string; username: string; password: string }) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set( 'authorization', 'Bearer ' +localStorage.getItem('token')!);
    return this._httpClient.put<{ message: string; token: string }>('http://localhost:3000/update-user', 
      userInfos, 
      { headers, }
    ).pipe(
      map((updatedUserResponse) => {
        localStorage.setItem('token', updatedUserResponse.token);
        return updatedUserResponse;
      })
    );
  }
}
