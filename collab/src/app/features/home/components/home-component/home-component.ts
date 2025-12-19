import { Component, inject, OnInit } from '@angular/core';
import { TodoContainer } from '../todo/container/todo/todo.container';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [TodoContainer, RouterLink],
  standalone: true,
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  router = inject(Router);

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
  }

  onLogout(): void {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
    this.router.navigate(['/jumbera'])
  }
}
