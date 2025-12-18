import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../../../../core/models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`);
  }
}
