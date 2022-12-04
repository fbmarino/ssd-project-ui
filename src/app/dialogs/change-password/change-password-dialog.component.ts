import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService, PasswordResetConfirm} from "../../services/api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthManager} from "../../services/auth/auth";
import {MatDialogRef} from "@angular/material/dialog";
import {FormErrorsHandler} from "../../shared/form/form-error-handler";

@Component({
  selector: 'login-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  form!: FormGroup;
  formErrors!: FormErrorsHandler;
  loading = false;

  constructor(private readonly dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              private readonly authService: AuthService,
              private readonly auth: AuthManager,
              private readonly snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      new_password1: new FormControl(''),
      new_password2: new FormControl(''),
    });
    this.formErrors = new FormErrorsHandler(this.form);
  }

  submit() {
    this.form.markAllAsTouched();
    this.formErrors.resetNonFieldErrors();
    this.loading = true;
    this.auth.changePassword({
      new_password1: this.form.value.new_password1,
      new_password2: this.form.value.new_password2,
    }).then((newPasswordConfirm: PasswordResetConfirm) => {
      this.loading = false;
      this.snackbar.open(`Password changed successfully!`, 'Close', {
        duration: 3000
      });
      this.dialogRef.close();
    }).catch((res) => {
      this.loading = false;
      this.formErrors.onHttpError(res);
    });
  }
}
