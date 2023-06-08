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
  uploadURL = this.url + 'uploads/';

  register(data: any): Observable<any> {
    return this.http.post(this.url + 'users/register', data)
  }

  login(data: any): Observable<any> {
    return this.http.post(this.url + 'users/login', data)
  }

  all_users(): Observable<any> {
    return this.http.get(this.url + 'users/all')
  }

  user(id: string): Observable<any> {
    return this.http.get(this.url + 'users/' + id)
  }

  students_by_project(id: string): Observable<any> {
    return this.http.get(this.url + 'users/students_by_project/' + id)
  }

  project_by_supervisor(id: string): Observable<any> {
    return this.http.get(this.url + 'projects/project_by_supervisor/' + id)
  }

  project(id: string): Observable<any> {
    return this.http.get(this.url + 'projects/' + id)
  }

  select_project(data: any): Observable<any> {
    return this.http.post(this.url + 'projects/select/', data)
  }

  reject_project(data: any): Observable<any> {
    return this.http.post(this.url + 'projects/reject/', data)
  }

  all_projects(): Observable<any> {
    return this.http.get(this.url + 'projects/all')
  }

  upload_project(data: any): Observable<any> {
    return this.http.post(this.url + 'projects/create', data)
  }

  delete_project(id: string): Observable<any> {
    return this.http.post(this.url + 'projects/delete', { id: id })
  }

  all_groups(): Observable<any> {
    return this.http.get(this.url + 'groups/all')
  }
}
