import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../../../../core/models/todo.model';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [AsyncPipe, DatePipe],
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @Input() allTodos$!: Observable<Todo[]>;
}
