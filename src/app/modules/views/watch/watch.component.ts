import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as $ from "jquery";
import { AngularFirestore } from "@angular/fire/firestore";
import { Video } from "src/app/Video";
import { NgBlockUI, BlockUI } from "ng-block-ui";
import * as eth from "../../../../assets/js/ethereum";
// import * as eth from "../../assets/js/ethereum";
import { CookieService } from "ngx-cookie-service";
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { VideoData } from '../../core/api-models/video-data';
import { CommentViewModel } from '../../core/api-models/comment-view-model';
import { AppVideoService } from '../../core/appservices/video/video.service';
import { AppStateService } from '../../core/appservices/app-state.service';
const like = 'LIKE';
const dislike = 'DISLIKE';

// declare var tokenTransfer: any;
@Component({
  selector: "app-watch",
  templateUrl: "./watch.component.html",
  styleUrls: ["./watch.component.scss"]
})
export class WatchComponent implements OnInit {
  public currentVideo: VideoData;
  public creationDate: number;
  public likeCount: number;
  public dislikeCount: number;
  public viewedCount: number;
  public isliked: boolean;
  public isdisliked: boolean;
  public username: string;
  public useremail: string;
  public postedBy: string;
  public isLoggedIn: boolean;
  public commentModel: CommentViewModel;
  public likeSub: Subscription;
  public isPlayed = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private firestore: AngularFirestore,
    // private cookieService: CookieService,
    private videoService: AppVideoService,
    private appStateService: AppStateService,
    private notifier: NotifierService
  ) {
    this.likeCount = 0;
    this.dislikeCount = 0;
    this.viewedCount = 0;
    this.isliked = false;
    this.isdisliked = false;
    this.commentModel = {
      comment: '',
      email: '',
      name: '',
      videoId: ''
    };
    this.currentVideo = {
      creationDate: new Date(),
      description: '',
      imagePath: '',
      slug: '',
      title: '',
      udationDate: new Date(),
      userVideoId: 0,
      videoAction: [],
      videoComment: [],
      videoPath: '',
      viewed: 0,
      uploadedBy: ''
    };
  }
  hash: string;
  isHash: boolean = false;
  cookieValue = "UNKNOWN";

  @ViewChild("videoplayer") videoPlayer: ElementRef;
  videoDetails: Video;
  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
    // this.blockUI.start("Loading...");
    this.route.queryParams.subscribe(params => {
      var videoId = params["video_id"] || null;
      if (videoId) {
        const videoSub = this.videoService.getVideoById(videoId).subscribe(res => {
          const loginSub = this.appStateService.isLoggedIn().subscribe(res => {
            this.isLoggedIn = res;
            if (loginSub) {
              loginSub.unsubscribe();
            }
          });
          // this.blockUI.stop();
          this.currentVideo = res.data.data;
          this.useremail = res.data.email;
          this.username = res.data.name;
          this.commentModel.videoId = this.currentVideo.userVideoId.toString();

          this.postedBy = (this.username === null || this.username === '' || this.username === undefined) ?
            this.useremail : this.username;
          this.creationDate = Date.parse(res.data.data.creationDate);
          this.videoPlayer.nativeElement.src = this.currentVideo.videoPath;
          this.viewedCount = this.currentVideo.viewed;
          if (this.currentVideo && this.currentVideo.videoAction && this.currentVideo.videoAction.length > 0) {
            this.likeCount = this.currentVideo.videoAction.filter(elem => {
              return elem.action === like;
            }).length;
          }
          if (this.currentVideo && this.currentVideo.videoAction && this.currentVideo.videoAction.length > 0) {
            this.dislikeCount = this.currentVideo.videoAction.filter(elem => {
              return elem.action === dislike;
            }).length;
          }

          if (this.isLoggedIn) {
            const userLike = this.videoService.checkVideoLike(this.currentVideo.userVideoId.toString()).subscribe(result => {
              this.isliked = result.data === like;
              this.isdisliked = result.data === dislike;
              userLike.unsubscribe();
            })
          }
          videoSub.unsubscribe();
        });
      } else {
        this.router.navigate(["/"]);
      }
    });
  }

  likeVideo() {
    if (!this.isLoggedIn) {
      this.notifier.notify('error', 'Login to like');
      return;
    }
    this.likeSub = this.videoService.likeDislikeVideo(true, this.currentVideo.userVideoId.toString()).subscribe(res => {
      this.refreshLikes();
    });
  }

  dislikeVideo() {
    if (!this.isLoggedIn) {
      this.notifier.notify('error', 'Login to dislike');
      return;
    }
    this.likeSub = this.videoService.likeDislikeVideo(false, this.currentVideo.userVideoId.toString()).subscribe(res => {
      this.refreshLikes();
    });
  }

  refreshLikes() {
    const videoSub = this.videoService.getVideoById(this.currentVideo.slug).subscribe(res => {
      this.currentVideo = res.data.data;
      if (this.currentVideo && this.currentVideo.videoAction && this.currentVideo.videoAction.length > 0) {
        this.likeCount = this.currentVideo.videoAction.filter(elem => {
          return elem.action === like;
        }).length;
      }
      if (this.currentVideo && this.currentVideo.videoAction && this.currentVideo.videoAction.length > 0) {
        this.dislikeCount = this.currentVideo.videoAction.filter(elem => {
          return elem.action === dislike;
        }).length;
      }
      if (this.isLoggedIn) {
        const userLike = this.videoService.checkVideoLike(this.currentVideo.userVideoId.toString()).subscribe(result => {
          this.isliked = result.data === like;
          this.isdisliked = result.data === dislike;
          userLike.unsubscribe();
        })
      }
      videoSub.unsubscribe();
      this.likeSub.unsubscribe();
    });
  }

  comingSoon() {
    alert("This Section is Under Development and Coming Soon!");
  }

  commentOnVideo() {
    this.likeSub = this.videoService.commentOnVideo(this.commentModel).subscribe(res => {
      this.refreshLikes();
      this.commentModel = {
        comment: '',
        email: '',
        name: '',
        videoId: this.currentVideo.userVideoId.toString()
      };
    });
  }

  onPlay() {
    if (!this.isPlayed) {
      this.isPlayed = !this.isPlayed;
      const viewSub = this.videoService.viewVideo(this.currentVideo.userVideoId.toString()).subscribe(res => {
        viewSub.unsubscribe();
      });
    }
  }
}
