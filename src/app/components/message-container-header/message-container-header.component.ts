import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConversationService } from '../../shared/services/conversation.service';
import { SidebarService } from '../../shared/services/sidebar.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'amadeus-message-container-header',
  templateUrl: './message-container-header.component.html',
  styleUrls: ['./message-container-header.component.css']
})
export class MessageContainerHeaderComponent implements OnInit {
  @ViewChild('nameInput') public nameInput: ElementRef;
  public conversationInfo: any;
  public nameForm: FormGroup;

  constructor(private fb: FormBuilder, private sidebarService: SidebarService) {
    this.createForm();
  }

  ngOnInit() {
    this.sidebarService.selectedConversationObservable.
      subscribe(conversationInfo => {
        this.conversationInfo = conversationInfo;
        if (!this.conversationInfo.id && !this.conversationInfo.address) {
          this.setupNewConversationView();
        } else {
          this.setupExistingConversationView();
        }
      });
  }

  createForm(): void {
    this.nameForm = this.fb.group({
      // TODO this will eventually change to support phone number/name
      address: new FormControl({ value: '', disabled: false })
    });
  }

  setupExistingConversationView(): void {
    const title = this.conversationInfo.name ? this.conversationInfo.name : this.conversationInfo.address;
    this.nameForm.setValue({ address: title });
    this.nameForm.controls.address.disable();
  }

  setupNewConversationView(): void {
    this.nameForm.setValue({ address: '' })
    this.nameForm.controls.address.enable();
    setTimeout(() => this.nameInput.nativeElement.focus(), 0);
  }

  setNewConversationInfo(): void {
    this.nameForm.controls.address.disable();
    const address = this.nameForm.value.address;
    const conversationInfo = {
      address: address,
      toPhoneNumber: address
    };

    for (let i = 0; i < this.sidebarService.conversations.length; i++) {
      if (this.sidebarService.conversations[i] == this.conversationInfo) {
        this.sidebarService.conversations[i] = conversationInfo;
      }
    }
    this.sidebarService.selectedConversationObserver.next(conversationInfo);
  }



}
