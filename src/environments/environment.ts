// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAc-L6mZqdxztwRHW5DlBqXle-ldiVNvs0",
    authDomain: "refinecoin.firebaseapp.com",
    databaseURL: "https://refinecoin.firebaseio.com",
    projectId: "refinecoin",
    storageBucket: "refinecoin.appspot.com",
    messagingSenderId: "1031087060414"
  },
  //refineEndPoint: "http://85cee76643c3.ngrok.io",
  refineEndPoint: "http://192.168.0.103:8081",
  webRedirectUrl: "http://localhost:4200/verify?user_token=",
  forgotRedirectUrl: "http://localhost:4200/reset?user_token="
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
