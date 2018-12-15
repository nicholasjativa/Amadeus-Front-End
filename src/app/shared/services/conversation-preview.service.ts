import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConversationPreviewService {

  constructor(
    private http: HttpClient) {
  }

  public getConversationPreviews(): Observable<any> {
    return this.http.get(`${environment.API_URL}/snippets`);
  }

}
