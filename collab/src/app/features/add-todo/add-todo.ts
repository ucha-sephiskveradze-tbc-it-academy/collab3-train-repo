import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Todo } from '../../core/models/todo.model';
import { TodoService } from './service/add-todo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../core/models/user.model';
import { finalize, Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.scss',
})
export class AddTodo implements OnInit, OnDestroy {
  public todos = signal<Todo[]>([]);
  public userTodos$!: Observable<Todo[]>;
  public destroy$: Subject<void> = new Subject<void>();

  forma = signal({
    title: '',
    description: '',
    status: 'pending' as 'pending' | 'in-progress' | 'completed',
  });

  user!: IUser;
  id!: number;

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

    this.user = JSON.parse(localStorage.getItem('currentUser') || ' ');
    this.id = +this.user.id;

    console.log(this.id);

    this.userTodos$ = this.todoService.getTodosByUser(this.id);
  }

  addTodo() {
    const todo = {
      userId: this.id,
      title: this.forma().title,
      description: this.forma().description,
      status: this.forma().status,
      createdAt: new Date().toISOString(),
    };
    this.todoService
      .addTodo(todo)
      .pipe(
        tap((newTodo) => {
          this.todos.update((list) => [...list, newTodo]);
          this.forma.set({ title: '', description: '', status: 'pending' });
        }),
        takeUntil(this.destroy$),
        finalize(() => (this.userTodos$ = this.todoService.getTodosByUser(this.id)))
      )
      .subscribe();
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
