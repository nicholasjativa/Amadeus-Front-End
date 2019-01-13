import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AmadeusState } from '../../store/reducers/root';
import * as ConversationActions from '../../store/actions/conversation';
import * as ConversationPreviewActions from '../../store/actions/conversation-preview';
import * as AppActions from '../../store/actions/app';
import * as AndroidMessagesActions from '../../store/actions/androidMessages';
import { Observable } from 'rxjs';
import { ConversationPreview } from '../../models/conversation-preview';
import { ConversationPreviewState, selectConversationPreviewState, selectIncomingConversationPreview } from '../../store/reducers/conversation-preview';
import { ConversationsState, selectConversationsState } from '../../store/reducers/conversation';
import { Conversation } from '../../models/conversation';
import { UserState, selectUserState } from '../../store/reducers/user';
import { AppState, selectAppState } from '../../store/reducers/app';
import { AmadeusMessage } from '../../models/amadeusMessage';

@Component({
  selector: 'amadeus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public conversation: Conversation;
  public currentlySelectedConversationPhoneNumber: string = "";
  public isEditing: boolean;
  public loadingConversation: boolean;
  public messages: any[];
  public socketConnected: boolean;
  public conversationPreviews: ConversationPreview[];
  public userPhoneNumber: string;
  public showSidebarOnMobile: boolean = true;
  
  private getAppState: Observable<AppState>;
  private getConversationPreviewState: Observable<ConversationPreviewState>;
  private getConversationsState: Observable<ConversationsState>;
  private getIncomingConversationPreviewState: Observable<ConversationPreviewState['incomingConversationPreview']>
  private getUserState: Observable<UserState>;
  private messageReceivedNotification: HTMLAudioElement = new Audio('assets/audio/quite-impressed.mp3');

  constructor(private store: Store<AmadeusState>) {
    this.getAppState = this.store.pipe(select(selectAppState));
    this.getConversationPreviewState = this.store.pipe(select(selectConversationPreviewState));
    this.getConversationsState = this.store.pipe(select(selectConversationsState));
    this.getIncomingConversationPreviewState = this.store.pipe(select(selectIncomingConversationPreview));
    this.getUserState = this.store.pipe(select(selectUserState));
    this.store.dispatch(new AppActions.OpenWebSocketConnection());
  }

  public ngOnInit(): void {
    this.store.dispatch(new ConversationPreviewActions.LoadAllConversationPreviews());
    this.getAppState.subscribe(state => {
      this.socketConnected = state.socketConnected;
    });
    this.getConversationPreviewState.subscribe(state => {

      this.conversationPreviews = state.conversationPreviews;
      if (this.conversationPreviews.length && !state.currentlySelectedConversationPreview) {
        const mostRecentConversationPreview: ConversationPreview = this.conversationPreviews[0];
        this.store.dispatch(new ConversationPreviewActions.SetCurrentlySelectedConversationPreview(mostRecentConversationPreview));
      }
    });
    this.getConversationsState.subscribe(state => {

      this.isEditing = state.isEditingHeader;
      this.loadingConversation = state.loading;
      this.conversation = Object.assign({}, state.currentlySelectedConversation);
      this.currentlySelectedConversationPhoneNumber = state.currentlySelectedConversationPhoneNumber;
      this.messages = state.currentlySelectedConversation.messages;
    });
    this.getIncomingConversationPreviewState.subscribe(preview => {

      if (preview && preview.address !== this.currentlySelectedConversationPhoneNumber) {console.log(preview, this.currentlySelectedConversationPhoneNumber)
        this.messageReceivedNotification.play();
      }
    });
    this.getUserState.subscribe(state => {
      this.userPhoneNumber = state.user.phoneNumber;
    });
  }

  public collectHeaderInfo(): void {
    // when this fires, this.conversation.name will have
    // the name that the user entered in the header component
    // so set the address to that as well
    // TODO refactor header component to populate contact list
    if (this.conversation.name && this.isEditing) {
      // they have provided a phone number (eventually TODO to work with name)
      // so the blank conversation will be updated to that address
      this.conversation.address = this.conversation.name;
      
      const payload = {
        name: this.conversation.name,
        address: this.conversation.address
      };

      this.store.dispatch(new ConversationPreviewActions.UpdateBlankConversationPreview(payload));
    }
  
  }

  public createNewConversation(): void {

    if (!this.isEditing) {
      this.store.dispatch(new ConversationActions.CreateNewConversation());
    }

  }

  public sendMessage(body: string): void {
    const message: AmadeusMessage = {
      fromPhoneNumber: this.userPhoneNumber,
      textMessageBody: body,
      toPhoneNumber: this.currentlySelectedConversationPhoneNumber
    };

    this.store.dispatch(new AndroidMessagesActions.SendAmadeusMessage(message));
  }

  public setCurrentlySelectedConversationPreview(preview: ConversationPreview): void {
    this.store.dispatch(new ConversationPreviewActions.SetCurrentlySelectedConversationPreview(preview));
  }

  public toggleSidebar(): void {
    this.showSidebarOnMobile = !this.showSidebarOnMobile;
  } 

}
