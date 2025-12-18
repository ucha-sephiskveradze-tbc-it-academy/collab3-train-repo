import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../../../../../../core/models/todo.model';
import { TodoComponent } from '../../components/todo.component';
@Component({
  selector: 'app-todo-container',
  imports: [TodoComponent],
  templateUrl: './todo.container.html',
  styleUrl: './todo.container.scss',
})
export class TodoContainer implements OnInit {
  public allTodos$!: Observable<Todo[]>;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.allTodos$ = this.todoService.getAllTodo();
  }
}
