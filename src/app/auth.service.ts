import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { Observable, Subscription } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: Observable<firebase.User>;
  ipfsVideos: String[];

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user = firebaseAuth.authState;
    var that = this;
    firebaseAuth.auth.onAuthStateChanged(function(user) {
      that.user = firebaseAuth.authState;
      var subscription: Subscription;
      if (user !== null) {
        subscription = that.firestore
          .collection("UserData")
          .doc(user.email)
          .valueChanges()
          .subscribe(val => {
            if (val === undefined) {
              var data = {
                email: user.email,
                hasEtherAddress: false,
                ipfsVideos: []
              };
              that.firestore
                .collection("UserData")
                .doc(user.email)
                .set(data);
            } else if (!val["ipfsVideos"]) {
              that.firestore
                .collection("UserData")
                .doc(user.email)
                .set({ ipfsVideos: [] }, { merge: true });
            } else {
              that.ipfsVideos = val["ipfsVideos"];
            }
          });
      } else {
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    });
  }

  signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  setPersistence(rememberMe: boolean) {
    if (rememberMe) {
      this.firebaseAuth.auth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {})
        .catch(function(error) {
          console.log(
            "Setting persistence failed: ",
            error.code,
            error.message
          );
        });
    } else {
      this.firebaseAuth.auth
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {})
        .catch(function(error) {
          console.log(
            "Setting persistence failed: ",
            error.code,
            error.message
          );
        });
    }
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

  changePassword(email: string) {
    return this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }
}
