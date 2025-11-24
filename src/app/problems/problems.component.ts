import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-problems',
  standalone: true, // Ensures it's a standalone component
  imports: [CommonModule], // Import CommonModule for Angular directives
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent {
  winnersList: any[] = [];

  ngOnInit(): void {
    const storedWinners = localStorage.getItem('winnersList');
    if (storedWinners) {
      this.winnersList = JSON.parse(storedWinners);
    }
  }
}

