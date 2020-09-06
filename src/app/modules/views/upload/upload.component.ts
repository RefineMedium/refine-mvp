import { Component, OnInit, Input } from "@angular/core";
import node from "src/app/ipfs";
import { NotifierService } from "angular-notifier";
// import { AuthService } from "src/app/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { generate } from "shortid";
import { NgBlockUI, BlockUI } from "ng-block-ui";
import { Router } from "@angular/router";
import { UploadTaskSnapshot } from "@angular/fire/storage/interfaces";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponseData } from '../../core/api-models/login-response-data';
import { AppStateService } from '../../core/appservices/app-state.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { AppVideoService } from '../../core/appservices/video/video.service';

declare const Buffer;

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  files: File[];
  thumbnailFiles: File[];
  username: string;
  videoTitle: string;
  videoDescription: string;
  userActivated: boolean = false;
  currentUser: LoginResponseData;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    public router: Router,
    private notifier: NotifierService,
    private firestore: AngularFirestore,
    // private authService: AuthService,
    private storage: AngularFireStorage,
    public appStateService: AppStateService,
    public authenticationService: AuthenticationService,
    public videoService: AppVideoService,
    public http: HttpClient) { }

  ngOnInit() {
    const userSubscribe = this.appStateService.currentUser().subscribe(user => {
      if (user === null || user === undefined) {
        this.authenticationService.logoff();
        this.notifier.notify("error", "Login to upload videos");
      } else {
        this.userActivated = true;
        this.currentUser = user;
        this.username = (this.currentUser.name === null || this.currentUser.name === '' || this.currentUser.name === undefined) ?
          this.currentUser.email : this.currentUser.name;
      }
      if (userSubscribe) {
        userSubscribe.unsubscribe();
      }
    });

    // this.authService.user.subscribe(user => {
    //   if (user == null) {
    //     this.notifier.notify("error", "Login to upload");
    //     this.userActivated = false;
    //   } else {
    //     this.userActivated = true;
    //     this.username = user.email;
    //   }
    // });
  }

  validateForm() {
    return (
      this.files &&
      this.files.length > 0 &&
      this.thumbnailFiles &&
      this.thumbnailFiles.length > 0 &&
      this.videoTitle.length > 0 &&
      this.videoDescription.length > 0 &&
      this.userActivated
    );
  }

  onFilesAdded(files: File[]) {
    this.files = files;
  }

  onThumbnailFilesAdded(files: File[]) {
    this.thumbnailFiles = files;
  }

  onFilesRejected(files: File[]) {
    console.log(files);
  }

  uploadThumbnail(ipfsHash, uid) {
    // The storage path
    const path = `thumbnails/${new Date().getTime()}_${this.videoTitle}`;

    // Totally optional metadata
    const customMetadata = {
      videoId: uid,
      videoTitle: this.videoTitle,
      ipfsHash: ipfsHash
    };

    // The main task
    var task: AngularFireUploadTask = this.storage.upload(
      path,
      this.thumbnailFiles[0],
      { customMetadata }
    );

    task.then(
      (uploadSnapshot: UploadTaskSnapshot) => {
        console.log(uploadSnapshot);
        uploadSnapshot.ref.getDownloadURL().then(downloadURL => {
          this.firestore
            .collection("Videos")
            .doc(uid)
            .set({ thumbnail: downloadURL }, { merge: true });
          this.blockUI.stop();
          this.notifier.notify("success", "Upload successful!");
          this.router.navigate(["watch"], {
            queryParams: { video_id: uid }
          });
        });
      },
      err => {
        console.log(err);
        this.blockUI.stop();
        this.notifier.notify("error", "Upload failed! Try again.");
      }
    );
  }

  uploadVideo() {
    this.blockUI.start("Uploading...");
    // let uid: string = generate();
    var fileToUpload = this.files[0];
    // const reader = new FileReader();
    // var that = this;

    let formData = new FormData();
    formData.append('video', fileToUpload, fileToUpload.name);
    formData.append('image', this.thumbnailFiles[0], this.thumbnailFiles[0].name);
    formData.append('title', this.videoTitle);
    formData.append('description', this.videoDescription);
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authenticationService.token}`,
      })
    };
    this.http.post(environment.refineEndPoint + '/save-video-of-user', formData, HttpUploadOptions).subscribe(res => {
      let response = res as any;
      this.blockUI.stop();
      this.notifier.notify("success", "Video uploaded successfully");
      this.router.navigate(["watch"], {
        queryParams: { video_id: response.data.slug }
      });
    }, err => {
      console.log(err);
      this.blockUI.stop();
      this.notifier.notify("error", "Upload failed!");
    });

    // reader.readAsArrayBuffer(fileToUpload);
    // console.log("Buffering...");
    // reader.onload = function () {
    //   var arrayBuffer = reader.result;
    //   if (typeof arrayBuffer === "string") {
    //     that.notifier.notify("error", "Upload failed!");
    //     return;
    //   }
    //   var fileBuffer = new Uint8Array(arrayBuffer);
    //   console.log("Buffer: ", fileBuffer);
    //   node.add(Buffer.from(fileBuffer), function (err, res) {
    //     if (err) {
    //       that.notifier.notify("error", "Upload failed!");
    //       console.log(err);
    //     } else {
    //       if (res.length > 0) {
    //         var ipfsHash: string = res[0].hash;
    //         that.firestore
    //           .collection("Videos")
    //           .doc(uid)
    //           .set(
    //             {
    //               Title: that.videoTitle,
    //               Description: that.videoDescription,
    //               owner: that.username,
    //               ipfsHash: ipfsHash,
    //               timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //             },
    //             { merge: true }
    //           );
    //         that.firestore
    //           .collection("UserData")
    //           .doc(that.username)
    //           .update({
    //             ipfsVideos: firebase.firestore.FieldValue.arrayUnion(ipfsHash)
    //           });
    //         that.uploadThumbnail(ipfsHash, uid);
    //       }
    //     }
    //   });
    // };
  }
}
