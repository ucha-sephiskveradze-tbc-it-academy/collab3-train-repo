import { Component } from '@angular/core';
import { TodoContainer } from '../todo/container/todo/todo.container';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [TodoContainer, RouterLink],
  standalone: true,
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {}
