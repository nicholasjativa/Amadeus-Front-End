import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewChecked } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
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

  constructor(private user: UserService, private renderer: Renderer2) {
  
    // this.cs.listenForOwnMessageSentOnAndroid()
    //   .subscribe(text => {
    //     if (text.toPhoneNumber === this.currentConversation.address) {
    //       this.messages.push(text);
    //     }
    //   });
    // this.cs.listenForSendToAndroidSuccessful()
    //   .subscribe(text => {
    //     for (let i = 0; i < this.messages.length; i++) {
    //       if (this.messages[i].amadeusId == text.amadeusId) {
    //         this.messages[i].status = "gcm_success";
    //       }
    //     }
    //   });
  }

  public ngOnInit(): void {
  }

  public ngAfterViewChecked(): void {
    this.renderer.setProperty(this.conversationEl.nativeElement, 'scrollTop', this.conversationEl.nativeElement.scrollHeight);
  }

  public checkIfShouldShowDelivered(message): boolean {
    return parseInt(message.timestamp) + 10000 > Date.now() && message.fromPhoneNumber === 'USER_PHONE_NUMBER';
  }

  public checkIfShouldDisplayTime(previous, next): boolean {
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
