import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent {
  @Output() onAgree = new EventEmitter<boolean>();

  constructor() {}

  agree() {
    this.onAgree.emit(true);
  }
}
