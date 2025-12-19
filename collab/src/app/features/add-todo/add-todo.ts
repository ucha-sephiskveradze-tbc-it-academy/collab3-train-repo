import { Component, signal } from '@angular/core';
import { Todo } from '../../core/models/todo.model';
import { TodoService } from './service/add-todo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.scss',
})
export class AddTodo {
  todos = signal<Todo[]>([]);
  forma = signal({
    title: '',
    description: '',
    status: 'pending' as 'pending' | 'progress' | 'completed',
  });
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe((data) => this.todos.set(data));
  }

  addTodo() {
    const todo = {
      userId: 1,
      title: this.forma().title,
      description: this.forma().description,
      status: this.forma().status,
      createdAt: new Date().toISOString(),
    };
    this.todoService.addTodo(todo).subscribe((newTodo) => {
      this.todos.update((list) => [...list, newTodo]);

      this.forma.set({
        title: '',
        description: '',
        status: 'pending',
      });
    });
  }
}
