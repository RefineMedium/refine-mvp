import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { VideoWithId } from 'src/app/models/VideoWithId';
import { Video } from 'src/app/Video';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  videosWithId: VideoWithId[] = new Array();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      var searchQuery = params["query"] || null;
      if (searchQuery) {
        searchQuery = searchQuery.toLowerCase();
        this.firestore
          .collection<Video>("Videos")
          .snapshotChanges()
          .pipe(
            map(actions => {
              console.log(actions);
              return actions.map(a => {
                return new VideoWithId(
                  a.payload.doc.id,
                  a.payload.doc.data() as Video
                );
              });
            })
          )
          .subscribe(
            (videosWithId: VideoWithId[]) => {
              videosWithId.forEach(element => {
                let video: Video = element.video;
                if (
                  video.Title.toLowerCase().indexOf(searchQuery) !== -1 ||
                  video.Description.toLowerCase().indexOf(searchQuery) !== -1 ||
                  video.owner.toLowerCase().indexOf(searchQuery) !== -1
                ) {
                  this.videosWithId.push(element);
                }
              });
            },
            err => {
              console.log(err);
            }
          );
      } else {
        this.router.navigate(["/"]);
      }
    });
  }
}
