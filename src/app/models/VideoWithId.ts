import { Video } from "../Video";

export class VideoWithId {
  constructor(id: string, video: Video) {
    this.id = id;
    this.video = video;
  }

  video: Video;
  id: string;
}
