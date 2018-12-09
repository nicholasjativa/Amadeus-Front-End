import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as SocketIOClient from 'socket.io-client';
import { Store } from '@ngrx/store';
import { AmadeusState } from '../../store/reducers/root';
import { OpenWebSocketConnectionSuccess, OpenWebSocketConnectionError } from '../../store/actions/app';

@Injectable()
export class WebsocketService {
  private socket: SocketIOClient.Socket;

  constructor(private store: Store<AmadeusState>) {}

  public initSocket(): void {
    this.socket = SocketIOClient(environment.WS_URL);

    this.socket.on('connect', () => this.store.dispatch(new OpenWebSocketConnectionSuccess()));
    this.socket.on('connect_error', () => this.store.dispatch(new OpenWebSocketConnectionError()));

    this.onMessage().subscribe(data => console.log(data));
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }

  public onOwnMessageSentOnAndroid(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("ownMessageSentOnAndroid", (message) => observer.next(message));
    });
  }

  public onReceivedMessageFromAndroid(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("receivedMessageFromAndroid", (message) => observer.next(message));
    });
  }

  public onSendInitialMessages(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("sendInitialMessages", (messages) => observer.next(messages));
    });
  }

  public onSendOutgoingMessageUpstreamToWebsocketWithInitialState(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("sendOutgoingMessageUpstreamToWebsocketWithInitialState", (message) => observer.next(message));
    });
  }

  public onSendToAndroidSuccessful(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("sendToAndroidSuccessful", (message) => {
        observer.next(message);
      })
    });
  }

  public onSocketConnect(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.socket.on('connect', () => observer.next(true));
    });
  }

  public onUpdateSnippetSidebar(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("updateSnippetSidebar", (message) => observer.next(message));
    });
  }

  public send(message): void {
    this.socket.emit("message", message);
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
