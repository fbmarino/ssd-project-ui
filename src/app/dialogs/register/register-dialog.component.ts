import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthManager, User} from "../../services/auth/auth";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  form!: FormGroup;
  errors: string[] = [];
  loading = false;

  constructor(private readonly dialogRef: MatDialogRef<RegisterDialogComponent>,
              private readonly authService: AuthService,
              private readonly auth: AuthManager,
              private readonly snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(''),
      username: new FormControl(''),
      password1: new FormControl(''),
      password2: new FormControl(''),
    });
  }

  login() {
    this.dialogRef.close();
    this.auth.openLoginDialog();
  }

  submit() {
    this.form.markAllAsTouched();
    this.errors = [];
    this.loading = true;
    this.auth.register({
      email: this.form.value.email,
      username: this.form.value.username,
      password1: this.form.value.password1,
      password2: this.form.value.password2,
    }).then((user: User) => {
      this.loading = false;
      this.snackbar.open(`Welcome ${user.username}!`, 'Close', {
        duration: 3000
      });
      this.dialogRef.close();
    }).catch((res) => {
      this.loading = false;
      if (res.error) {
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
