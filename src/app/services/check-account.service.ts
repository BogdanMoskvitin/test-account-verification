import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckAccountService {
  constructor() {}

  checkAccount(bik: string, account: string) {
    // 1
    let shortBik = 0 + bik[4] + bik[5];
    // 2
    let accountArr = account.split('');
    let changeAccountArr: string[] = [];
    accountArr.forEach((el) => {
      if (el == 'А' || el == 'A') {
        changeAccountArr.push('0');
      } else if (el == 'В' || el == 'B') {
        changeAccountArr.push('1');
      } else if (el == 'С' || el == 'C') {
        changeAccountArr.push('2');
      } else if (el == 'Е' || el == 'E') {
        changeAccountArr.push('3');
      } else if (el == 'Н' || el == 'H') {
        changeAccountArr.push('4');
      } else if (el == 'К' || el == 'K') {
        changeAccountArr.push('5');
      } else if (el == 'М' || el == 'M') {
        changeAccountArr.push('6');
      } else if (el == 'Р' || el == 'P') {
        changeAccountArr.push('7');
      } else if (el == 'Т' || el == 'T') {
        changeAccountArr.push('8');
      } else if (el == 'Х' || el == 'X') {
        changeAccountArr.push('9');
      } else {
        changeAccountArr.push(el);
      }
    });
    changeAccountArr[8] = '0';
    let changeAccountStr = changeAccountArr.join('');
    // 3
    let bikAcc = shortBik + changeAccountStr;
    let bikAccArr = bikAcc.split('');
    const coff = '71371371371371371371371'.split('');
    let product: string[] = [];
    for (let i = 0; i < bikAccArr.length; i++) {
      product.push((+bikAccArr[i] * +coff[i]).toString());
    }
    // 4
    let minProduct: string[] = [];
    for (let i = 0; i < product.length; i++) {
      minProduct.push(product[i].slice(-1));
    }
    let sum = 0;
    for (let i = 0; i < minProduct.length; i++) {
      sum += +minProduct[i];
    }
    // 5
    let key = +sum.toString().slice(-1);
    key = key * 3;
    key = +key.toString().slice(-1);
    bikAccArr[11] = key.toString();
    // 6
    product = [];
    for (let i = 0; i < bikAccArr.length; i++) {
      product.push((+bikAccArr[i] * +coff[i]).toString());
    }
    minProduct = [];
    for (let i = 0; i < product.length; i++) {
      minProduct.push(product[i].slice(-1));
    }
    sum = 0;
    for (let i = 0; i < minProduct.length; i++) {
      sum += +minProduct[i];
    }
    let check = +sum.toString().slice(-1);
    return check == 0 ? true : false;
  }
}
