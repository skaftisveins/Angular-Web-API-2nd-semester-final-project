import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptorProvider } from './utils/http-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './content/admin/admin.component';
import { LoginComponent } from './content/login/login.component';
import { RegisterComponent } from './content/register/register.component';
import { MainComponent } from './content/main/main.component';
import { HerocardComponent } from './content/herocard/herocard.component';
import { HeaderComponent } from './layout/header/header.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { UserComponent } from './content/user/user.component';
import { LogPipe } from './pipes/log.pipe';
import { SafeResourceUrlPipe } from './pipes/safe-resource-url.pipe';
import { CommentComponent } from './content/comment/comment.component';
import { MatchComponent } from './content/match/match.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FilterMessagePipe } from './pipes/filter-message.pipe';
import { FlagPipe } from './pipes/flag.pipe';
import { FilterUserPipe } from './pipes/filter-user.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    HerocardComponent,
    HeaderComponent,
    SafeUrlPipe,
    UserComponent,
    LogPipe,
    SafeResourceUrlPipe,
    CommentComponent,
    MatchComponent,
    FooterComponent,
    FilterMessagePipe,
    FlagPipe,
    FilterUserPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  providers: [HttpErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
