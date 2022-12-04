import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CdFormDialogComponent, CdFormDialogResult} from "../../dialogs/cd-form/cd-form-dialog.component";
import {MusicsService} from "../../services/api";
import {ConfirmDialogComponent, ConfirmDialogData} from "../../shared/confirm-dialog/confirm-dialog.component";
import {catchError, filter, of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CD} from "../../services/api/model/cd";

export interface CDListItem {
  id: number;
  name: string;
  artist: string;
  record_company: string;
  genre: string;
  ean_code: string;
  price: string;
  price_currency?: string;
  published_by: number;
  user?: string;
  created_at?: string;
  updated_at?: string;
}


@Component({
  selector: 'cds-list',
  templateUrl: './cds-list.component.html',
  styleUrls: ['./cds-list.component.scss']
})
export class CdsListComponent implements OnInit {
  items: CDListItem[] = [];

  constructor(private readonly dialog: MatDialog,
              private readonly musicsService: MusicsService,
              private readonly snackbar: MatSnackBar) {
  }

  openCreateCdDialog() {
    this.dialog.open(CdFormDialogComponent, {
      width: '600px'
    }).afterClosed().pipe(filter((dialogResult) => dialogResult && dialogResult.cd))
      .subscribe((dialogResult: CdFormDialogResult) => {
        this.items.unshift(CdsListComponent.cdToCdListItem(dialogResult.cd));
      });
  }

  openEditCdDialog(cd: CDListItem) {
    this.dialog.open(CdFormDialogComponent, {
      width: '600px',
      data: {
        id: cd.id
      }
    }).afterClosed().pipe(filter((dialogResult) => dialogResult && dialogResult.cd))
      .subscribe((dialogResult: CdFormDialogResult) => {
        this.items = this.items.map(cdi => cdi.id === cd.id
          ? CdsListComponent.cdToCdListItem(dialogResult.cd) : cdi);
      });
  }

  deleteCd(cd: CDListItem) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: <ConfirmDialogData>{
        title: "Delete CD",
        message: `Are you sure you want to delete \"${cd.name}\" by \"${cd.artist}\"?`
      }
    }).afterClosed().pipe(filter((res) => res && res.confirmed)).subscribe(() => {
      this.musicsService.musicsDelete(cd.id)
        .pipe(
          catchError((response) => {
            if (response.error && !(response.error instanceof ProgressEvent)) {
              for (let k in response.error) {
                if (typeof response.error[k] === 'string') {
                  this.snackbar.open(response.error[k], 'Close', {
                    duration: 2000
                  });
                } else {
                  this.snackbar.open(response.error[k][0], 'Close', {
                    duration: 2000
                  });
                }
              }
            } else {
              console.error(response);
            }
            return of();
          })
        )
        .subscribe(() => {
          setTimeout(() => {
            this.items = this.items.filter(i => i !== cd);
          }, 250);
          this.snackbar.open("CD removed from the library successfully", 'Close', {
            duration: 2000
          });
        });
    });
  }

  ngOnInit(): void {
    this.musicsService.musicsList().subscribe(e => {
      this.items = e.reverse().map(cdi => CdsListComponent.cdToCdListItem(cdi));
    })
  }

  private static cdToCdListItem(e: CD) {
    return <CDListItem>{
      id: e.id,
      name: e.name,
      artist: e.artist,
      record_company: e.record_company,
      genre: e.genre,
      ean_code: e.ean_code,
      price: e.price,
      price_currency: e.price_currency,
      published_by: e.published_by,
      user: e.user,
      created_at: e.created_at ? new Date(e.created_at).toLocaleString() : '?',
      updated_at: e.updated_at ? new Date(e.updated_at).toLocaleString() : '?'
    };
  }
}
