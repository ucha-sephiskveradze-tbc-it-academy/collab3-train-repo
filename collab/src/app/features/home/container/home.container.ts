import { Component } from '@angular/core';
import { HomeComponent } from '../components/home-component/home-component';

@Component({
  selector: 'app-home',
  imports: [HomeComponent],
  standalone: true,
  templateUrl: './home.container.html',
  styleUrls: ['./home.container.scss'],
})
export class HomeContainer {}
