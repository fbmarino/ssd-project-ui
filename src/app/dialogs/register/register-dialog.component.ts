import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, Registration} from "../../services/api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthManager, User} from "../../services/auth/auth";
import {MatDialogRef} from "@angular/material/dialog";
import {FormErrorsHandler} from "../../shared/form/form-error-handler";

@Component({
  selector: 'register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  form!: FormGroup;
  formErrors!: FormErrorsHandler;
  loading = false;

  constructor(private readonly dialogRef: MatDialogRef<RegisterDialogComponent>,
              private readonly authService: AuthService,
              private readonly auth: AuthManager,
              private readonly snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
      group: new FormControl(true)
    });
    this.formErrors = new FormErrorsHandler(this.form);
  }

  login() {
    this.dialogRef.close();
    this.auth.openLoginDialog();
  }

  submit() {
    this.form.markAllAsTouched();
    this.formErrors.resetNonFieldErrors();
    this.loading = true;
    let data: Registration = {
      email: this.form.value.email,
      username: this.form.value.username,
      password1: this.form.value.password1,
      password2: this.form.value.password2,
    };
    if (this.form.value.group) {
      data.group = 'publishers';
    }
    this.auth.register(data).then((user: User) => {
      this.loading = false;
      this.snackbar.open(`Welcome ${user.username}!`, 'Close', {
        duration: 3000
      });
      this.dialogRef.close();
    }).catch((res) => {
      this.loading = false;
      this.formErrors.onHttpError(res);
    });
  }
}
