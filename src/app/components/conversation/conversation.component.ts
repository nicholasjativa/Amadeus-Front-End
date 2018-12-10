import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewChecked } from '@angular/core';
import { MessagesService } from '../../shared/services/messages.service';
import { WebsocketService } from '../../shared/services/websocket.service';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';
import { ThreadsService } from '../../shared/services/threads.service';
import { Message } from '../../models/message';
@Component({
  selector: 'amadeus-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, AfterViewChecked {
  currentConversation;
  ioConnection;
  @Input() public messages: Message[];
  @Input() public userPhoneNumber: string;
  @ViewChild('container') public conversationEl: ElementRef; 

  constructor(private cs: MessagesService, private threadsService: ThreadsService, private user: UserService, private renderer: Renderer2) {
    this.threadsService.selectedConversationObservable
      .subscribe(conversation => {
        const phone_num_clean: string = conversation.address; // TODO use phone_num_clean in obj
        this.currentConversation = conversation;
        
      });
  
    this.cs.listenForOwnMessageSentOnAndroid()
      .subscribe(text => {
        if (text.toPhoneNumber === this.currentConversation.address) {
          this.messages.push(text);
        }
      });
    this.cs.listenForOutgoingMessageAcknowledgement()
      .subscribe(text => {
        this.messages.push(text);
      });
    this.cs.listenForSendToAndroidSuccessful()
      .subscribe(text => {
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].amadeusId == text.amadeusId) {
            this.messages[i].status = "gcm_success";
          }
        }
      });
    this.cs.textsMessagesObservable.subscribe(text => {
      let mytext = text;
      mytext.phoneNumber = 'USER_PHONE_NUMBER';
      this.messages.push(mytext);
    });
  }

  public ngOnInit(): void {
  }

  public ngAfterViewChecked(): void {
    this.renderer.setProperty(this.conversationEl.nativeElement, 'scrollTop', this.conversationEl.nativeElement.scrollHeight);
  }

  checkIfShouldShowDelivered(message): boolean {
    return parseInt(message.timestamp) + 10000 > Date.now() && message.fromPhoneNumber === 'USER_PHONE_NUMBER';
  }

  checkIfShouldDisplayTime(previous, next): boolean {
    if (previous === undefined) {
      return true;
    }

    const previousTime = parseInt(previous.timestamp);
    const nextTime = parseInt(next.timestamp);

    if (Math.abs(previousTime - nextTime) >= 5 * 60 * 1000) {
      return true;
    } else {
      return false;
    }

  }

}
