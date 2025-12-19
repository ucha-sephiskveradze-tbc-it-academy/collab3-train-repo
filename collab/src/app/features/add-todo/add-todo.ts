import { Component, signal } from '@angular/core';
import { Todo } from '../../core/models/todo.model';
import { TodoService } from './service/add-todo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    status: 'pending' as 'pending' | 'in-progress' | 'completed',
  });

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos.set(data);
    });

    this.route.queryParamMap.subscribe((params) => {
      const search = params.get('search')?.toLowerCase() || '';
      const status = params.get('status')?.toLowerCase() || '';

      this.applyFilters({ search, status });
    });
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
      this.forma.set({ title: '', description: '', status: 'pending' });
    });
  }

  private applyFilters(options: { search: string; status: string }) {
    const { search, status } = options;
    let result = [...this.todos()];

    if (search) {
      result = result.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (status) {
      result = result.filter((t) => t.status.toLowerCase() === status.toLowerCase());
    }

    this.todos.set(result);
  }

  updateQuery(params: any) {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
