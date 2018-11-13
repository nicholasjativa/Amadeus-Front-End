import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConversationService {
  public textsMessagesObserver: Observer<any>;
  public textsMessagesObservable: Observable<any>;

  constructor(private http: HttpClient , private socketService: WebsocketService) {
    this.textsMessagesObservable = new Observable(observer => {
      this.textsMessagesObserver = observer;
    });
    this.socketService.initSocket();
  }

  getConversationMessages(phone_num_clean: number) {
    return this.http.post(`${environment.API_URL}/texts/getConversationMessages`, {
      phone_num_clean
    });
  }

  listenForMessageFromAndroid() {
    return this.socketService.onReceivedMessageFromAndroid().share();
  }

  listenForOwnMessageSentOnAndroid() {
    return this.socketService.onOwnMessageSentOnAndroid();
  }

  listenForOutgoingMessageAcknowledgement() {
    return this.socketService.onSendOutgoingMessageUpstreamToWebsocketWithInitialState();
  }

  listenForSendToAndroidSuccessful() {
    return this.socketService.onSendToAndroidSuccessful();
  }

  sendMessageToServer(toPhoneNumber, textMessageBody) {
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
