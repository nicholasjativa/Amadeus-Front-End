import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../shared/services/threads.service';
import { Store, select } from '@ngrx/store';
import { AmadeusState, selectThreadsState, selectMessagesState, selectUserState } from '../../store/reducers/root';
import * as ThreadsActions from '../../store/actions/threads';
import * as MessagesActions from '../../store/actions/messages';
import * as AppActions from '../../store/actions/app';
import { Observable } from 'rxjs';
import { Thread } from '../../models/thread';
import { ThreadsState } from '../../store/reducers/threads';
import { MessagesState } from '../../store/reducers/messages';
import { Message } from '../../models/message';
import { Conversation } from '../../models/conversation';
import { UserState } from '../../store/reducers/user';

@Component({
  selector: 'amadeus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public conversation: Conversation;
  public currentlySelectedConversationPhoneNumber: string = "";
  public messages: Message[];
  public threads: Thread[];
  public userPhoneNumber: string;
  private getThreadsState: Observable<ThreadsState>;
  private getMessagesState: Observable<MessagesState>;
  private getUserState: Observable<UserState>;
  private messageReceivedNotification: HTMLAudioElement = new Audio('assets/audio/quite-impressed.mp3');

  constructor(public threadsService: ThreadsService, private store: Store<AmadeusState>) {
    this.getThreadsState = this.store.pipe(select(selectThreadsState));
    this.getMessagesState = this.store.pipe(select(selectMessagesState));
    this.getUserState = this.store.pipe(select(selectUserState));
    this.store.dispatch(new AppActions.OpenWebSocketConnection());
  }

  public ngOnInit(): void {
    this.store.dispatch(new ThreadsActions.LoadAllThreads());
    this.getThreadsState.subscribe(state => {

      this.threads = state.threads;
      if (this.threads.length) {
        const mostRecentThread: Thread = this.threads[0];
        this.store.dispatch(new MessagesActions.LoadMessagesByThread(mostRecentThread));
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

  public loadMessages(thread: Thread): void {
    this.store.dispatch(new MessagesActions.LoadMessagesByThread(thread));
  }

}
