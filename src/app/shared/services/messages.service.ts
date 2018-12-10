import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable()
export class MessagesService {
  public textsMessagesObserver: Observer<any>;
  public textsMessagesObservable: Observable<any>;

  constructor(private http: HttpClient , private socketService: WebsocketService) {
    this.textsMessagesObservable = new Observable(observer => {``
      this.textsMessagesObserver = observer;
    });
  }

  public getMessages(phone_num_clean: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/texts/getConversationMessages`, {
      phone_num_clean
    });
  }

  public sendMessageToServer(toPhoneNumber, textMessageBody): void {
    const data = {
      fromPhoneNumber: 'USER_PHONE_NUMBER', // todo: this should be abstracted out somewhere
      toPhoneNumber,
      textMessageBody
    };
    
    this.http.post(`${environment.API_URL}/texts/send-to-device`, data)
      .subscribe(response => {
        console.log(response);
      });
  }
}
