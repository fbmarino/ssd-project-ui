import {Injectable} from "@angular/core";
import {catchError, Observable, of, ReplaySubject} from "rxjs";
import {AuthService, Login, PasswordChange, PasswordResetConfirm, Registration, UserDetails} from "../api";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "../../dialogs/login/login-dialog.component";
import {RegisterDialogComponent} from "../../dialogs/register/register-dialog.component";
import {ChangePasswordDialogComponent} from "../../dialogs/change-password/change-password-dialog.component";
import {EditProfileDialogComponent} from "../../dialogs/edit-profile/edit-profile-dialog.component";

export class User {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor(details: UserDetails) {
    this.id = details.pk || 0;
    this.username = details.username || '';
    this.email = details.email || '';
    this.firstName = details.first_name || '';
    this.lastName = details.last_name || '';
  }

  get name() {
    if (this.firstName) {
      if (this.lastName) {
        return `${this.firstName} ${this.lastName}`;
      }
      return this.firstName;
    }
    if (this.lastName) {
      return this.lastName;
    }
    return this.username;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthManager {
  private logged = new ReplaySubject<User|null>(1);

  public readonly userChangeObservable = this.logged.asObservable();
  public currentUser: User|null = null;

  constructor(private dialog: MatDialog, private authService: AuthService) {
    this.userChangeObservable.subscribe(user => {
      this.currentUser = user;
    });
  }

  get user(): User|null {
    return this.currentUser;
  }

  openRegisterDialog() {
    this.dialog.open(RegisterDialogComponent, {
      width: '400px'
    });
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px'
    });
  }

  openEditProfileDialog() {
    this.dialog.open(EditProfileDialogComponent, {
      width: '600px'
    });
  }

  register(data: Registration) {
    return new Promise<User>((resolve, reject) => {
      this.authService.authRegistrationCreate(data)
        .pipe(
          catchError((res) => {
            reject(res);
            return of();
          })
        )
        .subscribe((res: any) => {
          this.checkCurrentUser().then(res => {
            resolve(res);
          }).catch(res => {
            reject(res);
          });
        });
    });
  }

  login(data: Login) {
    return new Promise<User>((resolve, reject) => {
      this.authService.authLoginCreate(data)
        .pipe(
          catchError((res) => {
            reject(res);
            return of();
          })
        )
        .subscribe((res: any) => {
          this.checkCurrentUser().then(res => {
            resolve(res);
          }).catch(res => {
            reject(res);
          });
        });
    });
  }

  changePassword(data: PasswordChange) {
    return new Promise<PasswordResetConfirm>((resolve, reject) => {
      this.authService.authPasswordChangeCreate(data)
        .pipe(
          catchError((res) => {
            reject(res);
            return of();
          })
        )
        .subscribe((res: any) => {
          resolve(res);
        });
    });
  }

  editProfile(data: UserDetails) {
    return new Promise<UserDetails>((resolve, reject) => {
      this.authService.authUserPartialUpdate(data)
        .pipe(
          catchError((res) => {
            reject(res);
            return of();
          })
        )
        .subscribe((res: UserDetails) => {
          const user = new User(res);
          this.logged.next(user);
          resolve(res);
        });
    });
  }

  logout() {
    return new Promise<boolean>((resolve, reject) => {
      this.authService.authLogoutCreate()
        .pipe(
          catchError((res) => {
            reject(res);
            return of();
          })
        )
        .subscribe(() => {
          this.logged.next(null);
          resolve(true);
        });
    });
  }

  checkCurrentUser() {
    return new Promise<User>((resolve, reject) => {
      this.authService.authUserRead()
        .pipe(
          catchError((res) => {
            this.logged.next(null);
            reject(res);
            return of();
          })
        )
        .subscribe((res: UserDetails) => {
          const user = new User(res);
          this.logged.next(user);
          resolve(user);
        });
    });
  }
}

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeaders = new HttpHeaders();
    let csrfToken = getCookieValue('csrftoken');
    if (csrfToken) {
      headers = request.headers.set('X-CSRFToken', csrfToken);
    }
    request = request.clone({
      withCredentials: true,
      headers: headers,
    });
    return next.handle(request);
  }
}

const getCookieValue = (name: string) => (
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
);
