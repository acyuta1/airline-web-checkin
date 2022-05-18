import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {Subscription} from "rxjs";
import { map } from 'rxjs/operators';
import {LogoutRequest} from "../../auth/store/auth.actions";
import {Router} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription;
  isAdmin: boolean;
  constructor(public authService: AuthService, private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });

    this.authService.adminLoggedIn
      .subscribe(() => {
        this.isAdmin = true;
      })
  }
  onLogout() {
    this.store.dispatch(new LogoutRequest());
    this.router.navigate(['/auth']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
