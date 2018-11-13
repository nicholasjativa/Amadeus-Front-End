import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../shared/services/websocket.service';

@Component({
  selector: 'amadeus-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.css']
})
export class ConnectionStatusComponent implements OnInit {
  public disconnected: boolean = false;
  public hide: boolean = true;

  constructor(private ws: WebsocketService) {
    this.ws.onSocketDisconnect()
      .subscribe(disconnected => this.disconnected = disconnected);
    this.ws.onSocketConnect()
      .subscribe(connected => this.disconnected = !connected);
   }

  ngOnInit() {
  }

  handleCloseClick(): void {
    this.disconnected = false;
  }

}
