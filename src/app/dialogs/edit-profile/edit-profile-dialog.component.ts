import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService, UserDetails} from "../../services/api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthManager} from "../../services/auth/auth";
import {MatDialogRef} from "@angular/material/dialog";
import {FormErrorsHandler} from "../../shared/form";

@Component({
  selector: 'login-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {
  form!: FormGroup;
  formErrors!: FormErrorsHandler;
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
    this.formErrors = new FormErrorsHandler(this.form);
  }

  submit() {
    this.form.markAllAsTouched();
    this.formErrors.resetNonFieldErrors();
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
      this.formErrors.onHttpError(res);
    });
  }
}
