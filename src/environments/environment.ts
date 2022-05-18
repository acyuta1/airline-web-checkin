// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCnBSCZWbcDfV6fNaEx0KN2d-HOIh-iUnM",
    authDomain: "airline-afaa5.firebaseapp.com",
    databaseURL: "https://airline-afaa5-default-rtdb.firebaseio.com",
    projectId: "airline-afaa5",
    storageBucket: "airline-afaa5.appspot.com",
    messagingSenderId: "120624256021",
    appId: "1:120624256021:web:355104a4a1ddaa7e772a1c",
    measurementId: "G-G59VNZSJQD"
  },
  firebaseDb: "https://airline-afaa5-default-rtdb.firebaseio.com", // for the purpose of this project.
  adminDefaultAuth: {
    email: 'admin@mt-airline.com',
    pass: 'admin',
    // attach seats.json?auth=${idToken}
    token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5N2Q3ZmI1ZGNkZThjZDA0OGQzYzkxNThiNjIwYjY5MTA1MjJiNGQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQSBNaXRocmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2h0RklUU0lpVXVLbWEyTDZGNmxyVVp2TmtwUEpjZHdFeVJfUDhIOXc9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWlybGluZS1hZmFhNSIsImF1ZCI6ImFpcmxpbmUtYWZhYTUiLCJhdXRoX3RpbWUiOjE2NTI4NjM2NTUsInVzZXJfaWQiOiJkdkgyZGpCNTVkZTUwS2Y2RXZhMW1sRGZSckYzIiwic3ViIjoiZHZIMmRqQjU1ZGU1MEtmNkV2YTFtbERmUnJGMyIsImlhdCI6MTY1Mjg2MzY1NSwiZXhwIjoxNjUyODY3MjU1LCJlbWFpbCI6ImFjaHl1dGhhMDM3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEzMzY0NjQxODY4ODAwODI1NjE4Il0sImVtYWlsIjpbImFjaHl1dGhhMDM3QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.CdKfx4ra5BUxGbG_yNHuLlFBcE2JEuEtwR1gEbZ45_ykShITOTLjIK76zM-UPWLYHn6p1BVtwAwV73AEvK75TWzBgLVVlMvntL2EvXjx-DPofdLVKvE73DNcfVUXKqWLjeyOLTUzZxBWNHJoLFz9QX7glVNwp23TvPU3_G4Ylaah2-B2AK1hrLnlMbhbE5X7gjYWUYGoVEvfXX7KjGVEssZbndPS7F5xz_erYPe-fa9_APtEcHwkqn65-obH1EMWKLI-iYaU7_eDcuLo2H3CmRkpioeUPKz0dBXw0UbG-Tq-kK8xZWzWMwDjykQE0sboseB8NU9mapyRPfcx4iw8nw'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
