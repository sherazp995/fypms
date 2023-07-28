import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
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

  update_user(data: any, id: any): Observable<any> {
    return this.http.post(this.url + 'users/update/' + id, data)
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

  find_projects(data: any): Observable<any> {
    return this.http.post(this.url + 'projects/find', data)
  }

  all_projects(): Observable<any> {
    return this.http.get(this.url + 'projects/all')
  }

  upload_project(data: any): Observable<any> {
    return this.http.post(this.url + 'projects/create', data)
  }

  delete_project(id: string): Observable<any> {
    return this.http.post(this.url + 'projects/delete/' + id, '')
  }

  all_groups(): Observable<any> {
    return this.http.get(this.url + 'groups/all')
  }

  group(id: string): Observable<any> {
    return this.http.get(this.url + 'groups/' + id)
  }

  create_group(group: any): Observable<any> {
    return this.http.post(this.url + 'groups/create', group)
  }

  find_groups(data: any): Observable<any> {
    return this.http.post(this.url + 'groups/find', data)
  }

  task(id: string): Observable<any> {
    return this.http.get(this.url + 'tasks/' + id)
  }

  find_tasks(data: any): Observable<any> {
    return this.http.post(this.url + 'tasks/find', data)
  }

  create_task(task: any): Observable<any> {
    return this.http.post(this.url + 'tasks/create', task)
  }

  upload_document(document: any): Observable<any> {
    return this.http.post(this.url + 'documents/create', document)
  }

  find_documents(data: any): Observable<any> {
    return this.http.post(this.url + 'documents/find', data)
  }

  task_result(id: string): Observable<any> {
    return this.http.get(this.url + 'taskResults/' + id)
  }

  find_task_results(data: any): Observable<any> {
    return this.http.post(this.url + 'taskResults/find', data)
  }

  create_task_result(task: any): Observable<any> {
    return this.http.post(this.url + 'taskResults/create', task)
  }

}
