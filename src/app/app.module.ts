import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AppToolbarComponent} from './toolbar/app-toolbar.component';
import {HomeComponent} from './pages/home/home.component';
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BASE_PATH as API_BASE_PATH} from './services/api/variables';
import {LoginDialogComponent} from './dialogs/login/login-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ApiModule} from "./services/api";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthHttpInterceptor} from "./services/auth/auth";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {AvatarComponent} from './shared/avatar/avatar.component';
import {MatMenuModule} from "@angular/material/menu";
import {RegisterDialogComponent} from "./dialogs/register/register-dialog.component";
import {ChangePasswordDialogComponent} from "./dialogs/change-password/change-password-dialog.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {EditProfileDialogComponent} from "./dialogs/edit-profile/edit-profile-dialog.component";
import {CdFormDialogComponent} from "./dialogs/cd-form/cd-form-dialog.component";
import { CdsListComponent } from './pages/cds-list/cds-list.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CdLogoComponent} from "./shared/cd-logo/cd-logo.component";
import {ConfirmDialogComponent} from "./shared/confirm-dialog/confirm-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    AppToolbarComponent,
    HomeComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    ChangePasswordDialogComponent,
    CdFormDialogComponent,
    EditProfileDialogComponent,
    AvatarComponent,
    CdLogoComponent,
    CdsListComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
    ApiModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    {
      provide: API_BASE_PATH,
      useValue: 'http://' + window.location.hostname + ':8000/api/v1'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
