import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'amadeus-message-container-header',
  templateUrl: './message-container-header.component.html',
  styleUrls: ['./message-container-header.component.css']
})
export class MessageContainerHeaderComponent implements OnInit {
  @ViewChild('nameInput') public nameInput: ElementRef;
  @Input() public headerInfo: any;

  constructor() {
  }

  public ngOnInit(): void {
  }

}
