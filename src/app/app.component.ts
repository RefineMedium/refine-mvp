import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { Video } from "./models/video";
import { map } from "rxjs/operators";
import { VideoWithId } from "./models/VideoWithId";
import { AppVideoService } from './modules/core/appservices/video/video.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "refine-mvp";
  carouselProperties;
  videosWithId: VideoWithId[];
  carouselVideosWithId: VideoWithId[];

  latestVideos: Video[];

  constructor(
    public router: Router,
    private notifier: NotifierService,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private videoService: AppVideoService
  ) { }
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
    // const videoSub = this.videoService.getMostLikedVideos().subscribe(res => {
    //   console.log(res);
    //   this.latestVideos = [];
    //   if (res) {
    //     for (let i = 0; i < res.data.length; i++) {
    //       const postdeBy = (res.data[i].name === null || res.data[i].name === '' || res.data[i].name === undefined) ?
    //         res.data[i].email : res.data[i].name;

    //       const vid: Video = {
    //         Description: res.data[i].data.description,
    //         Title: res.data[i].data.title,
    //         owner: postdeBy,
    //         thumbnail: res.data[i].data.imagePath,
    //         timestamp: Date.parse(res.data[i].data.creationDate),
    //         slug: res.data[i].data.slug
    //       };
    //       this.latestVideos.push(vid);
    //     }
    //   }
    //   videoSub.unsubscribe();
    // });

    // this.firestore
    //   .collection<Video>("Videos")
    //   .snapshotChanges()
    //   .pipe(
    //     map(actions => {
    //       // console.log(actions);
    //       return actions.map(a => {
    //         return new VideoWithId(
    //           a.payload.doc.id,
    //           a.payload.doc.data() as Video
    //         );
    //       });
    //     })
    //   )
    //   .subscribe(
    //     (videosWithId: VideoWithId[]) => {
    //       this.videosWithId = videosWithId;
    //       this.carouselVideosWithId = this.getRandom(
    //         this.videosWithId,
    //         Math.min(this.videosWithId.length, 4)
    //       );
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );

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

    // /* Full width carousel */

    // /*
    //  * Replace all SVG images with inline SVG
    //  */
    // jQuery("img.svg").each(function() {
    //   var $img = jQuery(this);
    //   var imgID = $img.attr("id");
    //   var imgClass = $img.attr("class");
    //   var imgURL = $img.attr("src");

    //   jQuery.get(
    //     imgURL,
    //     function(data) {
    //       // Get the SVG tag, ignore the rest
    //       var $svg = jQuery(data).find("svg");

    //       // Add replaced image's ID to the new SVG
    //       if (typeof imgID !== "undefined") {
    //         $svg = $svg.attr("id", imgID);
    //       }
    //       // Add replaced image's classes to the new SVG
    //       if (typeof imgClass !== "undefined") {
    //         $svg = $svg.attr("class", imgClass + " replaced-svg");
    //       }

    //       // Remove any invalid XML tags as per http://validator.w3.org
    //       $svg = $svg.removeAttr("xmlns:a");

    //       // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
    //       if (
    //         !$svg.attr("viewBox") &&
    //         $svg.attr("height") &&
    //         $svg.attr("width")
    //       ) {
    //         $svg.attr(
    //           "viewBox",
    //           "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
    //         );
    //       }

    //       // Replace image with new SVG
    //       $img.replaceWith($svg);
    //     },
    //     "xml"
    //   );
    // });
  }
}
