import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AmadeusMessage } from '../../models/amadeusMessage';

@Injectable()
export class ConversationService {

  constructor(private http: HttpClient) {
  }

  public getConversationByPhoneNumber(phone_num_clean: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/texts/get-conversation-messages`, {
      phone_num_clean
    });
  }

  public sendMessageToServer(message: AmadeusMessage): Observable<any> {
    
    return this.http.post(`${environment.API_URL}/texts/send-to-device`, message);
  }
}
