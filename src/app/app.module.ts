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
import { ConversationHeaderComponent } from './components/conversation-header/conversation-header.component';
import { ResponseAreaComponent } from './components/response-area/response-area.component';
import { TextComponent } from './components/text/text.component';
import { ConversationPreviewTabComponent } from './components/conversation-preview-tab/conversation-preview-tab.component';


import { AuthGuard } from './shared/services/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { ConversationService } from './shared/services/conversation.service';
import { UserService } from './shared/services/user.service';
import { WebsocketService } from './shared/services/websocket.service';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ConversationPreviewService } from './shared/services/conversation-preview.service';
import { ConnectionStatusComponent } from './components/connection-status/connection-status.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user';
import { StoreModule } from '@ngrx/store';
import { AmadeusReducers } from './store/reducers/root';
import { ConversationPreviewEffects } from './store/effects/conversation-preview';
import { ConversationsEffects } from './store/effects/conversation';
import { AppEffects } from './store/effects/app';
import { AndroidMessagesEffects } from './store/effects/androidMessages';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    ConversationPreviewTabComponent,
    ConversationHeaderComponent,
    ResponseAreaComponent,
    ConversationComponent,
    TextComponent,
    LoginScreenComponent,
    HomeComponent,
    EmojiPickerComponent,
    SearchbarComponent,
    ConnectionStatusComponent,
    LoadingSpinnerComponent,
    CreateAccountComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RoutingModule,
    StoreModule.forRoot(AmadeusReducers),
    EffectsModule.forRoot([ConversationPreviewEffects, UserEffects, ConversationsEffects, AppEffects, AndroidMessagesEffects])
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
    ConversationPreviewService,
    UserService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
