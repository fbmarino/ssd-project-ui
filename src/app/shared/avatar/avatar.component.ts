import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() name: string = '';
  @Input() size: string = '';

  label: string = '';
  sizeClass: string = '';
  colorClass: string = '';

  ngOnInit() {
    if (this.name.length >= 2)  {
      this.label = this.name[0].toUpperCase() + this.name[1].toUpperCase();
    } else if (this.name.length >= 1)  {
      this.label = this.name[0].toUpperCase();
    } else {
      this.label = 'A';
    }
    this.colorClass = 'c-4';
    this.sizeClass = 'size-' + this.size;
  }
}
