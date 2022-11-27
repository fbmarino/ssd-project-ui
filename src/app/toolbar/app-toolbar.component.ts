import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthManager} from "../services/auth/auth";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent {
  constructor(private readonly router: Router,
              public readonly auth: AuthManager,
              private readonly snackbar: MatSnackBar) {
  }

  home() {
    this.router.navigate(['']);
  }

  register() {
    this.auth.openRegisterDialog();
  }

  login() {
    this.auth.openLoginDialog();
  }

  changePassword() {
    this.auth.openChangePasswordDialog();
  }

  editProfile() {
    this.auth.openEditProfileDialog();
  }

  logout() {
    this.auth.logout().then(() => {
      this.snackbar.open("Logged out", 'Close', {
        duration: 2000
      });
    }).catch(() => {
      (<any>location).reload();
    });
  }
}
