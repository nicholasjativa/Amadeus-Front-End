import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from '../../shared/services/websocket.service';

@Component({
  selector: 'amadeus-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.css']
})
export class ConnectionStatusComponent implements OnInit {
  @Input() public connected: boolean;

  constructor() {
  }

  public ngOnInit(): void {
  }

}
