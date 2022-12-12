import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CheckAccountService } from 'src/app/services/check-account.service';

@Component({
  selector: 'app-check-account',
  templateUrl: './check-account.component.html',
  styleUrls: ['./check-account.component.scss'],
})
export class CheckAccountComponent {
  isTerms = false;
  accountForm: FormGroup;
  isAddAccount = 1;
  status: number[] = [];

  constructor(private checkAccountService: CheckAccountService) {
    this.accountForm = new FormGroup({
      account: new FormArray([
        new FormGroup({
          account: new FormControl('', [
            Validators.required,
            Validators.maxLength(20),
            Validators.minLength(20),
          ]),
          bik: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.maxLength(9),
            Validators.minLength(9),
          ]),
        }),
      ]),
      terms: new FormControl(false, Validators.requiredTrue),
    });
  }

  clickInput() {
    this.status = [];
  }

  addAccount() {
    (<FormArray>this.accountForm.controls['account']).push(
      new FormGroup({
        account: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(20),
        ]),
        bik: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(9),
          Validators.minLength(9),
        ]),
      })
    );
    this.isAddAccount++;
  }

  deleteAccount(i: number) {
    (<FormArray>this.accountForm.controls['account']).removeAt(i);
    this.isAddAccount--;
  }

  getFormsControls(): FormArray {
    return this.accountForm.controls['account'] as FormArray;
  }

  get account(): FormArray {
    return this.accountForm.get('account') as FormArray;
  }

  getErrorMessageBik(index: number) {
    if (
      this.account.controls[index]['controls'].bik.hasError('required') &&
      this.account.controls[index]['controls'].bik.touched
    ) {
      return 'Это поле не должно быть пустым';
    } else if (
      this.account.controls[index]['controls'].bik.hasError('pattern') &&
      this.account.controls[index]['controls'].bik.touched
    ) {
      return 'Только числа';
    } else if (
      this.account.controls[index]['controls'].bik.hasError('maxlength') &&
      this.account.controls[index]['controls'].bik.touched
    ) {
      return 'Не больше 9 символов';
    } else if (
      this.account.controls[index]['controls'].bik.hasError('minlength') &&
      this.account.controls[index]['controls'].bik.touched
    ) {
      return 'Не меньше 9 символов';
    } else {
      return '';
    }
  }

  getErrorMessageAccount(index: number) {
    if (
      this.account.controls[index]['controls'].account.hasError('required') &&
      this.account.controls[index]['controls'].account.touched
    ) {
      return 'Это поле не должно быть пустым';
    } else if (
      this.account.controls[index]['controls'].account.hasError('maxlength') &&
      this.account.controls[index]['controls'].account.touched
    ) {
      return 'Не больше 20 символов';
    } else if (
      this.account.controls[index]['controls'].account.hasError('minlength') &&
      this.account.controls[index]['controls'].account.touched
    ) {
      return 'Не меньше 20 символов';
    } else {
      return '';
    }
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
    for (let i = 0; i < this.accountForm.value.account.length; i++) {
      let res = this.checkAccountService.checkAccount(
        this.accountForm.value.account[i].bik,
        this.accountForm.value.account[i].account
      );
      this.status.push(res ? 1 : 2);
    }
  }
}
