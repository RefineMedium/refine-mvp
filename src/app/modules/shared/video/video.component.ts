import { Component, OnInit, Input } from '@angular/core';
import { VideoList } from 'src/app/models/video-list';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() videosData: VideoList;
  constructor() {
    this.videosData = {
      listHeading: '',
      videos: []
    };
  }

  ngOnInit() {
  }

}
