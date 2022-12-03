import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthManager, User} from "../../services/auth/auth";
import {MatDialogRef} from "@angular/material/dialog";
import {handleFormHttpError} from "../../shared/errorHandlers";

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  form!: FormGroup;
  errors: string[] = [];
  loading = false;

  constructor(private readonly dialogRef: MatDialogRef<LoginDialogComponent>,
              private readonly authService: AuthService,
              private readonly auth: AuthManager,
              private readonly snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  register() {
    this.dialogRef.close();
    this.auth.openRegisterDialog();
  }

  submit() {
    this.form.markAllAsTouched();
    this.errors = [];
    this.loading = true;
    this.auth.login({
      email: '',
      username: this.form.value.username,
      password: this.form.value.password
    }).then((user: User) => {
      this.loading = false;
      this.snackbar.open(`Welcome back, ${user.username}!`, 'Close', {
        duration: 3000
      });
      this.dialogRef.close();
    }).catch((res) => {
      this.loading = false;
      handleFormHttpError(res, this.form, this.errors);
    });
  }
}
