import { Injectable } from '@angular/core';
import { Todo } from '../../../core/models/todo.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = 'http://localhost:3000/todos';
  private id = 0;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}`);
  }

  addTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo);
  }

  getTodosByUser(userId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}?userId=${userId}`);
  }
}
