import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as SocketIOClient from 'socket.io-client';
import { Store } from '@ngrx/store';
import { AmadeusState } from '../../store/reducers/root';
import { OpenWebSocketConnectionSuccess, OpenWebSocketConnectionError } from '../../store/actions/app';
import { AndroidMessage } from '../../models/androidMessage';
import { ReceivedAndroidMessage } from '../../store/actions/androidMessages';

@Injectable()
export class WebsocketService {
  private socket: SocketIOClient.Socket;

  constructor(private store: Store<AmadeusState>) {}

  public initSocket(): void {
    this.socket = SocketIOClient(environment.WS_URL);

    this.socket.on('connect', () => this.store.dispatch(new OpenWebSocketConnectionSuccess()));
    this.socket.on('connect_error', () => this.store.dispatch(new OpenWebSocketConnectionError()));

    this.socket.on('message', (data) => console.log(data));

    this.socket.on('receivedMessageFromAndroid', (message: AndroidMessage) => 
      new ReceivedAndroidMessage(message));
    
    this.socket.on('ownMessageSentOnAndroid', (message) => null);
    
    this.socket.on('sendOutgoingMessageUpstreamToWebsocketWithInitialState', (message) => null);

    this.socket.on('sendToAndroidSuccessful', (message) => null);

    this.socket.on('updateSnippetSidebar', (message) => null);
  }

  // TODO modify this to handle ACK messages
  public sendText(data): Observable<any> {
    this.socket.emit("relayDataForTextMessageCreation", data);
    return new Observable<any>(observer => {
      this.socket.on("sendToAndroidSuccessful", () => {
        observer.next(true);
      });
      this.socket.on("sendToAndroidError", () => {
        observer.next(false);
      });
    });
  }


}
