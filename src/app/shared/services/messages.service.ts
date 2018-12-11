import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AmadeusMessage } from '../../models/amadeusMessage';

@Injectable()
export class MessagesService {

  constructor(private http: HttpClient) {
  }

  public getMessages(phone_num_clean: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/texts/getConversationMessages`, {
      phone_num_clean
    });
  }

  public sendMessageToServer(message: AmadeusMessage): Observable<any> {
    
    return this.http.post(`${environment.API_URL}/texts/send-to-device`, message);
  }
}
