import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface ConfirmDialogData {
    title: string;
    message: string;
}

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    @Input() public title: string;
    @Input() public message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) readonly data: ConfirmDialogData) {
        this.title = data.title;
        this.message = data.message;
    }

    ngOnInit(): void {
    }

    confirm() {
        this.dialogRef.close({
            confirmed: true
        });
    }

    cancel() {
        this.dialogRef.close({
          confirmed: false
        });
    }
}
