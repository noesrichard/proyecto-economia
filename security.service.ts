import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  key = 'clave'
  constructor() { }

  encrypt(x: string | null): string{
    if(x == null){
      return ''
    }
    return CryptoJS.AES.encrypt(x, this.key).toString();
  }

  decrypt(x: string | null): string{
    if(x == null){
      return ''
    }
    return CryptoJS.AES.decrypt(x, this.key).toString(CryptoJS.enc.Utf8);
  }
}
