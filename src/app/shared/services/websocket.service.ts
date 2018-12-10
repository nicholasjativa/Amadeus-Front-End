import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as SocketIOClient from 'socket.io-client';
import { Store } from '@ngrx/store';
import { AmadeusState } from '../../store/reducers/root';
import { OpenWebSocketConnectionSuccess, OpenWebSocketConnectionError } from '../../store/actions/app';
import { AndroidMessage } from '../../models/androidMessage';
import { ReceivedAndroidMessage, ReceivedAmadeusMessageStatus, AndroidReceivedAmadeusMessage } from '../../store/actions/androidMessages';
import { AmadeusMessageStatus } from '../../models/amadeusMessageStatus';
import { Thread } from '../../models/thread';
import { ReceivedThreadMessage } from '../../store/actions/threads';

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
    
    this.socket.on('sendOutgoingMessageUpstreamToWebsocketWithInitialState', (message: AmadeusMessageStatus) =>
      new ReceivedAmadeusMessageStatus(message));

    this.socket.on('sendToAndroidSuccessful', (message: AmadeusMessageStatus) =>
      new AndroidReceivedAmadeusMessage(message));
    
    // TODO this may or may not need to have its own websocket message
    this.socket.on('updateSnippetSidebar', (message: Thread) =>
      new ReceivedThreadMessage(message));
  }

}
