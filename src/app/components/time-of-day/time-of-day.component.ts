import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-of-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-of-day.component.html',
  styleUrl: './time-of-day.component.scss'
})
export class TimeOfDayComponent {

  date: Date = new Date();

}

