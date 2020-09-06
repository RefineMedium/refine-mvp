import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';
import { BaseService } from '../base-service';
import { StrictHttpResponse } from '../strict-http-response';
import { ApiConfiguration } from 'src/app/api-configuration';
import { BaseResponse } from '../api-models/base-response-model';
import { CommentViewModel } from '../api-models/comment-view-model';
import { VideosListViewModel } from '../api-models/videos-list-view-model';
import { VideoUserViewModel } from '../api-models/video-user-view-model';

@Injectable({
  providedIn: 'root'
})

export class VideoService extends BaseService {
  static readonly LikeDislikeVideoPath = '/action-on-video?action=';
  static readonly CommentVideoPath = '/video/comment-on-video';
  static readonly MostLikedVideoPath = '/video/most-liked-video';
  static readonly GetVideoPath = '/video/get-video?slug=';
  static readonly CheckUserVideoPath = '/user-action-on-video?videoId=';
  static readonly ViewVideoPath = '/video/view-video?videoId=';
  static readonly MostViewedVideoPath = '/video/most-view-video';
  static readonly LatestVideoPath = '/video/latest-uploaded';
  static readonly AllVideoPath = '/get-all-videos';

  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param action string
   * @param videoId string
   * @return Success
   */
  ApiLikeDislikeVideoGetResponse(action: string, videoId: string): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + VideoService.LikeDislikeVideoPath + `${action}&videoId=${videoId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * @param action string
   * @param videoId string
   * @return Success
   */
  ApiLikeDislikeVideoGet(action: string, videoId: string): __Observable<BaseResponse> {
    return this.ApiLikeDislikeVideoGetResponse(action, videoId).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * @param commentModel undefined
   * @return Success
   */
  ApiCommentOnVideoPostResponse(commentModel: CommentViewModel): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    __body = commentModel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + VideoService.CommentVideoPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * @param signUpViewModel undefined
   * @return Success
   */
  ApiCommentOnVideoPost(commentModel: CommentViewModel): __Observable<BaseResponse> {
    return this.ApiCommentOnVideoPostResponse(commentModel).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * @return Success
   */
  ApiGetMostLikedVideosGetResponse(): __Observable<StrictHttpResponse<VideosListViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + VideoService.MostLikedVideoPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<VideosListViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiGetMostLikedVideosGet(): __Observable<VideosListViewModel> {
    return this.ApiGetMostLikedVideosGetResponse().pipe(
      __map(_r => _r.body as VideosListViewModel)
    );
  }

  /**
   * @param videoId string
   * @return Success
   */
  ApiGetVideoGetResponse(videoId: string): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + VideoService.GetVideoPath + `${videoId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * @param videoId string
   * @return Success
   */
  ApiGetVideoGet(videoId: string): __Observable<BaseResponse> {
    return this.ApiGetVideoGetResponse(videoId).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
  * @param videoId string
  * @return Success
  */
  ApiCheckVideoLikeGetResponse(videoId: string): __Observable<StrictHttpResponse<VideoUserViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + VideoService.CheckUserVideoPath + `${videoId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<VideoUserViewModel>;
      })
    );
  }
  /**
   * @param videoId string
   * @return Success
   */
  ApiCheckVideoLikeGet(videoId: string): __Observable<VideoUserViewModel> {
    return this.ApiCheckVideoLikeGetResponse(videoId).pipe(
      __map(_r => _r.body as VideoUserViewModel)
    );
  }

  /**
   * @param videoId string
   * @return Success
   */
  ApiViewVideoGetResponse(videoId: string): __Observable<StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + VideoService.ViewVideoPath + `${videoId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * @param videoId string
   * @return Success
   */
  ApiViewVideoGet(videoId: string): __Observable<BaseResponse> {
    return this.ApiViewVideoGetResponse(videoId).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * @return Success
   */
  ApiGetMostViewedVideosGetResponse(): __Observable<StrictHttpResponse<VideosListViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + VideoService.MostViewedVideoPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<VideosListViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiGetMostViewedVideosGet(): __Observable<VideosListViewModel> {
    return this.ApiGetMostViewedVideosGetResponse().pipe(
      __map(_r => _r.body as VideosListViewModel)
    );
  }

  /**
   * @return Success
   */
  ApiGetLatestVideosGetResponse(): __Observable<StrictHttpResponse<VideosListViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + VideoService.LatestVideoPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<VideosListViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiGetLatestVideosGet(): __Observable<VideosListViewModel> {
    return this.ApiGetLatestVideosGetResponse().pipe(
      __map(_r => _r.body as VideosListViewModel)
    );
  }

  /**
   * @return Success
   */
  ApiGetAllVideosGetResponse(): __Observable<StrictHttpResponse<VideosListViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders({});
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + VideoService.AllVideoPath,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<VideosListViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiGetAllVideosGet(): __Observable<VideosListViewModel> {
    return this.ApiGetAllVideosGetResponse().pipe(
      __map(_r => _r.body as VideosListViewModel)
    );
  }
}