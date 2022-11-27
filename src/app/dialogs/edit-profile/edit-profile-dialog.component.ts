import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService, PasswordResetConfirm, UserDetails} from "../../services/api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthManager, User} from "../../services/auth/auth";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'login-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {
  form!: FormGroup;
  errors: string[] = [];
  loading = false;

  constructor(private readonly dialogRef: MatDialogRef<EditProfileDialogComponent>,
              private readonly authService: AuthService,
              private readonly auth: AuthManager,
              private readonly snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    let user = this.auth.currentUser;
    if (!user) {
      return;
    }
    this.form = new FormGroup({
      first_name: new FormControl(user.firstName),
      last_name: new FormControl(user.lastName),
      username: new FormControl({ value: user.username, disabled: true }),
    });
  }

  submit() {
    this.form.markAllAsTouched();
    this.errors = [];
    this.loading = true;
    this.auth.editProfile({
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      //username: this.form.value.username,
    }).then((detaisl: UserDetails) => {
      this.loading = false;
      this.snackbar.open(`Profile saved successfully!`, 'Close', {
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
