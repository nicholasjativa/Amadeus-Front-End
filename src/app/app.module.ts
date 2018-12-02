import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { RoutingModule } from './app.routing.module';

import { HttpTokenInterceptor } from './shared/interceptors/http.token.interceptor';

import { AppComponent } from './app.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { EmojiPickerComponent } from './components/emoji-picker/emoji-picker.component';
import { HomeComponent } from './components/home/home.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { MessageContainerComponent } from './components/message-container/message-container.component';
import { MessageContainerHeaderComponent } from './components/message-container-header/message-container-header.component';
import { ResponseAreaComponent } from './components/response-area/response-area.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TextComponent } from './components/text/text.component';
import { ThreadTabComponent } from './components/thread-tab/thread-tab.component';


import { AuthGuard } from './shared/services/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { ConversationService } from './shared/services/conversation.service';
import { EmojiSelectorService } from './shared/services/emoji-selector.service';
import { UserService } from './shared/services/user.service';
import { WebsocketService } from './shared/services/websocket.service';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SidebarService } from './shared/services/sidebar.service';
import { ConnectionStatusComponent } from './components/connection-status/connection-status.component';
import { SettingsButtonComponent } from './components/settings-button/settings-button.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user';
import { StoreModule } from '@ngrx/store';
import { AmadeusReducers } from './store/reducers/root';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ThreadTabComponent,
    MessageContainerComponent,
    MessageContainerHeaderComponent,
    ResponseAreaComponent,
    ConversationComponent,
    TextComponent,
    LoginScreenComponent,
    HomeComponent,
    EmojiPickerComponent,
    SearchbarComponent,
    ConnectionStatusComponent,
    SettingsButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RoutingModule,
    StoreModule.forRoot(AmadeusReducers),
    EffectsModule.forRoot([UserEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    AuthGuard,
    AuthService,
    ConversationService,
    EmojiSelectorService,
    UserService,
    WebsocketService,
    SidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
