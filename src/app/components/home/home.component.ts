import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../shared/services/threads.service';
import { Store } from '@ngrx/store';
import { AmadeusState, selectThreadsState } from '../../store/reducers/root';
import * as ThreadsActions from '../../store/actions/threads';
import { Observable } from 'rxjs';
import { Thread } from '../../models/thread';
import { ThreadsState } from '../../store/reducers/threads';

@Component({
  selector: 'amadeus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private getState: Observable<ThreadsState>;
  public threads: Thread[];

  constructor(public threadsService: ThreadsService, private store: Store<AmadeusState>) {
    this.getState = this.store.select(selectThreadsState);
  }

  ngOnInit() {
    this.store.dispatch(new ThreadsActions.LoadAllThreads());
    this.getState.subscribe(state => {
      
      this.threads = state.threads;console.log(this.threads)
    });
  }

}
