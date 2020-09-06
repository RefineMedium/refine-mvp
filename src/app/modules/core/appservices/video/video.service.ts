import { Injectable } from '@angular/core';
import { AppBaseService } from '../base-service/base.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { BroadcasterService } from '../broadcaster/broadcaster.service';
import { VideoService } from '../../services/video.service';
import { CommentViewModel } from '../../api-models/comment-view-model';
const likeAction = 'LIKE';
const dislikeAction = 'DISLIKE';

@Injectable({
  providedIn: 'root'
})

export class AppVideoService extends AppBaseService {
  constructor(broadcaster: BroadcasterService, private videoService: VideoService) {
    super(broadcaster);
  }

  public likeDislikeVideo(isLike: boolean, videoId: string): Observable<any> {
    this.processing(true);
    return this.videoService.ApiLikeDislikeVideoGet(isLike ? likeAction : dislikeAction, videoId).pipe(
      catchError(err => {
        return throwError(this.handleError('Like dislike video', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public commentOnVideo(commentModel: CommentViewModel): Observable<any> {
    this.processing(true);
    return this.videoService.ApiCommentOnVideoPost(commentModel).pipe(
      catchError(err => {
        return throwError(this.handleError('Comment on Video', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public getMostLikedVideos(): Observable<any> {
    this.processing(true);
    return this.videoService.ApiGetMostLikedVideosGet().pipe(
      catchError(err => {
        return throwError(this.handleError('Most Liked Videos', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public getVideoById(videoId: string): Observable<any> {
    this.processing(true);
    return this.videoService.ApiGetVideoGet(videoId).pipe(
      catchError(err => {
        return throwError(this.handleError('Get Video by Id', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public checkVideoLike(videoId: string): Observable<any> {
    this.processing(true);
    return this.videoService.ApiCheckVideoLikeGet(videoId).pipe(
      catchError(err => {
        return throwError(this.handleError('Check Video Like', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public viewVideo(videoId: string): Observable<any> {
    this.processing(true);
    return this.videoService.ApiViewVideoGet(videoId).pipe(
      catchError(err => {
        return throwError(this.handleError('View Video', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public getMostViewedVideos(): Observable<any> {
    this.processing(true);
    return this.videoService.ApiGetMostViewedVideosGet().pipe(
      catchError(err => {
        return throwError(this.handleError('Most Viewed Videos', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public getLatestVideos(): Observable<any> {
    this.processing(true);
    return this.videoService.ApiGetLatestVideosGet().pipe(
      catchError(err => {
        return throwError(this.handleError('Latest Videos', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }

  public getAllVideos(): Observable<any> {
    this.processing(true);
    return this.videoService.ApiGetAllVideosGet().pipe(
      catchError(err => {
        return throwError(this.handleError('All Videos', err));
      }))
      .pipe(
        tap((result) => {
          this.processing(false);
        }),
      );
  }
}
