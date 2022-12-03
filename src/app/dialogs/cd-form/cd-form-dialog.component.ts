import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService, PasswordResetConfirm} from "../../services/api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthManager, User} from "../../services/auth/auth";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'cd-form-dialog',
  templateUrl: './cd-form-dialog.component.html',
  styleUrls: ['./cd-form-dialog.component.scss']
})
export class CdFormDialogComponent implements OnInit {
  form!: FormGroup;
  errors: string[] = [];
  loading = false;

  constructor(private readonly dialogRef: MatDialogRef<CdFormDialogComponent>,
              private readonly authService: AuthService,
              private readonly auth: AuthManager,
              private readonly snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      new_password1: new FormControl(''),
      new_password2: new FormControl(''),
    });
  }

  submit() {
    this.form.markAllAsTouched();
    this.errors = [];
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
      if (res.error && !(res.error instanceof ProgressEvent)) {
        for (let k in res.error) {
          if (k in this.form.controls) {
            this.form.controls[k].setErrors({
              serverError: res.error[k][0]
            });
          } else {
            this.errors.push(res.error[k][0]);
          }
        }
      } else {
        console.error(res);
      }
    });
  }
}
