import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/users';

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.API_URL);
  }
}
