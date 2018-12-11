import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ThreadsService {

  constructor(
    private http: HttpClient) {
  }

  public getThreads(): Observable<any> {
    return this.http.get(`${environment.API_URL}/snippets`);
  }

}
