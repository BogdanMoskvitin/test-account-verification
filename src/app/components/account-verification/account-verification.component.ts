import { Component } from '@angular/core';

enum DrawerTab {
  AboutService,
  CheckAccount,
}

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss'],
})
export class AccountVerificationComponent {
  DrawerTab = DrawerTab;
  currentTab: DrawerTab = 1;

  constructor() {}

  changeTab(tab: DrawerTab) {
    this.currentTab = tab;
  }
}
