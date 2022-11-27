import {Component} from '@angular/core';
import {AuthManager} from "./services/auth/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Music Library';
  loading = true;

  constructor(private auth: AuthManager) {
  }

  ngOnInit() {
    this.auth.userChangeObservable.subscribe(user => {
      this.loading = false;
    });
    this.auth.checkCurrentUser();
  }
}
