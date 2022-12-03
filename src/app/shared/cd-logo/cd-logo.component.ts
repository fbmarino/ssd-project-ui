import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cd-logo',
  templateUrl: './cd-logo.html',
  styleUrls: ['./cd-logo.component.scss']
})
export class CdLogoComponent implements OnInit {
  @Input() name: string = '';

  label: string = '';
  colorClass: string = '';

  private colorMaxNum = 6;

  ngOnInit() {
    this.updateLabelAndColor();
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
