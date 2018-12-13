import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../shared/services/threads.service';
import { Store, select } from '@ngrx/store';
import { AmadeusState, selectThreadsState, selectMessagesState, selectUserState, selectAppState } from '../../store/reducers/root';
import * as ThreadsActions from '../../store/actions/threads';
import * as MessagesActions from '../../store/actions/messages';
import * as AppActions from '../../store/actions/app';
import * as AndroidMessagesActions from '../../store/actions/androidMessages';
import { Observable } from 'rxjs';
import { Thread } from '../../models/thread';
import { ThreadsState } from '../../store/reducers/threads';
import { MessagesState } from '../../store/reducers/messages';
import { Message } from '../../models/message';
import { Conversation } from '../../models/conversation';
import { UserState } from '../../store/reducers/user';
import { AppState } from '../../store/reducers/app';
import { AmadeusMessage } from '../../models/amadeusMessage';

@Component({
  selector: 'amadeus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public conversation: Conversation;
  public currentlySelectedConversationPhoneNumber: string = "";
  public messages: any[];
  public socketConnected: boolean;
  public threads: Thread[];
  public userPhoneNumber: string;
  public showSidebarOnMobile: boolean = true;
  
  private getAppState: Observable<AppState>;
  private getThreadsState: Observable<ThreadsState>;
  private getMessagesState: Observable<MessagesState>;
  private getUserState: Observable<UserState>;
  private messageReceivedNotification: HTMLAudioElement = new Audio('assets/audio/quite-impressed.mp3');

  constructor(public threadsService: ThreadsService, private store: Store<AmadeusState>) {
    this.getAppState = this.store.pipe(select(selectAppState));
    this.getThreadsState = this.store.pipe(select(selectThreadsState));
    this.getMessagesState = this.store.pipe(select(selectMessagesState));
    this.getUserState = this.store.pipe(select(selectUserState));
    this.store.dispatch(new AppActions.OpenWebSocketConnection());
  }

  public ngOnInit(): void {
    this.store.dispatch(new ThreadsActions.LoadAllThreads());
    this.getAppState.subscribe(state => {
      this.socketConnected = state.socketConnected;
    });
    this.getThreadsState.subscribe(state => {

      this.threads = state.threads;
      if (this.threads.length && !state.currentlySelectedThread) {
        const mostRecentThread: Thread = this.threads[0];
        this.store.dispatch(new ThreadsActions.SetCurrentlySelectedThread(mostRecentThread));
      }
    });
    this.getMessagesState.subscribe(state => {

      this.conversation = state.currentlySelectedConversation;
      this.currentlySelectedConversationPhoneNumber = state.currentlySelectedConversationPhoneNumber;
      this.messages = state.currentlySelectedConversation.messages;
    });
    this.getUserState.subscribe(state => {
      this.userPhoneNumber = state.user.phoneNumber;
    });
  }

  public sendMessage(body: string): void {
    const message: AmadeusMessage = {
      fromPhoneNumber: this.userPhoneNumber,
      textMessageBody: body,
      toPhoneNumber: this.currentlySelectedConversationPhoneNumber
    };

    this.store.dispatch(new AndroidMessagesActions.SendAmadeusMessage(message));
  }

  public setCurrentlySelectedThread(thread: Thread): void {
    this.store.dispatch(new ThreadsActions.SetCurrentlySelectedThread(thread));
  }

  public toggleSidebar(): void {
    this.showSidebarOnMobile = !this.showSidebarOnMobile;
  } 

}
