import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeContainer } from './features/home/container/home.container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeContainer],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
