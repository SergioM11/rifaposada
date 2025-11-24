import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-winner-modal',
  templateUrl: './winner-modal.component.html',
  styleUrls: ['./winner-modal.component.css']
})
export class WinnerModalComponent {
  @Input() winnerName: string = '';
  @Input() winnerEmail: string = '';

  constructor(public modal: NgbActiveModal) {}
}
