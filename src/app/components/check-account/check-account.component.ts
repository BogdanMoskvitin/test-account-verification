import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckAccountService } from 'src/app/services/check-account.service';

@Component({
  selector: 'app-check-account',
  templateUrl: './check-account.component.html',
  styleUrls: ['./check-account.component.scss'],
})
export class CheckAccountComponent {
  isTerms = false;
  accountForm: FormGroup;
  message = { value: '', color: '' };

  constructor(private checkAccountService: CheckAccountService) {
    this.accountForm = new FormGroup({
      bik: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(9),
        Validators.minLength(9),
      ]),
      account: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(20),
      ]),
      terms: new FormControl(false, Validators.requiredTrue),
    });
  }

  clickInput() {
    this.message = { value: '', color: '' };
  }

  openTerms() {
    this.isTerms = true;
  }

  onAgree(event: boolean) {
    this.isTerms = false;
    this.accountForm.patchValue({
      terms: event,
    });
  }

  submit() {
    let res = this.checkAccountService.checkAccount(
      this.accountForm.value.bik,
      this.accountForm.value.account
    );
    if (res) {
      this.message.value = 'Счет указан корректно';
      this.message.color = 'green';
    } else {
      this.message.value = 'Указан неверный номер счета';
      this.message.color = 'red';
    }
  }
}
