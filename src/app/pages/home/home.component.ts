import {Component, OnInit} from '@angular/core';
import {AuthManager, User} from "../../services/auth/auth";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User|null = null;

  constructor(private readonly auth: AuthManager) {
  }

  login() {
    this.auth.openLoginDialog();
  }

  ngOnInit() {
    this.auth.userChangeObservable.subscribe(user => {
      this.user = user;
    });
  }
}
