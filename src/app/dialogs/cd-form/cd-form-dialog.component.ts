import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService, MusicsService} from "../../services/api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthManager} from "../../services/auth/auth";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CD} from "../../services/api/model/cd";
import {handleFormHttpError} from "../../shared/errorHandlers";
import {catchError, of} from "rxjs";

@Component({
  selector: 'cd-form-dialog',
  templateUrl: './cd-form-dialog.component.html',
  styleUrls: ['./cd-form-dialog.component.scss']
})
export class CdFormDialogComponent implements OnInit {
  id = 0;
  preloading = false;
  form!: FormGroup;
  errors: string[] = [];
  loading = false;

  constructor(private readonly dialogRef: MatDialogRef<CdFormDialogComponent>,
              private readonly authService: AuthService,
              private readonly musicsService: MusicsService,
              private readonly auth: AuthManager,
              private readonly snackbar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) readonly data: any) {
    if (data && 'id' in data) {
      this.preloading = true;
      this.id = data.id;
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      artist: new FormControl(''),
      genre: new FormControl(''),
      record_company: new FormControl(''),
      ean_code: new FormControl(''),
      price: new FormControl(''),
    });
    if (this.id > 0) {
      this.musicsService.musicsRead(this.id)
        .pipe(
          catchError((response) => {
            this.snackbar.open('CD was not found', 'Close', {
              duration: 2000
            });
            console.error(response);
            setTimeout(() => {
              this.dialogRef.close();
            }, 1000);
            return of();
          })
        )
          .subscribe((cd) => {
          this.preloading = false;
          this.form.controls['name'].patchValue(cd.name);
          this.form.controls['artist'].patchValue(cd.artist);
          this.form.controls['genre'].patchValue(cd.genre);
          this.form.controls['record_company'].patchValue(cd.record_company);
          this.form.controls['ean_code'].patchValue(cd.ean_code);
          this.form.controls['price'].patchValue(cd.price);
        });
    }
  }

  submit() {
    // TODO handle edit mode
    this.form.markAllAsTouched();
    this.errors = [];
    this.loading = true;
    this.musicsService.musicsCreate({
      name: this.form.value.name,
      artist: this.form.value.artist,
      record_company: this.form.value.record_company,
      genre: this.form.value.genre,
      ean_code: this.form.value.ean_code,
      price: this.form.value.price,
      price_currency: 'EUR',
      published_by: 4
    })
      .pipe(
        catchError((response) => {
          this.loading = false;
          handleFormHttpError(response, this.form, this.errors);
          return of();
        })
      )
      .subscribe((response: CD) => {
        this.loading = false;
        this.snackbar.open(`CD added to the library successfully`, 'Close', {
          duration: 3000
        });
        // TODO add or update cd into the list (use close data)
        this.dialogRef.close();
    });
  }
}
