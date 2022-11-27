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

  private colorMaxNum = 6;

  ngOnInit() {
    this.updateLabelAndColor();
    this.sizeClass = 'size-' + this.size;
  }

  ngOnChanges() {
    this.updateLabelAndColor();
  }

  updateLabelAndColor() {
    const words = this.name.split(' ');
    if (words.length >= 2)  {
      this.label = words[0][0].toUpperCase() + words[1][0].toUpperCase();
    } else if (this.name.length >= 2)  {
      this.label = this.name[0].toUpperCase() + this.name[1].toUpperCase();
    } else if (this.name.length >= 1)  {
      this.label = this.name[0].toUpperCase();
    } else {
      this.label = 'A';
    }

    let colorNum = 0;
    for (let i = 0; i < this.label.length; i++) {
      colorNum = this.label.charCodeAt(i) + ((colorNum << 5) - colorNum);
    }
    colorNum = colorNum % this.colorMaxNum + 1;
    this.colorClass = 'c-' + colorNum;
  }
}
