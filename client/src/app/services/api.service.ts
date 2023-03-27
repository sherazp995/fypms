import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url = environment.url;
  imgURL = this.url + 'uploads/';

  register(data): Observable<any> {
    return this.http.post(this.url + 'users/register', data)
  }

  login(data): Observable<any> {
    return this.http.post(this.url + 'users/login', data)
  }
}
