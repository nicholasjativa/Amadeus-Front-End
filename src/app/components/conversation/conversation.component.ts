import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../shared/services/conversation.service';
import { WebsocketService } from '../../shared/services/websocket.service';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';
import { SidebarService } from '../../shared/services/sidebar.service';
@Component({
  selector: 'amadeus-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  currentConversation;
  ioConnection;
  notificationSound;
  texts: any[];

  constructor(private cs: ConversationService, private sidebarService: SidebarService, private user: UserService) {
    this.notificationSound = new Audio('assets/audio/quite-impressed.mp3');
    this.sidebarService.selectedConversationObservable
      .subscribe(conversation => {
        const phone_num_clean: number = conversation.address; // TODO use phone_num_clean in obj
        this.currentConversation = conversation;
        
        this.cs.getConversationMessages(phone_num_clean)
          .subscribe((texts: any[]) => {
            this.texts = texts;
          });
      });
    this.cs.listenForMessageFromAndroid()
      .subscribe(text => {
        if (this.currentConversation.address == text.fromPhoneNumber) {
          this.notificationSound.play();
          this.texts.push(text);
        }
      });
    this.cs.listenForOwnMessageSentOnAndroid()
      .subscribe(text => {
        if (text.toPhoneNumber === this.currentConversation.address) {
          this.texts.push(text);
        }
      });
    this.cs.listenForOutgoingMessageAcknowledgement()
      .subscribe(text => {
        this.texts.push(text);
      });
    this.cs.listenForSendToAndroidSuccessful()
      .subscribe(text => {
        for (let i = 0; i < this.texts.length; i++) {
          if (this.texts[i].amadeusId == text.amadeusId) {
            this.texts[i].status = "gcm_success";
          }
        }
      });
    this.cs.textsMessagesObservable.subscribe(text => {
      let mytext = text;
      mytext.phoneNumber = 'USER_PHONE_NUMBER';
      this.texts.push(mytext);
    });
  }

  ngOnInit() {

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
