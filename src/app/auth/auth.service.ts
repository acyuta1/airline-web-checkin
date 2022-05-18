import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {GoogleAuthProvider} from 'firebase/auth';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import {LoginComplete} from "./store/auth.actions";
import {Router} from "@angular/router";
import AuthProvider = firebase.auth.AuthProvider;
import UserCredential = firebase.auth.UserCredential;
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private http: HttpClient, private store: Store<fromApp.AppState>, private router: Router) {
  }

  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  adminLoggedIn = new Subject<any>();

  authLogin(provider: AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((res) => {
        res.user.getIdToken().then(
          idToken => {
            this.addToDb(res, idToken);
            this.store.dispatch(new LoginComplete({email: res.user.email, idToken: idToken, isAdmin: false}))
            this.router.navigate(['/'])
          }
        );
      })
      .catch((err) => {
        console.log(err);
      })
  };

  addToDb(authResponse: UserCredential, idToken: string) {
    this.http.get(`${environment.firebaseDb}/auth/users/${authResponse.user.uid}.json`)
      .subscribe(res => {
        if (!res) {
          this.http.post(`${environment.firebaseDb}/auth/users/${authResponse.user.uid}.json`,
            {
              uid: authResponse.user.uid,
              role: 'usr',
              email: authResponse.user.email
            })
            .subscribe(res => {
              console.log(res);
            })
        }
        console.log(res)
      })
  }

  temporaryAdminAuth(authDetails: { email: string, password: string }) {
    if (authDetails.email === environment.adminDefaultAuth.email && authDetails.password === environment.adminDefaultAuth.pass) {
      this.store.dispatch(new LoginComplete({email: authDetails.email, idToken: environment.adminDefaultAuth.token, isAdmin: true}))
      this.adminLoggedIn.next(true);
      this.router.navigate(['/'])
    } else {
      throw new Error('Invalid Credentials');
    }
  }
}
