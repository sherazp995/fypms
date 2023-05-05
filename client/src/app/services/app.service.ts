import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user = JSON.parse(localStorage.getItem('data'))
  constructor() { }

  get_user() {
    return this.user
  }
}
