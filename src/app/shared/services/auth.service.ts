import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public destroyCookie(): void {
    const cookie = this.getCookie();
    document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }

  public getCookie(): string {
    return document.cookie;
  }

}
