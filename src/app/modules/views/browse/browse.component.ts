import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AppVideoService } from '../../core/appservices/video/video.service';
import { Video } from "../../../models/video";
import { VideoWithId } from 'src/app/models/VideoWithId';
import { VideoList } from 'src/app/models/video-list';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  title = "refine-mvp";
  carouselProperties;
  videosWithId: VideoWithId[];
  carouselVideosWithId: VideoWithId[];

  mostLikedVideo: Video[];
  mostViewedVideo: Video[];
  latestVideo: Video[];

  recommendedVideos: VideoList;
  topVideos: VideoList;
  mostLikedVideos: VideoList;
  latestVideos: VideoList;

  constructor(
    public router: Router,
    private notifier: NotifierService,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private videoService: AppVideoService) {
    this.recommendedVideos = {
      listHeading: 'Recommended Videos',
      videos: []
    };

    this.topVideos = {
      listHeading: 'Top Videos',
      videos: []
    };

    this.mostLikedVideos = {
      listHeading: 'Most Liked Videos',
      videos: []
    };

    this.latestVideos = {
      listHeading: 'Latest Videos',
      videos: []
    };
  }

  comingSoon() {
    alert("This Section is Under Development and Coming Soon!");
  }

  getRandom(arr, n): any[] {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  ngOnInit() {
    this.initMostLikedVideos();
    this.initMostViewedVideos();
    this.initLatestVideos();

    /* Search */

    /* Full width carousel */
    this.carouselProperties = {
      // autoplay: true;
      autoplay: true,
      loop: true,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    };
  }

  initMostLikedVideos() {
    const videoSub = this.videoService.getMostLikedVideos().subscribe(res => {
      this.mostLikedVideo = [];
      if (res) {
        for (let i = 0; i < res.data.length; i++) {
          const postdeBy = (res.data[i].name === null || res.data[i].name === '' || res.data[i].name === undefined) ?
            res.data[i].email : res.data[i].name;

          const vid: Video = {
            Description: res.data[i].data.description,
            Title: res.data[i].data.title,
            owner: postdeBy,
            thumbnail: res.data[i].data.imagePath,
            timestamp: Date.parse(res.data[i].data.creationDate),
            slug: res.data[i].data.slug
          };
          this.mostLikedVideo.push(vid);
        }

        this.recommendedVideos.videos = this.mostLikedVideo;
        this.mostLikedVideos.videos = this.mostLikedVideo;
      }
      videoSub.unsubscribe();
    });
  }

  initMostViewedVideos() {
    const videoSub = this.videoService.getMostViewedVideos().subscribe(res => {
      this.mostViewedVideo = [];
      if (res) {
        for (let i = 0; i < res.data.length; i++) {
          const postdeBy = (res.data[i].name === null || res.data[i].name === '' || res.data[i].name === undefined) ?
            res.data[i].email : res.data[i].name;

          const vid: Video = {
            Description: res.data[i].description,
            Title: res.data[i].title,
            owner: res.data[i].uploadedBy,
            thumbnail: res.data[i].imagePath,
            timestamp: Date.parse(res.data[i].creationDate),
            slug: res.data[i].slug
          };
          this.mostViewedVideo.push(vid);
        }
        this.topVideos.videos = this.mostViewedVideo;
      }
      videoSub.unsubscribe();
    });
  }

  initLatestVideos() {
    const videoSub = this.videoService.getLatestVideos().subscribe(res => {
      this.latestVideo = [];
      if (res) {
        for (let i = 0; i < res.data.length; i++) {
          const postdeBy = (res.data[i].name === null || res.data[i].name === '' || res.data[i].name === undefined) ?
            res.data[i].email : res.data[i].name;

          const vid: Video = {
            Description: res.data[i].description,
            Title: res.data[i].title,
            owner: postdeBy,
            thumbnail: res.data[i].imagePath,
            timestamp: Date.parse(res.data[i].creationDate),
            slug: res.data[i].slug
          };
          this.latestVideo.push(vid);
        }

        this.latestVideos.videos = this.latestVideo;
      }
      videoSub.unsubscribe();
    });
  }
}
