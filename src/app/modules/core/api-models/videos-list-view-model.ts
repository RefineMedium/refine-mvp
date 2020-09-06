import { BaseResponse } from './base-response-model';
import { VideoData } from './video-data';
import { VideoUserData } from './video-user-data';

/*tslint:disable*/
export interface VideosListViewModel extends BaseResponse {
    data: VideoUserData[];
}