import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { WebsocketService } from './websocket.service';

@Injectable()
export class ThreadsService {
  public conversations: any[];
  public show: boolean = false;
  private selectedConversation: any;
  public selectedConversationObservable: Observable<any>;
  public selectedConversationObserver: Observer<any>;

  constructor(
    private conversationService: MessagesService,
    private http: HttpClient,
    private socketService: WebsocketService) {

    this.selectedConversationObservable = new Observable(observer => {
      this.selectedConversationObserver = observer;
    }).share();
  }

  public createConversation(): void {
    const newConversation: any = { name: 'New Message', number: '' };
    this.conversations.push(newConversation);
    this.setSelectedConversation(newConversation);
  }

  public getThreads(): Observable<any> {
    return this.http.get(`${environment.API_URL}/snippets`);
  }

  private setTimeStrings(conversations: any[]): any[] {
    let now: Date = new Date();
    let temp: Date = new Date();
    let temp1: Date = new Date();
    let oneWeekAgo: Date = new Date(temp1.setDate(temp1.getDate() - 7));
    let yesterday: Date = new Date(temp.setDate(temp.getDate() - 1));
    conversations.forEach(obj => {
      // TODO timestamp should be a number?
      obj.timestamp = parseInt(obj.timestamp);
      let dateObj = new Date(obj.timestamp);
      if (now.toDateString() == dateObj.toDateString()) {
        obj.timestamp = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (yesterday.toDateString() == dateObj.toDateString()) {
        obj.timestamp = 'Yesterday';
      } else if (oneWeekAgo.getTime() > dateObj.getTime()) {
        obj.timestamp = dateObj.toLocaleDateString([], { month: "2-digit", day: "2-digit", year: "2-digit" });
      } else {
        obj.timestamp = dateObj.toLocaleDateString([], { weekday: "long" });
      }
    });
    return conversations;
  }

  public setSelectedConversation(conversation: any): void {
    if (this.show) {
      this.show = false;
    }
    if (this.selectedConversation != conversation) {
      this.selectedConversation = conversation;
      this.selectedConversationObserver.next(conversation);
    }
  }

  public showSidebar(): void {
    this.show = true;
  }

}
