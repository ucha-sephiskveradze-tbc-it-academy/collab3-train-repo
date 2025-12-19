import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Register {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/users';

  registerUser(userData: RegisterData): Observable<any> {
    return this.http.post(this.API_URL, userData);
  }
}
