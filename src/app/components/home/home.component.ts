import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../shared/services/threads.service';
import { Store, select } from '@ngrx/store';
import { AmadeusState, selectThreadsState, selectMessagesState } from '../../store/reducers/root';
import * as ThreadsActions from '../../store/actions/threads';
import * as MessagesActions from '../../store/actions/messages';
import { Observable } from 'rxjs';
import { Thread } from '../../models/thread';
import { ThreadsState } from '../../store/reducers/threads';
import { MessagesState } from '../../store/reducers/messages';
import { Message } from '../../models/message';

@Component({
  selector: 'amadeus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private getThreadsState: Observable<ThreadsState>;
  private getMessagesState: Observable<MessagesState>;
  public threads: Thread[];
  public messages: Message[]; 

  constructor(public threadsService: ThreadsService, private store: Store<AmadeusState>) {
    this.getThreadsState = this.store.pipe(select(selectThreadsState));
    this.getMessagesState = this.store.pipe(select(selectMessagesState));
  }

  public ngOnInit(): void {
    this.store.dispatch(new ThreadsActions.LoadAllThreads());
    this.getThreadsState.subscribe(state => {

      this.threads = state.threads;
    });
    this.getMessagesState.subscribe(state => {

      this.messages = state.currentlySelectedConversation;
    });
  }

  public loadMessages(thread: string): void {
    this.store.dispatch(new MessagesActions.LoadMessagesByThread(thread));
  }

}
