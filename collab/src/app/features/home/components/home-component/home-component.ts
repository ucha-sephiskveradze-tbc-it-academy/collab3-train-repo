import { Component } from '@angular/core';
import { TodoContainer } from '../todo/container/todo/todo.container';

@Component({
  selector: 'app-home-component',
  imports: [TodoContainer],
  standalone: true,
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {}
